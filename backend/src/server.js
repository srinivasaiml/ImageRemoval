import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { removeBackground } from '@imgly/background-removal-node';
import sharp from 'sharp';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create upload directories if they don't exist
const uploadsDir = path.join(__dirname, '../uploads');
const processedDir = path.join(__dirname, '../processed');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(processedDir)) {
  fs.mkdirSync(processedDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Background removal endpoint
app.post('/api/remove-background', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const inputPath = req.file.path;
    const outputFilename = `processed-${Date.now()}.png`;
    const outputPath = path.join(processedDir, outputFilename);

    console.log('Processing image:', inputPath);

    // Read the input image
    const inputBuffer = fs.readFileSync(inputPath);

    // Remove background using @imgly/background-removal-node
    const resultBuffer = await removeBackground(inputBuffer);

    // Optimize the output image with Sharp
    const optimizedBuffer = await sharp(resultBuffer)
      .png({ quality: 90, compressionLevel: 6 })
      .toBuffer();

    // Save the processed image
    fs.writeFileSync(outputPath, optimizedBuffer);

    // Send the processed image as response
    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="${outputFilename}"`,
    });

    res.send(optimizedBuffer);

    // Clean up uploaded file after processing
    setTimeout(() => {
      try {
        if (fs.existsSync(inputPath)) {
          fs.unlinkSync(inputPath);
        }
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }
      } catch (error) {
        console.error('Error cleaning up files:', error);
      }
    }, 5000); // Clean up after 5 seconds

  } catch (error) {
    console.error('Error processing image:', error);
    
    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      error: 'Failed to process image',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Background removal service is running' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
  }
  
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Background removal server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
# Background Removal Web Application

A full-stack web application that removes backgrounds from images using AI technology. Built with React frontend and Node.js backend.

## Features

- **Instant Background Removal**: Remove backgrounds from images with one click
- **High Quality Results**: Professional-grade output with precise edge detection
- **Drag & Drop Interface**: Easy-to-use upload interface
- **Real-time Processing**: Fast image processing with visual feedback
- **Secure**: Images are processed securely and deleted after processing
- **Responsive Design**: Works perfectly on all devices

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Vite for build tooling
- Axios for API communication
- Lucide React for icons

### Backend
- Node.js with Express
- Multer for file uploads
- @imgly/background-removal-node for AI processing
- Sharp for image optimization
- CORS enabled for cross-origin requests

## Project Structure

```
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── utils/          # Backend utilities
│   ├── uploads/            # Temporary upload directory
│   ├── processed/          # Processed images directory
│   └── package.json        # Backend dependencies
└── package.json            # Root package.json with scripts
```

## Installation & Setup

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start the development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend on http://localhost:3000
   - Backend on http://localhost:5000

3. **Individual server commands:**
   ```bash
   # Frontend only
   npm run dev:frontend
   
   # Backend only
   npm run dev:backend
   ```

## API Endpoints

### POST /api/remove-background
Removes background from uploaded image.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: image file (max 10MB)

**Response:**
- Content-Type: image/png
- Body: Processed image with transparent background

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Background removal service is running"
}
```

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

## File Upload Limits

- Maximum file size: 10MB
- Supported formats: JPG, PNG, WebP
- Files are automatically cleaned up after processing

## Development

The application uses:
- Hot reload for both frontend and backend
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Tailwind CSS for responsive design

## Production Build

```bash
# Build frontend for production
npm run build

# Preview production build
npm run preview
```

## Security Features

- File type validation
- File size limits
- Automatic cleanup of uploaded files
- CORS protection
- Input sanitization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
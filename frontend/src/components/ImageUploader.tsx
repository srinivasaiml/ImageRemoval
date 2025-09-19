import React, { useState, useRef } from 'react'
import { Upload, Download, Loader2, Image as ImageIcon, Scissors } from 'lucide-react'
import axios from 'axios'

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string)
        setProcessedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const processImage = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    const formData = new FormData()
    formData.append('image', selectedFile)

    try {
      const response = await axios.post('/api/remove-background', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
      })

      const imageBlob = new Blob([response.data], { type: 'image/png' })
      const imageUrl = URL.createObjectURL(imageBlob)
      setProcessedImage(imageUrl)
    } catch (error) {
      console.error('Error processing image:', error)
      alert('Error processing image. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a')
      link.href = processedImage
      link.download = 'background-removed.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const resetUploader = () => {
    setSelectedFile(null)
    setOriginalImage(null)
    setProcessedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full">
      {!originalImage ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
            dragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upload your image
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your image here, or click to browse
              </p>
              <button className="btn-primary">
                Choose Image
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Supports JPG, PNG, WebP up to 10MB
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                Original
              </h3>
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-64 object-contain"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                Background Removed
              </h3>
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                {processedImage ? (
                  <img
                    src={processedImage}
                    alt="Processed"
                    className="w-full h-64 object-contain"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(0.5) rotate(0)'%3e%3crect x='0' y='0' width='100%25' height='100%25' fill='white'/%3e%3crect x='0' y='0' width='10' height='10' fill='%23f3f4f6'/%3e%3crect x='10' y='10' width='10' height='10' fill='%23f3f4f6'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23a)'/%3e%3c/svg%3e")`,
                    }}
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center">
                    {isProcessing ? (
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-2" />
                        <p className="text-gray-600">Processing image...</p>
                      </div>
                    ) : (
                      <p className="text-gray-500">Click "Remove Background" to process</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!processedImage && !isProcessing && (
              <button
                onClick={processImage}
                className="btn-primary flex items-center justify-center"
              >
                <Scissors className="w-5 h-5 mr-2" />
                Remove Background
              </button>
            )}
            
            {processedImage && (
              <button
                onClick={downloadImage}
                className="btn-primary flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Image
              </button>
            )}
            
            <button
              onClick={resetUploader}
              className="btn-secondary"
            >
              Upload New Image
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploader
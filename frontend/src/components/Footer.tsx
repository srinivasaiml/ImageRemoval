import React from 'react'
import { Scissors } from 'lucide-react'
import ImageUploader from './ImageUploader'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See the magic. Try now
          </h2>
        </div>
        
        <div className="max-w-2xl mx-auto mb-16">
          <ImageUploader />
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Scissors className="h-6 w-6 text-primary-600" />
              <span className="text-lg font-bold text-gray-900">BG.Removal</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            © 2024 BG.Removal. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
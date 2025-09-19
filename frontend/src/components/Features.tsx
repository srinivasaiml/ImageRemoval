import React from 'react'
import { Zap, Shield, Sparkles } from 'lucide-react'

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Remove Background with High<br />
            Quality and Accuracy
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Lightning Fast
            </h3>
            <p className="text-gray-600">
              Process images in seconds with our advanced AI technology. No waiting, instant results.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              High Quality
            </h3>
            <p className="text-gray-600">
              Get professional-grade results with precise edge detection and smooth transparency.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              100% Secure
            </h3>
            <p className="text-gray-600">
              Your images are processed securely and deleted immediately after processing.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
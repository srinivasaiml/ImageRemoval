import React from 'react'
import ImageUploader from './ImageUploader'

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Remove the<br />
            <span className="text-primary-600">background from</span><br />
            images for free.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Instantly remove backgrounds from any image with just one click.
            Get clean, transparent results perfect for presentations, designs, or e-commerce.
            Fast, accurate, and easy to use — no editing skills required.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <ImageUploader />
        </div>
      </div>
    </section>
  )
}

export default Hero
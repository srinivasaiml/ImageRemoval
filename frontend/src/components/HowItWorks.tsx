import React from 'react'
import { Upload, Scissors, Download } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload image',
    description: 'This is a demo text, will replace it later. This is a demo..',
  },
  {
    icon: Scissors,
    title: 'Remove background',
    description: 'This is a demo text, will replace it later. This is a demo..',
  },
  {
    icon: Download,
    title: 'Download image',
    description: 'This is a demo text, will replace it later. This is a demo..',
  },
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Steps to remove background<br />
            image in seconds
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-10 h-10 text-primary-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
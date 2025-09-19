import React from 'react'
import { Scissors } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Scissors className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">BG.Removal</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How it Works
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
              Testimonials
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              Sign In
            </button>
            <button className="btn-primary">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
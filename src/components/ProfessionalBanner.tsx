'use client'

import { useState, useEffect } from 'react'

interface ProfessionalBannerProps {
  title: string
  subtitle: string
  description?: string
  height?: 'full' | 'medium' | 'small'
}

export default function ProfessionalBanner({ 
  title, 
  subtitle, 
  description,
  height = 'medium'
}: ProfessionalBannerProps) {
  const [currentImage, setCurrentImage] = useState(0)
  
  // Same Antigua Guatemala municipal building images
  const images = [
    'https://devnet.irys.xyz/YkhhURLKbtaDfBymQL6gpy5nbizU2fBxEudScgtn3to',
    'https://devnet.irys.xyz/2DTgbJaJRcRpjA2gxHNqVgV5PRh4TthwMk28RhzpLak1',
    'https://devnet.irys.xyz/6PkTtXPmDdzQPwPc1ZzghFCr8cbYP1FRFqg8W7PPT8hr'
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [images.length])

  const heightClasses = {
    full: 'min-h-screen',
    medium: 'h-96',
    small: 'h-64'
  }

  return (
    <div className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}>
      {/* Cycling Background Images */}
      {images.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${image}')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
        {/* Municipal Logo */}
        <div className="mb-6">
          <img
            src="https://portal.muniantigua.gob.gt/_nuxt/img/LOGO_Muni_Blanco.3d5b488.png"
            alt="Municipalidad de La Antigua Guatemala"
            className="h-16 md:h-20 mx-auto mb-4"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          {title}
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl mb-4 opacity-90 font-medium">
          {subtitle}
        </p>

        {description && (
          <p className="text-base md:text-lg opacity-80 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        )}

        {/* Official Branding */}
        <div className="mt-6 text-sm md:text-base opacity-75">
          Municipalidad de La Antigua Guatemala
        </div>
      </div>
    </div>
  )
}
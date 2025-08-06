'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HeroClean() {
  const [currentImage, setCurrentImage] = useState(0)
  
  // Your authentic Antigua Guatemala municipal building images
  const images = [
    'https://devnet.irys.xyz/YkhhURLKbtaDfBymQL6gpy5nbizU2fBxEudScgtn3to',
    'https://devnet.irys.xyz/2DTgbJaJRcRpjA2gxHNqVgV5PRh4TthwMk28RhzpLak1',
    'https://devnet.irys.xyz/6PkTtXPmDdzQPwPc1ZzghFCr8cbYP1FRFqg8W7PPT8hr'
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000) // Change image every 5 seconds
    
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          Portal Oficial de Turismo
          <span className="block text-yellow-400">La Antigua Guatemala</span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
          Información oficial sobre comunidades, cultura, patrimonio histórico y eventos municipales de La Antigua Guatemala
        </p>

        {/* Official Call to Action */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Municipalidad de La Antigua Guatemala
            </h2>
            <p className="text-base md:text-lg opacity-90 mb-6">
              Portal oficial de información turística y cultural
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/aldeas"
                className="inline-block bg-white/20 hover:bg-white/30 border border-white/40 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Paseos con Encanto
              </Link>
              <Link
                href="/eventos"
                className="inline-block bg-white/20 hover:bg-white/30 border border-white/40 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Eventos Municipales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Calendar, MapPin, Users } from 'lucide-react'
import BookingModal from './BookingModal'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const [showBooking, setShowBooking] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2940&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          {t('heroTitle')}
          <span className="block text-yellow-400">{t('heroSubtitle')}</span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
          {t('heroDescription')}
        </p>

        {/* Main Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-8 max-w-3xl mx-auto">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg">
            🎉 {t('discoverEvents')}
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg">
            🎭 {t('culturalAgenda')}
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg">
            🚶‍♂️ {t('paseosConEncanto')}
          </button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            🏛️ Patrimonio UNESCO
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            🎨 Cultura Auténtica
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            🌋 Paisajes Únicos
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            👥 Experiencias Locales
          </span>
        </div>
      </div>


      {showBooking && (
        <BookingModal 
          isOpen={showBooking} 
          onClose={() => setShowBooking(false)} 
        />
      )}
    </div>
  )
}
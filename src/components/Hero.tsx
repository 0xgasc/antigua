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

        {/* Quick Search Bar */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 max-w-3xl mx-auto mb-8 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                {t('date')}
              </label>
              <input
                type="date"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                {t('destination')}
              </label>
              <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm">
                <option>{t('allVillages')}</option>
                <option>San Antonio Aguas Calientes</option>
                <option>Santa María de Jesús</option>
                <option>San Juan del Obispo</option>
                <option>Ciudad Vieja</option>
              </select>
            </div>
            
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-1" />
                {t('people')}
              </label>
              <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm">
                <option>1 {t('person')}</option>
                <option>2 {t('people')}</option>
                <option>3-5 {t('people')}</option>
                <option>6+ {t('people')}</option>
              </select>
            </div>
            
            <div className="sm:col-span-2 lg:col-span-1">
              <button
                onClick={() => setShowBooking(true)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-sm"
              >
                {t('searchTours')}
              </button>
            </div>
          </div>
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
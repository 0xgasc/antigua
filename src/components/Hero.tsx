'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2940&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          {t('heroTitle')}
          <span className="block text-yellow-400">{t('heroSubtitle')}</span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
          {t('heroDescription')}
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
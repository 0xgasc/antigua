'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, MapPin } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('tours'), href: '/tours' },
    { name: t('villages'), href: '/aldeas' },
    { name: t('events'), href: '/eventos' },
    { name: t('contact'), href: '/contacto' }
  ]

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 lg:py-4">
          {/* Official Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="https://portal.muniantigua.gob.gt/_nuxt/img/LOGO_Muni_Blanco.3d5b488.png"
                alt="Municipalidad de La Antigua Guatemala"
                className="h-8 lg:h-10"
              />
              <div className="text-white">
                <div className="font-bold text-sm lg:text-base">Portal Oficial de Turismo</div>
                <div className="text-xs opacity-80 hidden sm:block">La Antigua Guatemala</div>
              </div>
            </Link>
          </div>

          {/* Right Side - Language Switcher & Menu */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="text-white font-bold text-lg">Menú</div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 px-4 py-6 space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-white text-xl font-medium py-3 border-b border-white/10 transition-colors hover:text-yellow-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="p-4 border-t border-white/20">
              <div className="text-center text-white/80 text-sm">
                Portal Oficial de Información
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
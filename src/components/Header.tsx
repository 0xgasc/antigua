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
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-yellow-500 p-1.5 lg:p-2 rounded-lg">
                <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="text-white">
                <div className="font-bold text-base lg:text-lg">Turismo Antigua</div>
                <div className="text-xs opacity-80 hidden sm:block">Discover Guatemala</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/90 hover:text-white font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - Language Switcher & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 lg:px-6 py-2 rounded-lg font-semibold transition-colors text-sm lg:text-base">
              {t('bookNow')}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher className="scale-90" />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-sm">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="text-white font-bold text-lg">Menu</div>
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
                  className="block text-white text-xl font-medium py-3 border-b border-white/10 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="p-4 border-t border-white/20">
              <button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-4 rounded-lg font-semibold transition-colors text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('bookNow')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
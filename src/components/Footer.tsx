import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg">Turismo Antigua</div>
                <div className="text-sm text-gray-400">Discover Guatemala</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Descubre la magia de Antigua Guatemala y sus aldeas auténticas. 
              Experiencias únicas que conectan cultura, historia y naturaleza.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/tours" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Tours y Experiencias
                </Link>
              </li>
              <li>
                <Link href="/aldeas" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Aldeas Auténticas
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Eventos y Festivales
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Servicios</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/tours-culturales" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Tours Culturales
                </Link>
              </li>
              <li>
                <Link href="/tours-aventura" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Tours de Aventura
                </Link>
              </li>
              <li>
                <Link href="/tours-gastronomicos" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Tours Gastronómicos
                </Link>
              </li>
              <li>
                <Link href="/talleres-artesanales" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Talleres Artesanales
                </Link>
              </li>
              <li>
                <Link href="/transporte" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Transporte Turístico
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>5a Calle Poniente #15</p>
                  <p>Antigua Guatemala, Sacatepéquez</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-300">+502 7832-0000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-300">info@turismoantigua.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-300">www.turismoantigua.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="font-semibold mb-3">Boletín Informativo</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-yellow-500"
                />
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-r-lg transition-colors">
                  Suscribir
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Turismo Antigua. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacidad" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Términos de Uso
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
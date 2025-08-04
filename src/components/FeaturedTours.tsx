'use client'

import { Clock, Users, Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const featuredTours = [
  {
    id: 1,
    title: 'Experiencia Completa de Antigua',
    description: 'Tour integral que combina historia, cultura y gastronomía en un día inolvidable',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2940&auto=format&fit=crop',
    price: 85,
    duration: '8 horas',
    maxGuests: 12,
    rating: 4.9,
    highlights: ['Arco de Santa Catalina', 'Convento de las Capuchinas', 'Mercado de Artesanías', 'Degustación de café']
  },
  {
    id: 2,
    title: 'Aldeas Auténticas',
    description: 'Visita aldeas tradicionales y conoce de cerca la vida rural guatemalteca',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop',
    price: 65,
    duration: '6 horas',
    maxGuests: 8,
    rating: 4.8,
    highlights: ['San Antonio Aguas Calientes', 'Talleres textiles', 'Almuerzo tradicional', 'Ceremonia maya']
  },
  {
    id: 3,
    title: 'Aventura en Volcanes',
    description: 'Senderismo y vistas espectaculares en los volcanes que rodean Antigua',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop',
    price: 95,
    duration: '10 horas',
    maxGuests: 6,
    rating: 4.7,
    highlights: ['Volcán Pacaya', 'Asado de marshmallows', 'Vista de lava', 'Guía especializado']
  }
]

export default function FeaturedTours() {
  const { t } = useLanguage()
  
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('featuredToursTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('featuredToursSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour, index) => (
            <div 
              key={tour.id} 
              className={`group ${index === 0 ? 'lg:col-span-2' : ''}`}
            >
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                <div className={`relative ${index === 0 ? 'h-80' : 'h-64'}`}>
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-6 right-6 bg-yellow-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                    ${tour.price}
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{tour.rating}</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                    {tour.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {tour.description}
                  </p>
                  
                  {/* Tour Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Máx. {tour.maxGuests} personas</span>
                    </div>
                  </div>
                  
                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">{t('includes')}</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {tour.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 flex-shrink-0" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                    {t('reserveNow')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-4 border-2 border-yellow-500 text-yellow-600 font-semibold rounded-xl hover:bg-yellow-500 hover:text-white transition-colors duration-200">
            {t('viewAllTours')}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
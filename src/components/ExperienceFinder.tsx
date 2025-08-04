'use client'

import { useState } from 'react'
import { Search, Filter, MapPin, Clock, Star } from 'lucide-react'

const categories = [
  { id: 'all', name: 'Todas', icon: '🌟' },
  { id: 'cultural', name: 'Cultural', icon: '🏛️' },
  { id: 'adventure', name: 'Aventura', icon: '🥾' },
  { id: 'gastronomic', name: 'Gastronómico', icon: '🍽️' },
  { id: 'artisan', name: 'Artesanal', icon: '🎨' },
  { id: 'nature', name: 'Naturaleza', icon: '🌿' }
]

const experiences = [
  {
    id: 1,
    title: 'Taller de Textiles en San Antonio',
    category: 'artisan',
    location: 'San Antonio Aguas Calientes',
    duration: '4 horas',
    rating: 4.9,
    price: 35,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop',
    description: 'Aprende técnicas ancestrales de tejido con maestras artesanas'
  },
  {
    id: 2,
    title: 'Caminata al Volcán de Agua',
    category: 'adventure',
    location: 'Santa María de Jesús',
    duration: '8 horas',
    rating: 4.8,
    price: 65,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop',
    description: 'Ascenso guiado con vistas espectaculares de Antigua'
  },
  {
    id: 3,
    title: 'Tour Gastronómico Colonial',
    category: 'gastronomic',
    location: 'Antigua Guatemala',
    duration: '3 horas',
    rating: 4.7,
    price: 45,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2940&auto=format&fit=crop',
    description: 'Sabores auténticos en mercados y restaurantes locales'
  },
  {
    id: 4,
    title: 'Historia Viva en Ciudad Vieja',
    category: 'cultural',
    location: 'Ciudad Vieja',
    duration: '5 horas',
    rating: 4.6,
    price: 40,
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2940&auto=format&fit=crop',
    description: 'Descubre la primera capital de Guatemala'
  }
]

export default function ExperienceFinder() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredExperiences = experiences.filter(exp => {
    const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Encuentra tu Experiencia Perfecta
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desde talleres artesanales hasta aventuras en la naturaleza, 
            descubre experiencias auténticas en cada aldea
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar experiencias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-yellow-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExperiences.map(experience => (
            <div key={experience.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-semibold text-yellow-600">
                  ${experience.price}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {categories.find(c => c.id === experience.category)?.icon} 
                    {categories.find(c => c.id === experience.category)?.name}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{experience.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{experience.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{experience.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {experience.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {experience.duration}
                  </div>
                </div>
                
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                  Reservar Ahora
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron experiencias</h3>
            <p className="text-gray-600">Intenta con otros términos de búsqueda o categorías</p>
          </div>
        )}
      </div>
    </section>
  )
}
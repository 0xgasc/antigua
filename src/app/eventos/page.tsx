'use client'

import { useState } from 'react'
import { Calendar, MapPin, Ticket, Search, Filter } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProfessionalBanner from '@/components/ProfessionalBanner'
import { useLanguage } from '@/contexts/LanguageContext'
import { eventsData } from '@/data/events'

export default function EventosPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { t } = useLanguage()
  
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'festival', name: 'Festivales' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'religious', name: 'Religioso' },
    { id: 'gastronomic', name: 'Gastronómico' },
    { id: 'artisan', name: 'Artesanal' }
  ]
  
  const filteredEvents = eventsData.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Professional Banner */}
      <ProfessionalBanner 
        title="Eventos Municipales"
        subtitle="Calendario Oficial de Actividades"
        description="Consulta la agenda oficial de eventos culturales, festivales y actividades organizadas por la Municipalidad de La Antigua Guatemala"
        height="medium"
      />

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {event.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      Destacado
                    </div>
                  )}
                  
                  {event.entryType === 'free' && (
                    <div className="absolute bottom-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      Entrada Libre
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date} - {event.time}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    {event.organizer && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <span className="font-medium">Organiza:</span>
                        <span className="ml-2">{event.organizer}</span>
                      </div>
                    )}
                  </div>
                  
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron eventos</h3>
              <p className="text-gray-600">Intenta con otros términos de búsqueda o categorías</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
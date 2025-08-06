'use client'

import { useState } from 'react'
import { Search, MapPin, Clock, Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { toursData } from '@/data/tours'

const getCategoriesWithTranslation = (t: any) => [
  { id: 'all', name: t('all'), icon: '🌟' },
  { id: 'cultural', name: t('cultural'), icon: '🏛️' },
  { id: 'adventure', name: t('adventure'), icon: '🥾' },
  { id: 'gastronomic', name: t('gastronomic'), icon: '🍽️' },
  { id: 'artisan', name: t('artisan'), icon: '🎨' },
  { id: 'nature', name: t('nature'), icon: '🌿' }
]

// Convert tours data to experiences format for compatibility
const experiences = toursData.map(tour => ({
  id: tour.id,
  title: tour.title,
  category: tour.category,
  location: tour.location,
  duration: tour.duration,
  difficulty: tour.difficulty,
  seasonality: tour.seasonality,
  image: tour.image,
  description: tour.description
}))

export default function ExperienceFinder() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { t } = useLanguage()
  
  const categories = getCategoriesWithTranslation(t)

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
            {t('experienceFinderTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('experienceFinderSubtitle')}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('searchExperiences')}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredExperiences.map(experience => (
            <div key={experience.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-40 sm:h-48">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs sm:text-sm font-semibold text-gray-700">
                  {experience.category === 'cultural' ? '🏛️' : 
                   experience.category === 'adventure' ? '🥾' :
                   experience.category === 'gastronomic' ? '🍽️' :
                   experience.category === 'artisan' ? '🎨' : '🌿'}
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <span className="mr-1">{categories.find(c => c.id === experience.category)?.icon}</span>
                    <span className="hidden sm:inline">{categories.find(c => c.id === experience.category)?.name}</span>
                  </span>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    {experience.difficulty === 'easy' ? 'Fácil' :
                     experience.difficulty === 'moderate' ? 'Moderado' : 
                     experience.difficulty === 'difficult' ? 'Difícil' : ''}
                  </div>
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2">{experience.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{experience.description}</p>
                
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="truncate">{experience.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {experience.duration}
                  </div>
                </div>
                
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base">
                  {t('reserveNow')}
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
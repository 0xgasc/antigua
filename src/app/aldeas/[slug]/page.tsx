'use client'

import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProfessionalBanner from '@/components/ProfessionalBanner'
import { MapPin, Users, Calendar, Star, Phone, Mail } from 'lucide-react'
import { aldeaData } from '@/data/aldeas'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AldeaDetailPage() {
  const params = useParams()
  const { currentLanguage } = useLanguage()
  const slug = params.slug as string
  
  // Find the aldea by slug
  const aldea = aldeaData.find(a => a.slug === slug)
  
  if (!aldea) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Comunidad no encontrada</h1>
          <p className="text-gray-600">La comunidad que buscas no existe o ha sido removida.</p>
        </div>
        <Footer />
      </main>
    )
  }

  // Get content based on language
  const getName = () => currentLanguage === 'en' && aldea.nameEn ? aldea.nameEn : aldea.name
  const getShortDesc = () => currentLanguage === 'en' && aldea.shortDescEn ? aldea.shortDescEn : aldea.shortDesc
  const getDescription = () => currentLanguage === 'en' && aldea.descriptionEn ? aldea.descriptionEn : aldea.description
  const getHighlights = () => currentLanguage === 'en' && aldea.highlightsEn ? aldea.highlightsEn : aldea.highlights
  const getMainActivities = () => currentLanguage === 'en' && aldea.mainActivitiesEn ? aldea.mainActivitiesEn : aldea.mainActivities
  const getCulturalSignificance = () => currentLanguage === 'en' && aldea.culturalSignificanceEn ? aldea.culturalSignificanceEn : aldea.culturalSignificance
  const getEconomicActivities = () => currentLanguage === 'en' && aldea.economicActivitiesEn ? aldea.economicActivitiesEn : aldea.economicActivities

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Professional Banner */}
      <ProfessionalBanner 
        title={getName()}
        subtitle={getShortDesc()}
        description={getDescription()}
        height="medium"
      />

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Image Gallery */}
              {aldea.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aldea.images.map((image, index) => (
                    <div key={index} className="relative h-64 rounded-xl overflow-hidden">
                      <img
                        src={image}
                        alt={`${getName()} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Acerca de {getName()}</h2>
                <p className="text-gray-700 leading-relaxed">{getDescription()}</p>
              </div>

              {/* Cultural Significance */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Importancia Cultural</h3>
                <p className="text-gray-700 leading-relaxed">{getCulturalSignificance()}</p>
              </div>

              {/* Main Activities */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Actividades Principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getMainActivities().map((activity, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{activity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Puntos Destacados</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {getHighlights().map((highlight, index) => (
                    <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-600 mr-2" />
                        <span className="text-gray-700 text-sm">{highlight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Quick Info */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Información General</h3>
                <div className="space-y-4">
                  
                  {aldea.population && aldea.population > 0 && (
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <div className="text-sm text-gray-600">Población</div>
                        <div className="font-semibold">{aldea.population.toLocaleString()} habitantes</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Ubicación</div>
                      <div className="font-semibold">{currentLanguage === 'en' && aldea.location.distanceEn ? aldea.location.distanceEn : aldea.location.distance}</div>
                    </div>
                  </div>

                  {aldea.location.elevation && (
                    <div className="flex items-center">
                      <div className="w-5 h-5 text-gray-500 mr-3 flex items-center justify-center">⛰️</div>
                      <div>
                        <div className="text-sm text-gray-600">Elevación</div>
                        <div className="font-semibold">{aldea.location.elevation}</div>
                      </div>
                    </div>
                  )}

                  {aldea.foundedYear && aldea.foundedYear > 0 && (
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <div className="text-sm text-gray-600">Fundación</div>
                        <div className="font-semibold">{aldea.foundedYear}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Idiomas</h3>
                <div className="flex flex-wrap gap-2">
                  {aldea.languages.map((language, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Economic Activities */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Actividades Económicas</h3>
                <div className="space-y-2">
                  {getEconomicActivities().map((activity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      <span className="text-gray-700 text-sm">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Infraestructura</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">Escuela</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${aldea.infrastructure.hasSchool ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {aldea.infrastructure.hasSchool ? 'Sí' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">Centro de Salud</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${aldea.infrastructure.hasHealthCenter ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {aldea.infrastructure.hasHealthCenter ? 'Sí' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">Electricidad</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${aldea.infrastructure.hasElectricity ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {aldea.infrastructure.hasElectricity ? 'Sí' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">Agua Potable</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${aldea.infrastructure.hasWater ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {aldea.infrastructure.hasWater ? 'Sí' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">Acceso Vial</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs capitalize">
                      {aldea.infrastructure.roadAccess === 'paved' ? 'Pavimentado' : 
                       aldea.infrastructure.roadAccess === 'unpaved' ? 'Sin Pavimentar' : 'Sendero'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-900 text-white rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Información Municipal</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-3" />
                    <span>+502 7832-0001</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-3" />
                    <span>turismo@muniantigua.gob.gt</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs opacity-75">
                      Para más información sobre esta comunidad, contacta a la Municipalidad de La Antigua Guatemala.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
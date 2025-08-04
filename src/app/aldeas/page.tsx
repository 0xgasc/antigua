import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MapPin, Camera, Heart, Star, Clock } from 'lucide-react'
import { aldeaData } from '@/data/aldeas'

const aldeas = aldeaData.filter(aldea => aldea.status === 'active')

export default function AldeasPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Aldeas Auténticas
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre comunidades tradicionales donde la cultura maya vive en armonía 
              con la herencia colonial española. Cada aldea cuenta una historia única.
            </p>
          </div>
        </div>
      </section>

      {/* Aldeas Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aldeas.map((aldea) => (
              <div key={aldea.id} className="group cursor-pointer">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={aldea.images[0]}
                      alt={aldea.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Rating */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900 text-sm">{aldea.rating}</span>
                    </div>
                    
                    {/* Heart icon for favorites */}
                    <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <Heart className="w-5 h-5 text-white" />
                    </button>
                    
                    {/* Distance badge */}
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      <MapPin className="inline w-4 h-4 mr-1" />
                      {aldea.location.distance}
                    </div>

                    {/* Tours count */}
                    <div className="absolute bottom-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {aldea.tours} tours
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                      {aldea.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {aldea.shortDesc}
                    </p>
                    
                    <p className="text-gray-700 mb-6 text-sm leading-relaxed line-clamp-3">
                      {aldea.description}
                    </p>
                    
                    {/* Highlights */}
                    <div className="space-y-2 mb-6">
                      {aldea.highlights.slice(0, 3).map((highlight, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2 flex-shrink-0" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                        Ver Detalles
                      </button>
                      <button className="p-3 border-2 border-gray-200 hover:border-yellow-500 text-gray-600 hover:text-yellow-600 rounded-lg transition-colors duration-200">
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para una Experiencia Auténtica?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a nuestros tours guiados y descubre la verdadera Guatemala 
            en estas comunidades tradicionales llenas de historia y cultura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-xl transition-colors duration-200">
              Explorar Tours
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-xl transition-colors duration-200">
              Contactar Guía
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
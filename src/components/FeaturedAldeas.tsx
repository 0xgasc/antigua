'use client'

import { MapPin, Camera, Heart } from 'lucide-react'

const aldeas = [
  {
    id: 1,
    name: 'San Antonio Aguas Calientes',
    description: 'Famosa por sus textiles tradicionales y aguas termales naturales',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop',
    highlights: ['Textiles tradicionales', 'Aguas termales', 'Talleres artesanales'],
    distance: '8 km de Antigua'
  },
  {
    id: 2,
    name: 'Santa María de Jesús',
    description: 'Puerta de entrada al Volcán de Agua con vistas espectaculares',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop',
    highlights: ['Base del Volcán de Agua', 'Cultivos de café', 'Vista panorámica'],
    distance: '12 km de Antigua'
  },
  {
    id: 3,
    name: 'San Juan del Obispo',
    description: 'Aldea histórica con el primer palacio episcopal de América',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2940&auto=format&fit=crop',
    highlights: ['Palacio Episcopal', 'Arquitectura colonial', 'Iglesia histórica'],
    distance: '6 km de Antigua'
  },
  {
    id: 4,
    name: 'Ciudad Vieja',
    description: 'Primera capital de Guatemala con ruinas de gran valor histórico',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2940&auto=format&fit=crop',
    highlights: ['Primera capital', 'Ruinas históricas', 'Museo local'],
    distance: '10 km de Antigua'
  }
]

export default function FeaturedAldeas() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Aldeas Auténticas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre comunidades tradicionales donde la cultura maya vive en armonía 
            con la herencia colonial española
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aldeas.map((aldea) => (
            <div key={aldea.id} className="group cursor-pointer">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={aldea.image}
                    alt={aldea.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Heart icon for favorites */}
                  <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                  
                  {/* Distance badge */}
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    {aldea.distance}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                    {aldea.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {aldea.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {aldea.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2 flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm">
                      Explorar
                    </button>
                    <button className="p-2.5 border-2 border-gray-200 hover:border-yellow-500 text-gray-600 hover:text-yellow-600 rounded-lg transition-colors duration-200">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para Explorar?
            </h3>
            <p className="text-gray-600 mb-6">
              Cada aldea tiene su propia historia y tradiciones únicas. 
              Únete a nuestros tours guiados para una experiencia auténtica.
            </p>
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
              Planificar Mi Viaje
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'Semana Santa 2025',
    date: '13-20 Abril 2025',
    location: 'Antigua Guatemala',
    description: 'La celebración religiosa más importante de Guatemala con procesiones espectaculares',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2940&auto=format&fit=crop',
    category: 'Religioso',
    isFeatured: true,
    ticketPrice: 25
  },
  {
    id: 2,
    title: 'Festival de Barriletes Gigantes',
    date: '1 Noviembre 2024',
    location: 'Sumpango',
    description: 'Coloridos barriletes gigantes vuelan en honor a los difuntos',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop',
    category: 'Cultural',
    isFeatured: false,
    ticketPrice: 15
  },
  {
    id: 3,
    title: 'Feria de Santo Tomás',
    date: '15-21 Diciembre 2024',
    location: 'Chichicastenango',
    description: 'Una de las ferias más coloridas de Guatemala con danzas tradicionales',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2940&auto=format&fit=crop',
    category: 'Festival',
    isFeatured: true,
    ticketPrice: 20
  },
  {
    id: 4,
    title: 'Festival de Jazz Antigua',
    date: '15-17 Marzo 2025',
    location: 'Antigua Guatemala',
    description: 'Música jazz internacional en un entorno colonial único',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2940&auto=format&fit=crop',
    category: 'Musical',
    isFeatured: false,
    ticketPrice: 35
  }
]

export default function UpcomingEvents() {
  return (
    <section className="py-16 px-4 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Eventos y Festivales
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Vive las tradiciones guatemaltecas en festivales únicos que combinan 
            herencia maya, colonial y contemporánea
          </p>
        </div>

        {/* Featured Event */}
        <div className="mb-12">
          {events.filter(event => event.isFeatured).slice(0, 1).map(event => (
            <div key={event.id} className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 to-blue-900">
              <div className="absolute inset-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80" />
              </div>
              
              <div className="relative p-8 md:p-12 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center px-4 py-2 bg-yellow-500 text-black rounded-full text-sm font-semibold mb-4">
                      ⭐ EVENTO DESTACADO
                    </div>
                    
                    <h3 className="text-4xl md:text-5xl font-bold mb-4">
                      {event.title}
                    </h3>
                    
                    <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                      {event.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-6 mb-8">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Ticket className="w-5 h-5 mr-2" />
                        <span>${event.ticketPrice} USD</span>
                      </div>
                    </div>
                    
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
                      Comprar Boletos
                    </button>
                  </div>
                  
                  <div className="hidden lg:block">
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.filter(event => !event.isFeatured || events.indexOf(event) > 0).map(event => (
            <div key={event.id} className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-750 transition-colors duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  {event.category}
                </div>
                
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  ${event.ticketPrice}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
                  {event.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>
                
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">
              No Te Pierdas Ningún Evento
            </h3>
            <p className="text-black/80 mb-6">
              Suscríbete a nuestro boletín y recibe las últimas noticias sobre 
              festivales y eventos especiales en Antigua.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
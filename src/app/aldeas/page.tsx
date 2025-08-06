'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProfessionalBanner from '@/components/ProfessionalBanner'
import Link from 'next/link'
import { MapPin, Camera, Star } from 'lucide-react'
import { type Aldea } from '@/data/aldeas'

export default function AldeasPage() {
  const [aldeas, setAldeas] = useState<Aldea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAldeas()
  }, [])

  const fetchAldeas = async () => {
    try {
      const response = await fetch('/api/aldeas')
      if (response.ok) {
        const data = await response.json()
        // Filter only active aldeas
        setAldeas(data.filter((aldea: Aldea) => aldea.status === 'active'))
      } else {
        console.error('Failed to fetch aldeas')
      }
    } catch (error) {
      console.error('Error fetching aldeas:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <ProfessionalBanner 
          title="Paseos con Encanto"
          subtitle="Aldeas de La Antigua Guatemala"
          description="Información oficial sobre las comunidades rurales y aldeas que forman parte del municipio de La Antigua Guatemala"
          height="medium"
        />
        <div className="py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando aldeas...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Professional Banner */}
      <ProfessionalBanner 
        title="Paseos con Encanto"
        subtitle="Aldeas de La Antigua Guatemala"
        description="Información oficial sobre las comunidades rurales y aldeas que forman parte del municipio de La Antigua Guatemala"
        height="medium"
      />

      {/* Aldeas Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aldeas.map((aldea) => (
              <Link key={aldea.id} href={`/aldeas/${aldea.slug}`} className="group cursor-pointer">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-56 overflow-hidden">
                    {aldea.images.length > 0 ? (
                      <img
                        src={aldea.images[0]}
                        alt={aldea.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <MapPin className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm font-medium">{aldea.name}</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      {aldea.category === 'artisan' ? 'Artesanal' : 
                       aldea.category === 'cultural' ? 'Cultural' :
                       aldea.category === 'nature' ? 'Naturaleza' :
                       aldea.category === 'historical' ? 'Histórico' :
                       aldea.category === 'agricultural' ? 'Agrícola' : 'Cultural'}
                    </div>
                    
                    {/* Distance badge */}
                    <div className="absolute bottom-3 left-3 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs">
                      <MapPin className="inline w-3 h-3 mr-1" />
                      {aldea.location.distance}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
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
                      <div className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-center">
                        Ver Información
                      </div>
                      <div className="p-3 border-2 border-gray-200 hover:border-blue-500 text-gray-600 hover:text-blue-600 rounded-lg transition-colors duration-200 flex items-center justify-center">
                        <Camera className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Municipal Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Información Municipal
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Para más información sobre servicios municipales en estas comunidades, 
            contacta a la Municipalidad de La Antigua Guatemala.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors duration-200">
              Información Turística
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-xl transition-colors duration-200">
              Contactar Municipalidad
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
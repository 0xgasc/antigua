'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, MapPin, Eye, Search, Clock, Users } from 'lucide-react'
import Link from 'next/link'

export default function ToursPage() {
  const [tours, setTours] = useState([
    {
      id: 1,
      title: 'Experiencia Completa de Antigua',
      slug: 'experiencia-completa-antigua',
      description: 'Tour integral que combina historia, cultura y gastronomía',
      price: 85,
      duration: 8,
      maxCapacity: 12,
      category: 'CULTURAL',
      difficulty: 'EASY',
      images: ['https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=300&auto=format&fit=crop'],
      status: 'active',
      bookings: 15
    },
    {
      id: 2,
      title: 'Aldeas Auténticas',
      slug: 'aldeas-autenticas',
      description: 'Visita aldeas tradicionales y conoce la vida rural',
      price: 65,
      duration: 6,
      maxCapacity: 8,
      category: 'CULTURAL',
      difficulty: 'EASY',
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=300&auto=format&fit=crop'],
      status: 'active',
      bookings: 23
    }
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || tour.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este tour?')) {
      setTours(tours.filter(t => t.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Tours</h1>
              <p className="text-gray-600">Administra tours y experiencias turísticas</p>
            </div>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Nuevo Tour</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar tours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activo</option>
                <option value="draft">Borrador</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full font-semibold">
                  ${tour.price}
                </div>
                <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-medium ${
                  tour.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {tour.status === 'active' ? 'Activo' : 'Borrador'}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tour.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {tour.duration}h
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Máx. {tour.maxCapacity}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {tour.bookings} reservas
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {tour.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(tour.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron tours</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? 'Intenta con otros términos de búsqueda' : 'Comienza creando tu primer tour'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
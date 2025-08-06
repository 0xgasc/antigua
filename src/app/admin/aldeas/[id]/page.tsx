'use client'

import { ArrowLeft, Edit, MapPin, Clock, DollarSign, Star, Eye, Calendar } from 'lucide-react'
import Link from 'next/link'
import { aldeaData } from '@/data/aldeas'

export default function ViewAldeaPage({ params }: { params: { id: string } }) {
  const aldeaId = parseInt(params.id)
  const aldea = aldeaData.find(a => a.id === aldeaId)

  if (!aldea) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Aldea no encontrada</h2>
          <Link href="/admin/aldeas" className="text-yellow-600 hover:text-yellow-700">
            Volver a aldeas
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/aldeas"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{aldea.name}</h1>
                <p className="text-gray-600">Información detallada de la aldea</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href={`/admin/aldeas/${aldea.id}/edit`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Editar</span>
              </Link>
              <Link
                href={`/aldeas/${aldea.slug}`}
                target="_blank"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Ver en sitio</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Images */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Imágenes</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 pt-0">
                {aldea.images.map((image, index) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${aldea.name} - imagen ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripción</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">{aldea.shortDesc}</p>
                {aldea.description && (
                  <p className="text-gray-600 leading-relaxed">{aldea.description}</p>
                )}
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Puntos Destacados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {aldea.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Información de Ubicación</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Distancia</p>
                    <p className="font-semibold text-gray-900">{aldea.location.distance}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duración del viaje</p>
                    <p className="font-semibold text-gray-900">{aldea.location.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Calificación</p>
                    <p className="font-semibold text-gray-900">{aldea.rating}/5.0</p>
                  </div>
                </div>
              </div>
              
              {(aldea.location.coordinates.lat !== 0 || aldea.location.coordinates.lng !== 0) && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Coordenadas</h3>
                  <p className="text-gray-600">
                    Lat: {aldea.location.coordinates.lat}, Lng: {aldea.location.coordinates.lng}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado</h3>
              <div className="space-y-4">
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    aldea.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {aldea.status === 'active' ? 'Activo' : 'Borrador'}
                  </span>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-1">ID de la aldea</p>
                  <p className="font-mono text-sm">{aldea.id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">URL Slug</p>
                  <p className="font-mono text-sm text-blue-600">{aldea.slug}</p>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tours disponibles</span>
                  <span className="font-semibold">{aldea.tours}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Calificación</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{aldea.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Imágenes</span>
                  <span className="font-semibold">{aldea.images.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Destacados</span>
                  <span className="font-semibold">{aldea.highlights.length}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <Link
                  href={`/admin/aldeas/${aldea.id}/edit`}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar aldea</span>
                </Link>
                
                <Link
                  href={`/aldeas/${aldea.slug}`}
                  target="_blank"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver en sitio web</span>
                </Link>
                
                <button className="w-full border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-colors">
                  Eliminar aldea
                </button>
              </div>
            </div>

            {/* SEO Preview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista previa SEO</h3>
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                  {aldea.name} | Turismo Antigua
                </h4>
                <p className="text-green-600 text-sm mt-1">
                  turismoantigua.com/aldeas/{aldea.slug}
                </p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {aldea.shortDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
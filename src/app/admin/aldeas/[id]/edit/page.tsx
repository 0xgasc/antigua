'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Upload, X, Plus, MapPin, Clock, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { aldeaData, type Aldea } from '@/data/aldeas'

export default function EditAldeaPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const aldeaId = parseInt(params.id)
  const [isLoading, setIsLoading] = useState(false)
  
  // Find the aldea to edit
  const existingAldea = aldeaData.find(a => a.id === aldeaId)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    shortDesc: '',
    description: '',
    images: [''],
    location: {
      coordinates: { lat: 0, lng: 0 },
      distance: '',
      duration: ''
    },
    highlights: [''],
    tours: 0,
    rating: 0,
    status: 'draft' as 'active' | 'draft',
    price: 0,
    category: '',
    bestTimeToVisit: '',
    activities: [''],
    facilities: [''],
    accessibility: '',
    contactInfo: {
      phone: '',
      email: '',
      website: ''
    }
  })

  useEffect(() => {
    if (existingAldea) {
      setFormData({
        name: existingAldea.name,
        slug: existingAldea.slug,
        shortDesc: existingAldea.shortDesc,
        description: existingAldea.description || '',
        images: existingAldea.images,
        location: existingAldea.location,
        highlights: existingAldea.highlights,
        tours: existingAldea.tours,
        rating: existingAldea.rating,
        status: existingAldea.status,
        category: '',
        bestTimeToVisit: '',
        activities: [''],
        facilities: [''],
        accessibility: '',
        contactInfo: {
          phone: '',
          email: '',
          website: ''
        }
      })
    }
  }, [existingAldea])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev] as any,
        [field]: value
      }
    }))
  }

  const handleArrayInputChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item, i) => 
        i === index ? value : item
      )
    }))
  }

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), '']
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: Implement actual save functionality
      console.log('Saving aldea:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      router.push('/admin/aldeas')
    } catch (error) {
      console.error('Error saving aldea:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!existingAldea) {
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <h1 className="text-3xl font-bold text-gray-900">Editar Aldea</h1>
                <p className="text-gray-600">Actualiza la información de {formData.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => router.push('/admin/aldeas')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isLoading ? 'Guardando...' : 'Guardar'}</span>
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Información Básica</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Aldea *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug URL
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="cultural">Cultural</option>
                  <option value="artisan">Artesanal</option>
                  <option value="nature">Naturaleza</option>
                  <option value="adventure">Aventura</option>
                  <option value="gastronomic">Gastronómico</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="draft">Borrador</option>
                  <option value="active">Activo</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Corta *
              </label>
              <textarea
                value={formData.shortDesc}
                onChange={(e) => handleInputChange('shortDesc', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Completa
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Descripción detallada de la aldea..."
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Imágenes</h2>
            
            {formData.images.map((image, index) => (
              <div key={index} className="flex items-center space-x-3 mb-4">
                <div className="flex-1">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleArrayInputChange('images', index, e.target.value)}
                    placeholder="URL de la imagen"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                {image && (
                  <img src={image} alt="" className="w-16 h-16 object-cover rounded-lg" />
                )}
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('images', index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => addArrayItem('images')}
              className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar imagen</span>
            </button>
          </div>

          {/* Location & Pricing */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Ubicación y Precios</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Distancia
                </label>
                <input
                  type="text"
                  value={formData.location.distance}
                  onChange={(e) => handleNestedInputChange('location', 'distance', e.target.value)}
                  placeholder="ej: 15 km de Antigua"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Duración del viaje
                </label>
                <input
                  type="text"
                  value={formData.location.duration}
                  onChange={(e) => handleNestedInputChange('location', 'duration', e.target.value)}
                  placeholder="ej: 30 minutos"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Puntos Destacados</h2>
            
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-3 mb-3">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => handleArrayInputChange('highlights', index, e.target.value)}
                  placeholder="Punto destacado"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                {formData.highlights.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('highlights', index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => addArrayItem('highlights')}
              className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar punto destacado</span>
            </button>
          </div>

          {/* Activities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Actividades</h2>
            
            {formData.activities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 mb-3">
                <input
                  type="text"
                  value={activity}
                  onChange={(e) => handleArrayInputChange('activities', index, e.target.value)}
                  placeholder="Actividad disponible"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                {formData.activities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('activities', index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => addArrayItem('activities')}
              className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar actividad</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Información Adicional</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mejor época para visitar
                </label>
                <input
                  type="text"
                  value={formData.bestTimeToVisit}
                  onChange={(e) => handleInputChange('bestTimeToVisit', e.target.value)}
                  placeholder="ej: Todo el año, Noviembre - Abril"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accesibilidad
                </label>
                <select
                  value={formData.accessibility}
                  onChange={(e) => handleInputChange('accessibility', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">Seleccionar nivel</option>
                  <option value="easy">Fácil acceso</option>
                  <option value="moderate">Acceso moderado</option>
                  <option value="difficult">Acceso difícil</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
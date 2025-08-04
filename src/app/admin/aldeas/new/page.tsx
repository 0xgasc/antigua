'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Plus, X, MapPin, Clock, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function NewAldeaPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Auto-generate slug from name
    if (field === 'name' && value) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setFormData(prev => ({
        ...prev,
        slug: slug
      }))
    }
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
    if ((formData[field as keyof typeof formData] as string[]).length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: Implement actual save functionality
      const newAldea = {
        ...formData,
        id: Date.now(), // Temporary ID generation
        images: formData.images.filter(img => img.trim() !== ''),
        highlights: formData.highlights.filter(h => h.trim() !== ''),
        activities: formData.activities.filter(a => a.trim() !== '')
      }
      
      console.log('Creating new aldea:', newAldea)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      router.push('/admin/aldeas')
    } catch (error) {
      console.error('Error creating aldea:', error)
    } finally {
      setIsLoading(false)
    }
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
                <h1 className="text-3xl font-bold text-gray-900">Nueva Aldea</h1>
                <p className="text-gray-600">Crear una nueva aldea turística</p>
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
                disabled={isLoading || !formData.name || !formData.shortDesc}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isLoading ? 'Creando...' : 'Crear Aldea'}</span>
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
                  placeholder="ej: San Antonio Aguas Calientes"
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
                  placeholder="Se genera automáticamente"
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
                placeholder="Descripción breve que aparecerá en las tarjetas de vista previa"
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
                placeholder="Descripción detallada de la aldea, su historia, cultura y atractivos..."
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Imágenes</h2>
            <p className="text-sm text-gray-600 mb-4">
              Agrega URLs de imágenes de alta calidad que muestren la belleza de la aldea
            </p>
            
            {formData.images.map((image, index) => (
              <div key={index} className="flex items-center space-x-3 mb-4">
                <div className="flex-1">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleArrayInputChange('images', index, e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
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
                  Distancia desde Antigua
                </label>
                <input
                  type="text"
                  value={formData.location.distance}
                  onChange={(e) => handleNestedInputChange('location', 'distance', e.target.value)}
                  placeholder="ej: 15 km"
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitud
                </label>
                <input
                  type="number"
                  value={formData.location.coordinates.lat}
                  onChange={(e) => handleNestedInputChange('location', 'coordinates', {
                    ...formData.location.coordinates,
                    lat: parseFloat(e.target.value) || 0
                  })}
                  step="any"
                  placeholder="14.5592"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitud
                </label>
                <input
                  type="number"
                  value={formData.location.coordinates.lng}
                  onChange={(e) => handleNestedInputChange('location', 'coordinates', {
                    ...formData.location.coordinates,
                    lng: parseFloat(e.target.value) || 0
                  })}
                  step="any"
                  placeholder="-90.7344"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Puntos Destacados</h2>
            <p className="text-sm text-gray-600 mb-4">
              Características principales que hacen especial a esta aldea
            </p>
            
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-3 mb-3">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => handleArrayInputChange('highlights', index, e.target.value)}
                  placeholder="ej: Talleres de tejido tradicional"
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
            <p className="text-sm text-gray-600 mb-4">
              Actividades que los turistas pueden realizar en esta aldea
            </p>
            
            {formData.activities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 mb-3">
                <input
                  type="text"
                  value={activity}
                  onChange={(e) => handleArrayInputChange('activities', index, e.target.value)}
                  placeholder="ej: Caminata por senderos naturales"
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

          {/* Additional Information */}
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
                  Nivel de accesibilidad
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono de contacto
                </label>
                <input
                  type="tel"
                  value={formData.contactInfo.phone}
                  onChange={(e) => handleNestedInputChange('contactInfo', 'phone', e.target.value)}
                  placeholder="+502 1234-5678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.contactInfo.email}
                  onChange={(e) => handleNestedInputChange('contactInfo', 'email', e.target.value)}
                  placeholder="info@aldea.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sitio web
                </label>
                <input
                  type="url"
                  value={formData.contactInfo.website}
                  onChange={(e) => handleNestedInputChange('contactInfo', 'website', e.target.value)}
                  placeholder="https://aldea.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
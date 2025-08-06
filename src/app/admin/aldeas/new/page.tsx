'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Plus, X, MapPin, Clock, DollarSign, Camera } from 'lucide-react'
import Link from 'next/link'
import IrysUpload from '@/components/IrysUpload'

export default function NewAldeaPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadTargetIndex, setUploadTargetIndex] = useState<number | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    shortDesc: '',
    description: '',
    images: [''],
    location: {
      lat: 0,
      lng: 0,
      distance: '',
      municipality: '',
      department: '',
      elevation: ''
    },
    highlights: [''],
    population: 0,
    foundedYear: 0,
    status: 'draft' as 'active' | 'draft',
    category: 'cultural' as 'cultural' | 'artisan' | 'nature' | 'agricultural' | 'historical',
    mainActivities: [''],
    culturalSignificance: '',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved' as 'paved' | 'unpaved' | 'trail'
    },
    languages: ['Español'],
    economicActivities: ['']
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

  const handleImageUpload = (url: string) => {
    if (uploadTargetIndex !== null) {
      handleArrayInputChange('images', uploadTargetIndex, url)
    }
    setShowUploadModal(false)
    setUploadTargetIndex(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Clean up the data
      const cleanFormData = {
        ...formData,
        images: formData.images.filter(img => img.trim() !== ''),
        highlights: formData.highlights.filter(h => h.trim() !== ''),
        mainActivities: formData.mainActivities.filter(a => a.trim() !== ''),
        economicActivities: formData.economicActivities.filter(a => a.trim() !== ''),
        languages: formData.languages.filter(l => l.trim() !== '')
      }
      
      console.log('Creating new aldea:', cleanFormData)
      
      // Create via API
      const response = await fetch('/api/aldeas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanFormData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to create aldea')
      }
      
      const newAldea = await response.json()
      console.log('Aldea created successfully:', newAldea)
      
      router.push('/admin/aldeas')
    } catch (error) {
      console.error('Error creating aldea:', error)
      alert('Error al crear la aldea. Por favor, intente de nuevo.')
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="cultural">Cultural</option>
                  <option value="artisan">Artesanal</option>
                  <option value="nature">Naturaleza</option>
                  <option value="agricultural">Agrícola</option>
                  <option value="historical">Histórico</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
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
                <div className="flex-1 flex items-center space-x-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleArrayInputChange('images', index, e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setUploadTargetIndex(index)
                      setShowUploadModal(true)
                    }}
                    className="p-2 text-yellow-600 hover:text-yellow-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    title="Subir imagen"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Municipio
                </label>
                <input
                  type="text"
                  value={formData.location.municipality}
                  onChange={(e) => handleNestedInputChange('location', 'municipality', e.target.value)}
                  placeholder="ej: Antigua Guatemala"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departamento
                </label>
                <input
                  type="text"
                  value={formData.location.department}
                  onChange={(e) => handleNestedInputChange('location', 'department', e.target.value)}
                  placeholder="Sacatepéquez"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Elevación
                </label>
                <input
                  type="text"
                  value={formData.location.elevation}
                  onChange={(e) => handleNestedInputChange('location', 'elevation', e.target.value)}
                  placeholder="1,530 msnm"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitud
                </label>
                <input
                  type="number"
                  value={formData.location.lat}
                  onChange={(e) => handleNestedInputChange('location', 'lat', parseFloat(e.target.value) || 0)}
                  step="any"
                  placeholder="14.5592"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitud
                </label>
                <input
                  type="number"
                  value={formData.location.lng}
                  onChange={(e) => handleNestedInputChange('location', 'lng', parseFloat(e.target.value) || 0)}
                  step="any"
                  placeholder="-90.7344"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
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
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
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

          {/* Main Activities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Actividades Principales</h2>
            <p className="text-sm text-gray-600 mb-4">
              Actividades principales que los turistas pueden realizar en esta aldea
            </p>
            
            {formData.mainActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 mb-3">
                <input
                  type="text"
                  value={activity}
                  onChange={(e) => handleArrayInputChange('mainActivities', index, e.target.value)}
                  placeholder="ej: Talleres de tejido tradicional"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                />
                {formData.mainActivities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('mainActivities', index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => addArrayItem('mainActivities')}
              className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar actividad principal</span>
            </button>
          </div>

          {/* Infrastructure */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Infraestructura</h2>
            <p className="text-sm text-gray-600 mb-4">
              Servicios e infraestructura disponible en la aldea
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasSchool"
                    checked={formData.infrastructure.hasSchool}
                    onChange={(e) => handleNestedInputChange('infrastructure', 'hasSchool', e.target.checked)}
                    className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <label htmlFor="hasSchool" className="ml-2 text-sm text-gray-700">
                    Escuela
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasHealthCenter"
                    checked={formData.infrastructure.hasHealthCenter}
                    onChange={(e) => handleNestedInputChange('infrastructure', 'hasHealthCenter', e.target.checked)}
                    className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <label htmlFor="hasHealthCenter" className="ml-2 text-sm text-gray-700">
                    Centro de Salud
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasElectricity"
                    checked={formData.infrastructure.hasElectricity}
                    onChange={(e) => handleNestedInputChange('infrastructure', 'hasElectricity', e.target.checked)}
                    className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <label htmlFor="hasElectricity" className="ml-2 text-sm text-gray-700">
                    Electricidad
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasWater"
                    checked={formData.infrastructure.hasWater}
                    onChange={(e) => handleNestedInputChange('infrastructure', 'hasWater', e.target.checked)}
                    className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <label htmlFor="hasWater" className="ml-2 text-sm text-gray-700">
                    Agua Potable
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Acceso por Carretera
                </label>
                <select
                  value={formData.infrastructure.roadAccess}
                  onChange={(e) => handleNestedInputChange('infrastructure', 'roadAccess', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="paved">Pavimentada</option>
                  <option value="unpaved">No pavimentada</option>
                  <option value="trail">Sendero</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cultural Significance */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Significado Cultural</h2>
            <p className="text-sm text-gray-600 mb-4">
              Importancia histórica y cultural de la aldea
            </p>
            
            <textarea
              value={formData.culturalSignificance}
              onChange={(e) => handleInputChange('culturalSignificance', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="Describa la importancia histórica, cultural y patrimonial de esta aldea..."
            />
          </div>

          {/* Economic Activities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Actividades Económicas</h2>
            <p className="text-sm text-gray-600 mb-4">
              Principales fuentes de ingresos y actividades económicas de la comunidad
            </p>
            
            {formData.economicActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 mb-3">
                <input
                  type="text"
                  value={activity}
                  onChange={(e) => handleArrayInputChange('economicActivities', index, e.target.value)}
                  placeholder="ej: Agricultura de café, Turismo comunitario"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                />
                {formData.economicActivities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('economicActivities', index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => addArrayItem('economicActivities')}
              className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar actividad económica</span>
            </button>
          </div>

          {/* Languages and Demographics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Demografia e Idiomas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Población
                </label>
                <input
                  type="number"
                  value={formData.population}
                  onChange={(e) => handleInputChange('population', parseInt(e.target.value) || 0)}
                  placeholder="3500"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Año de Fundación
                </label>
                <input
                  type="number"
                  value={formData.foundedYear}
                  onChange={(e) => handleInputChange('foundedYear', parseInt(e.target.value) || 0)}
                  placeholder="1524"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Idiomas
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Idiomas hablados en la comunidad
              </p>
              
              {formData.languages.map((language, index) => (
                <div key={index} className="flex items-center space-x-3 mb-3">
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => handleArrayInputChange('languages', index, e.target.value)}
                    placeholder="ej: Español, Kaqchikel"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                  />
                  {formData.languages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('languages', index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('languages')}
                className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar idioma</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Image Upload Modal */}
      {showUploadModal && (
        <IrysUpload
          onUpload={handleImageUpload}
          onClose={() => {
            setShowUploadModal(false)
            setUploadTargetIndex(null)
          }}
        />
      )}
    </div>
  )
}
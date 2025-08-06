'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Upload, X, Plus, MapPin, Clock, DollarSign, Camera } from 'lucide-react'
import Link from 'next/link'
import { type Aldea } from '@/data/aldeas'
import IrysUpload from '@/components/IrysUpload'

export default function EditAldeaPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const aldeaId = parseInt(params.id)
  const [isLoading, setIsLoading] = useState(false)
  const [existingAldea, setExistingAldea] = useState<Aldea | null>(null)
  const [pageLoading, setPageLoading] = useState(true)
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

  useEffect(() => {
    fetchAldea()
  }, [aldeaId])

  const fetchAldea = async () => {
    try {
      const response = await fetch(`/api/aldeas/${aldeaId}`)
      if (response.ok) {
        const aldea = await response.json()
        setExistingAldea(aldea)
        
        setFormData({
          name: aldea.name,
          slug: aldea.slug,
          shortDesc: aldea.shortDesc,
          description: aldea.description || '',
          images: aldea.images || [''],
          location: {
            lat: aldea.location.lat,
            lng: aldea.location.lng,
            distance: aldea.location.distance,
            municipality: aldea.location.municipality,
            department: aldea.location.department,
            elevation: aldea.location.elevation || ''
          },
          highlights: aldea.highlights || [''],
          population: aldea.population || 0,
          foundedYear: aldea.foundedYear || 0,
          status: aldea.status,
          category: aldea.category,
          mainActivities: aldea.mainActivities || [''],
          culturalSignificance: aldea.culturalSignificance || '',
          infrastructure: aldea.infrastructure,
          languages: aldea.languages || ['Español'],
          economicActivities: aldea.economicActivities || ['']
        })
      } else {
        console.error('Failed to fetch aldea')
      }
    } catch (error) {
      console.error('Error fetching aldea:', error)
    } finally {
      setPageLoading(false)
    }
  }

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
      const response = await fetch(`/api/aldeas/${aldeaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to save aldea')
      }
      
      const updatedAldea = await response.json()
      console.log('Aldea saved successfully:', updatedAldea)
      
      router.push('/admin/aldeas')
    } catch (error) {
      console.error('Error saving aldea:', error)
      alert('Error al guardar la aldea. Por favor, intente de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando aldea...</p>
        </div>
      </div>
    )
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Descripción detallada de la aldea..."
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Imágenes</h2>
            
            {formData.images.map((image, index) => (
              <div key={index} className="flex items-center space-x-3 mb-4">
                <div className="flex-1 flex space-x-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleArrayInputChange('images', index, e.target.value)}
                    placeholder="URL de la imagen"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setUploadTargetIndex(index)
                      setShowUploadModal(true)
                    }}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    title="Subir imagen"
                  >
                    <Camera className="w-5 h-5" />
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

          {/* Location */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Ubicación</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitud
                </label>
                <input
                  type="number"
                  step="0.000001"
                  value={formData.location.lat}
                  onChange={(e) => handleNestedInputChange('location', 'lat', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitud
                </label>
                <input
                  type="number"
                  step="0.000001"
                  value={formData.location.lng}
                  onChange={(e) => handleNestedInputChange('location', 'lng', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  placeholder="ej: 1,550 msnm"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departamento
                </label>
                <input
                  type="text"
                  value={formData.location.department}
                  onChange={(e) => handleNestedInputChange('location', 'department', e.target.value)}
                  placeholder="ej: Sacatepéquez"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
            
            {formData.mainActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 mb-3">
                <input
                  type="text"
                  value={activity}
                  onChange={(e) => handleArrayInputChange('mainActivities', index, e.target.value)}
                  placeholder="Actividad principal"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
              <span>Agregar actividad</span>
            </button>
          </div>

          {/* Cultural and Economic Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Información Cultural y Económica</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Población
                </label>
                <input
                  type="number"
                  value={formData.population}
                  onChange={(e) => handleInputChange('population', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Significado Cultural
              </label>
              <textarea
                value={formData.culturalSignificance}
                onChange={(e) => handleInputChange('culturalSignificance', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Importancia cultural e histórica de la aldea..."
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Actividades Económicas</h3>
              {formData.economicActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 mb-3">
                  <input
                    type="text"
                    value={activity}
                    onChange={(e) => handleArrayInputChange('economicActivities', index, e.target.value)}
                    placeholder="Actividad económica"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
          </div>
          
          {/* Infrastructure */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Infraestructura</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.infrastructure.hasSchool}
                  onChange={(e) => handleNestedInputChange('infrastructure', 'hasSchool', e.target.checked)}
                  className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                />
                <span className="text-sm text-gray-700">Escuela</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.infrastructure.hasHealthCenter}
                  onChange={(e) => handleNestedInputChange('infrastructure', 'hasHealthCenter', e.target.checked)}
                  className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                />
                <span className="text-sm text-gray-700">Centro de Salud</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.infrastructure.hasElectricity}
                  onChange={(e) => handleNestedInputChange('infrastructure', 'hasElectricity', e.target.checked)}
                  className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                />
                <span className="text-sm text-gray-700">Electricidad</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.infrastructure.hasWater}
                  onChange={(e) => handleNestedInputChange('infrastructure', 'hasWater', e.target.checked)}
                  className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                />
                <span className="text-sm text-gray-700">Agua Potable</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Acceso por Carretera
              </label>
              <select
                value={formData.infrastructure.roadAccess}
                onChange={(e) => handleNestedInputChange('infrastructure', 'roadAccess', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="paved">Pavimentada</option>
                <option value="unpaved">Sin pavimentar</option>
                <option value="trail">Sendero</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      
      {/* Upload Modal */}
      {showUploadModal && (
        <IrysUpload
          onUploadComplete={handleImageUpload}
          onClose={() => {
            setShowUploadModal(false)
            setUploadTargetIndex(null)
          }}
        />
      )}
    </div>
  )
}
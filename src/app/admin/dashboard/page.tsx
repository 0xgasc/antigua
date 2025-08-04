'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { 
  BarChart3, 
  Users, 
  MapPin, 
  Calendar,
  Plus,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  FileText,
  Building
} from 'lucide-react'
import { aldeaData } from '@/data/aldeas'
import { eventsData } from '@/data/events'
import { toursData } from '@/data/tours'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalCommunities: aldeaData.length,
    activeCommunities: aldeaData.filter(aldea => aldea.status === 'active').length,
    totalTours: toursData.length,
    totalEvents: eventsData.length,
    totalPopulation: aldeaData.reduce((sum, aldea) => sum + (aldea.population || 0), 0),
    recentUpdates: 3
  })

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/admin/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const quickActions = [
    { title: 'Nueva Información Turística', icon: Plus, href: '/admin/tours/new', color: 'bg-blue-500' },
    { title: 'Nueva Comunidad', icon: MapPin, href: '/admin/aldeas/new', color: 'bg-green-500' },
    { title: 'Nuevo Evento', icon: Calendar, href: '/admin/events/new', color: 'bg-purple-500' },
    { title: 'Ver Contenido', icon: Eye, href: '/admin/content', color: 'bg-orange-500' }
  ]

  const recentUpdates = [
    { id: 1, type: 'Comunidad', item: 'San Juan del Obispo', action: 'Actualizada', date: '2024-08-04' },
    { id: 2, type: 'Evento', item: 'Festival del Chocolate', action: 'Programado', date: '2024-08-03' },
    { id: 3, type: 'Información', item: 'Paseos con Encanto', action: 'Modificada', date: '2024-08-02' },
    { id: 4, type: 'Comunidad', item: 'Santa Ana', action: 'Creada', date: '2024-08-01' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600">Bienvenido, {session.user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium">
                Ver Sitio Web
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Comunidades Totales</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCommunities}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">{stats.activeCommunities} activas</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Población Total</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPopulation.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">habitantes registrados</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Información Turística</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalTours}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">sitios de interés</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eventos Municipales</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">programados</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => router.push(action.href)}
                className="bg-white hover:bg-gray-50 p-6 rounded-xl shadow-sm border-2 border-transparent hover:border-yellow-500 transition-all duration-200 group"
              >
                <div className={`${action.color} p-3 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600">
                  {action.title}
                </h3>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Updates */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Actualizaciones Recientes</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Ver todas
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentUpdates.map((update) => (
                  <div key={update.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">{update.item}</h3>
                      <p className="text-sm text-gray-600">{update.type} - {update.action}</p>
                      <p className="text-xs text-gray-500">{update.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {update.type}
                      </span>
                      <div className="flex space-x-2 mt-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Portal Status */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Estado del Portal</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Portal Web</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ● Activo
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Contenido Municipal</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ● Actualizado
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Información Turística</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ● Disponible
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Última Sincronización</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    ● Hace 1h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
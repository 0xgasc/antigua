'use client'

import { useState } from 'react'
import { X, Calendar, Users, Clock, MapPin } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  tourId?: string
}

export default function BookingModal({ isOpen, onClose, tourId }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    tourId: tourId || '',
    date: '',
    participants: 1,
    name: '',
    email: '',
    phone: ''
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement booking submission
    console.log('Booking submitted:', formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 1 ? 'Selecciona tu Experiencia' : 'Información de Contacto'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Fecha del Tour
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="inline w-4 h-4 mr-1" />
                    Número de Personas
                  </label>
                  <select
                    value={formData.participants}
                    onChange={(e) => setFormData({...formData, participants: parseInt(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'personas'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Experiencia
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'cultural', name: 'Tour Cultural', icon: '🏛️', desc: 'Explora la historia y tradiciones' },
                    { id: 'adventure', name: 'Aventura', icon: '🥾', desc: 'Senderismo y actividades al aire libre' },
                    { id: 'gastronomic', name: 'Gastronómico', icon: '🍽️', desc: 'Sabores auténticos locales' },
                    { id: 'artisan', name: 'Artesanal', icon: '🎨', desc: 'Talleres con artesanos locales' }
                  ].map(tour => (
                    <div
                      key={tour.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-yellow-500 cursor-pointer transition-colors"
                      onClick={() => setFormData({...formData, tourId: tour.id})}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{tour.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{tour.name}</h3>
                          <p className="text-sm text-gray-600">{tour.desc}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          4-6 horas
                        </span>
                        <span className="font-semibold text-yellow-600">$45 USD</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.date || !formData.tourId}
                className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Continuar
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-yellow-800 mb-2">Resumen de tu Reserva</h3>
                <div className="text-sm text-yellow-700 space-y-1">
                  <p>📅 Fecha: {formData.date}</p>
                  <p>👥 Personas: {formData.participants}</p>
                  <p>💰 Total: ${45 * formData.participants} USD</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="+502 1234-5678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Confirmar Reserva
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
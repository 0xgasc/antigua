export interface Event {
  id: number
  title: string
  description: string
  image: string
  date: string
  time: string
  location: string
  category: 'festival' | 'cultural' | 'religious' | 'gastronomic' | 'artisan'
  featured: boolean
  entryType: 'free' | 'donation' | 'registration'
  organizer: string
  capacity?: number
  culturalSignificance: string
  communityInvolvement: string[]
}

export const eventsData: Event[] = [
  {
    id: 1,
    title: 'Semana Santa - Procesiones Tradicionales',
    description: 'La celebración religiosa y cultural más importante de Antigua Guatemala. Procesiones centenarias que recorren las calles empedradas con alfombras de aserrín elaboradas por la comunidad.',
    image: 'https://images.unsplash.com/photo-1552066344-6d9c04acd79c?q=80&w=2940&auto=format&fit=crop',
    date: '2024-03-24',
    time: '06:00',
    location: 'Centro Histórico de Antigua',
    category: 'religious',
    featured: true,
    entryType: 'free',
    organizer: 'Municipalidad de Antigua Guatemala',
    capacity: 10000,
    culturalSignificance: 'Patrimonio Cultural Inmaterial de la Humanidad por UNESCO. Tradición de más de 400 años que combina fe católica con arte popular.',
    communityInvolvement: ['Hermandades religiosas', 'Artesanos de alfombras', 'Vecinos del centro histórico', 'Cooperativas locales']
  },
  {
    id: 2,
    title: 'Semana Santa en Antigua',
    description: 'La celebración religiosa más importante del año con procesiones, alfombras de aserrín y tradiciones centenarias',
    image: 'https://images.unsplash.com/photo-1552066344-6d9c04acd79c?q=80&w=2940&auto=format&fit=crop',
    date: '2024-03-24',
    time: '06:00',
    location: 'Centro Histórico de Antigua',
    price: 0,
    category: 'religious',
    featured: true,
    ticketsAvailable: 1000,
    maxCapacity: 5000
  },
  {
    id: 3,
    title: 'Festival del Café',
    description: 'Celebración del café guatemalteco con degustaciones, talleres y competencias de baristas',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2940&auto=format&fit=crop',
    date: '2024-11-15',
    time: '09:00',
    location: 'Finca El Injerto',
    price: 35,
    category: 'gastronomic',
    featured: false,
    ticketsAvailable: 80,
    maxCapacity: 100
  },
  {
    id: 4,
    title: 'Mercado de Artesanías Navideño',
    description: 'Mercado especial con artesanías únicas, comida tradicional y música en vivo',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop',
    date: '2024-12-08',
    time: '10:00',
    location: 'Parque Central',
    price: 0,
    category: 'artisan',
    featured: false,
    ticketsAvailable: 500,
    maxCapacity: 800
  },
  {
    id: 5,
    title: 'Festival de Barriletes Gigantes',
    description: 'Tradición del Día de los Muertos con barriletes gigantes de colores vibrantes',
    image: 'https://images.unsplash.com/photo-1509909756405-be0199881695?q=80&w=2940&auto=format&fit=crop',
    date: '2024-11-01',
    time: '14:00',
    location: 'Cementerio de Santiago Sacatepéquez',
    price: 15,
    category: 'cultural',
    featured: true,
    ticketsAvailable: 200,
    maxCapacity: 400
  },
  {
    id: 6,
    title: 'Noche de los Faroles',
    description: 'Caminata nocturna por las calles empedradas iluminadas por faroles tradicionales',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2940&auto=format&fit=crop',
    date: '2024-09-14',
    time: '19:00',
    location: 'Centro Histórico',
    price: 20,
    category: 'cultural',
    featured: false,
    ticketsAvailable: 100,
    maxCapacity: 150
  }
]
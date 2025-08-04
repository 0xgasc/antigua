export interface Aldea {
  id: number
  name: string
  slug: string
  shortDesc: string
  description: string
  images: string[]
  location: {
    lat: number
    lng: number
    distance: string
  }
  highlights: string[]
  rating: number
  tours: number
  status: 'active' | 'draft'
  createdAt: string
  updatedAt: string
}

export const aldeaData: Aldea[] = [
  {
    id: 1,
    name: 'San Antonio Aguas Calientes',
    slug: 'san-antonio-aguas-calientes',
    shortDesc: 'Famosa por sus textiles tradicionales y aguas termales naturales',
    description: 'San Antonio Aguas Calientes es una aldea conocida mundialmente por sus hermosos textiles tradicionales tejidos a mano por las mujeres de la comunidad. Sus aguas termales naturales ofrecen un lugar perfecto para relajarse después de un día explorando los talleres artesanales.',
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop'],
    location: { 
      lat: 14.5556, 
      lng: -90.7489,
      distance: '8 km de Antigua'
    },
    highlights: ['Textiles tradicionales', 'Aguas termales', 'Talleres artesanales', 'Gastronomía local'],
    rating: 4.8,
    tours: 5,
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: 2,
    name: 'Santa María de Jesús',
    slug: 'santa-maria-de-jesus',
    shortDesc: 'Puerta de entrada al Volcán de Agua con vistas espectaculares',
    description: 'Ubicada en las faldas del Volcán de Agua, esta aldea es el punto de partida perfecto para ascensos y caminatas. La comunidad se dedica principalmente al cultivo de café y verduras, ofreciendo una vista auténtica de la vida rural guatemalteca.',
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop'],
    location: { 
      lat: 14.5167, 
      lng: -90.7333,
      distance: '12 km de Antigua'
    },
    highlights: ['Base del Volcán de Agua', 'Cultivos de café', 'Vista panorámica', 'Senderismo'],
    rating: 4.6,
    tours: 3,
    status: 'active',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-18'
  },
  {
    id: 3,
    name: 'San Juan del Obispo',
    slug: 'san-juan-del-obispo',
    shortDesc: 'Aldea histórica con el primer palacio episcopal de América',
    description: 'Rica en historia colonial, alberga el primer palacio episcopal construido en América. Sus calles empedradas y arquitectura colonial bien preservada la convierten en un destino perfecto para los amantes de la historia.',
    images: ['https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=800&auto=format&fit=crop'],
    location: { 
      lat: 14.5447, 
      lng: -90.7342,
      distance: '6 km de Antigua'
    },
    highlights: ['Palacio Episcopal', 'Arquitectura colonial', 'Iglesia histórica', 'Museo local'],
    rating: 4.7,
    tours: 4,
    status: 'active',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-16'
  },
  {
    id: 4,
    name: 'Ciudad Vieja',
    slug: 'ciudad-vieja',
    shortDesc: 'Primera capital de Guatemala con ruinas de gran valor histórico',
    description: 'La primera capital del reino de Guatemala, fundada en 1527. Aunque fue destruida por una avalancha en 1541, conserva importantes ruinas históricas y es un sitio fundamental para entender la historia colonial de Guatemala.',
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop'],
    location: { 
      lat: 14.5167, 
      lng: -90.7667,
      distance: '10 km de Antigua'
    },
    highlights: ['Primera capital', 'Ruinas históricas', 'Museo arqueológico', 'Sitio patrimonial'],
    rating: 4.5,
    tours: 2,
    status: 'active',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-14'
  },
  {
    id: 5,
    name: 'Santa Catarina Barahona',
    slug: 'santa-catarina-barahona',
    shortDesc: 'Comunidad agrícola con tradiciones mayas vivas',
    description: 'Una pequeña comunidad que mantiene vivas las tradiciones mayas ancestrales. Sus habitantes se dedican principalmente a la agricultura y conservan ceremonias y costumbres que han pasado de generación en generación.',
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'],
    location: { 
      lat: 14.5234, 
      lng: -90.7123,
      distance: '15 km de Antigua'
    },
    highlights: ['Tradiciones mayas', 'Agricultura orgánica', 'Ceremonias ancestrales', 'Productos locales'],
    rating: 4.4,
    tours: 2,
    status: 'active',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-12'
  },
  {
    id: 6,
    name: 'San Miguel Dueñas',
    slug: 'san-miguel-duenas',
    shortDesc: 'Aldea cafetalera con paisajes montañosos impresionantes',
    description: 'Rodeada de plantaciones de café y montañas, San Miguel Dueñas ofrece algunos de los mejores cafés de la región. Los visitantes pueden aprender sobre el proceso completo del café, desde la siembra hasta la taza.',
    images: ['https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop'],
    location: { 
      lat: 14.4923, 
      lng: -90.7456,
      distance: '20 km de Antigua'
    },
    highlights: ['Plantaciones de café', 'Proceso del café', 'Paisajes montañosos', 'Degustaciones'],
    rating: 4.6,
    tours: 3,
    status: 'draft',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-10'
  }
]
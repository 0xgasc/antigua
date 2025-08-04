export interface Tour {
  id: number
  title: string
  description: string
  image: string
  duration: string
  groupSize?: string
  difficulty?: 'easy' | 'moderate' | 'difficult'
  highlights: string[]
  category: 'cultural' | 'adventure' | 'gastronomic' | 'artisan' | 'nature'
  location: string
  accessibility?: string
  seasonality?: string
}

export const toursData: Tour[] = [
  {
    id: 1,
    title: 'Recorrido Histórico de Antigua',
    description: 'Recorrido completo por los principales sitios históricos y culturales de la ciudad colonial',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2940&auto=format&fit=crop',
    duration: '8 horas',
    groupSize: 'Grupos pequeños',
    difficulty: 'easy',
    highlights: ['Arco de Santa Catalina', 'Convento de las Capuchinas', 'Plaza Central', 'Iglesias coloniales'],
    category: 'cultural',
    location: 'Antigua Guatemala',
    accessibility: 'Apto para todas las edades',
    seasonality: 'Todo el año'
  },
  {
    id: 2,
    title: 'Comunidades Tradicionales',
    description: 'Visita comunidades tradicionales y conoce la cultura maya viva',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop',
    duration: '6 horas',
    groupSize: 'Grupos pequeños',
    difficulty: 'easy',
    highlights: ['San Antonio Aguas Calientes', 'Talleres textiles', 'Cultura kaqchikel', 'Tradiciones ancestrales'],
    category: 'cultural',
    location: 'San Antonio Aguas Calientes',
    accessibility: 'Accesible para la mayoría',
    seasonality: 'Todo el año'
  },
  {
    id: 3,
    title: 'Senderismo en Volcanes',
    description: 'Caminatas guiadas en los volcanes con vistas espectaculares de la región',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop',
    duration: '10 horas',
    groupSize: 'Máximo 15 personas',
    difficulty: 'difficult',
    highlights: ['Volcán Pacaya', 'Paisajes volcánicos', 'Flora y fauna', 'Vistas panorámicas'],
    category: 'adventure',
    location: 'Volcán Pacaya',
    accessibility: 'Requiere buena condición física',
    seasonality: 'Noviembre - Abril'
  },
  {
    id: 4,
    title: 'Taller de Textiles Tradicionales',
    description: 'Conoce las técnicas ancestrales de tejido con maestras artesanas locales',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop',
    duration: '4 horas',
    groupSize: 'Grupos pequeños',
    difficulty: 'easy',
    highlights: ['Técnicas de tejido maya', 'Maestras artesanas', 'Telar de cintura', 'Historia textil'],
    category: 'artisan',
    location: 'San Antonio Aguas Calientes',
    accessibility: 'Apto para todas las edades',
    seasonality: 'Todo el año'
  },
  {
    id: 5,
    title: 'Ascenso al Volcán de Agua',
    description: 'Caminata guiada al volcán con vistas espectaculares de la región',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop',
    duration: '8 horas',
    groupSize: 'Grupos pequeños',
    difficulty: 'difficult',
    highlights: ['Sendero de montaña', 'Vista panorámica', 'Biodiversidad', 'Ecosistemas de altura'],
    category: 'adventure',
    location: 'Santa María de Jesús',
    accessibility: 'Requiere excelente condición física',
    seasonality: 'Diciembre - Mayo'
  },
  {
    id: 6,
    title: 'Ruta Gastronómica Colonial',
    description: 'Descubre la rica tradición culinaria de Antigua Guatemala',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2940&auto=format&fit=crop',
    duration: '3 horas',
    groupSize: 'Grupos medianos',
    difficulty: 'easy',
    highlights: ['Mercado Central', 'Cocina tradicional', 'Historia gastronómica', 'Productos locales'],
    category: 'gastronomic',
    location: 'Antigua Guatemala',
    accessibility: 'Apto para todas las edades',
    seasonality: 'Todo el año'
  },
  {
    id: 7,
    title: 'Historia de Ciudad Vieja',
    description: 'Explora la primera capital del Reino de Guatemala',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=2940&auto=format&fit=crop',
    duration: '5 horas',
    groupSize: 'Grupos grandes disponibles',
    difficulty: 'easy',
    highlights: ['Primera capital colonial', 'Sitio arqueológico', 'Historia nacional', 'Patrimonio cultural'],
    category: 'cultural',
    location: 'Ciudad Vieja',
    accessibility: 'Accesible con algunas limitaciones',
    seasonality: 'Todo el año'
  },
  {
    id: 8,
    title: 'Ruta del Café',
    description: 'Conoce el proceso tradicional del café guatemalteco',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2940&auto=format&fit=crop',
    duration: '5 horas',
    groupSize: 'Grupos pequeños',
    difficulty: 'easy',
    highlights: ['Fincas cafetaleras', 'Proceso de producción', 'Cultura cafetalera', 'Sostenibilidad'],
    category: 'nature',
    location: 'San Miguel Dueñas',
    accessibility: 'Terreno irregular en algunas áreas',
    seasonality: 'Mejor en época de cosecha (Nov-Mar)'
  }
]
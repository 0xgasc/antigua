import { PrismaClient } from '@prisma/client'

export interface Aldea {
  id: number
  name: string
  nameEn?: string
  slug: string
  shortDesc: string
  shortDescEn?: string
  description: string
  descriptionEn?: string
  images: string[]
  location: {
    lat: number
    lng: number
    distance: string
    distanceEn?: string
    municipality: string
    municipalityEn?: string
    department: string
    departmentEn?: string
    elevation?: string
  }
  highlights: string[]
  highlightsEn?: string[]
  population?: number
  foundedYear?: number
  status: 'active' | 'draft'
  category: 'cultural' | 'artisan' | 'nature' | 'agricultural' | 'historical'
  mainActivities: string[]
  mainActivitiesEn?: string[]
  culturalSignificance: string
  culturalSignificanceEn?: string
  infrastructure: {
    hasSchool: boolean
    hasHealthCenter: boolean
    hasElectricity: boolean
    hasWater: boolean
    roadAccess: 'paved' | 'unpaved' | 'trail'
  }
  languages: string[]
  economicActivities: string[]
  economicActivitiesEn?: string[]
  createdAt: string
  updatedAt: string
}

const prisma = new PrismaClient()

function mapStatusFromEnum(status: string) {
  return status === 'ACTIVE' ? 'active' : 'draft'
}

function mapCategoryFromEnum(category: string) {
  return category.toLowerCase() as 'cultural' | 'artisan' | 'nature' | 'agricultural' | 'historical'
}

// Function to get aldea data from database
export async function getAldeaData(): Promise<Aldea[]> {
  try {
    const aldeas = await prisma.aldea.findMany({
      orderBy: { id: 'asc' }
    })
    
    return aldeas.map(aldea => ({
      ...aldea,
      status: mapStatusFromEnum(aldea.status),
      category: mapCategoryFromEnum(aldea.category),
      createdAt: aldea.createdAt.toISOString().split('T')[0],
      updatedAt: aldea.updatedAt.toISOString().split('T')[0]
    }))
  } catch (error) {
    console.error('Error fetching aldea data:', error)
    return []
  }
}

// For backward compatibility - use static data as fallback
export let aldeaData: Aldea[] = []

// Load data on module initialization (for server-side rendering)
if (typeof window === 'undefined') {
  getAldeaData().then(data => {
    aldeaData = data
  }).catch(error => {
    console.error('Failed to load aldea data:', error)
    aldeaData = []
  })
}

// Keep the original data structure for complete backward compatibility
const originalData: Aldea[] = [
  {
    id: 1,
    name: 'San Juan del Obispo',
    nameEn: 'San Juan del Obispo',
    slug: 'san-juan-del-obispo',
    shortDesc: 'Pueblo pintoresco declarado por UNESCO, famoso por sus artesanías de níspero, chocolate y madera',
    shortDescEn: 'UNESCO-declared picturesque village, famous for loquat, chocolate and wooden handicrafts',
    description: 'Aldea pintoresca de la Antigua Guatemala, ubicada a 4 kilómetros hacia el sur del centro de la ciudad colonial. Cuenta con 3,586 habitantes. Muchos de ellos se dedican a hacer trabajos artesanales con materias primas como el níspero, el chocolate, la madera y otros. Su fundación como aldea data del siglo XVI, y se fundó con el nombre de San Juan Bautista de Guatemala. Un siglo después cambia su nombre a San Juan del Obispo, en honor al primer obispo de Guatemala, Francisco Marroquín, quien vivió allí.',
    descriptionEn: 'Picturesque village of Antigua Guatemala, located 4 kilometers south of the colonial city center. It has 3,586 inhabitants. Many of them are dedicated to making handicrafts with raw materials such as loquat, chocolate, wood and others. Its foundation as a village dates from the 16th century, and it was founded with the name of San Juan Bautista de Guatemala. A century later it changed its name to San Juan del Obispo, in honor of the first bishop of Guatemala, Francisco Marroquín, who lived there.',
    images: [
      'https://devnet.irys.xyz/85PcSP7bsr3mAP8219M7bNuQQc4K46cj34cYPEYk7WG5'
    ],
    location: { 
      lat: 14.5447, 
      lng: -90.7342,
      distance: '4 km al sur de Antigua',
      distanceEn: '4 km south of Antigua',
      municipality: 'Antigua Guatemala',
      municipalityEn: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      departmentEn: 'Sacatepéquez',
      elevation: '1,550 msnm'
    },
    highlights: [
      'Pueblo Pintoresco UNESCO',
      'Artesanías de níspero y chocolate',
      'Festival del Níspero (Nov 8-9)',
      'Festival del Chocolate (Ago 10)',
      'Festival del Pepián (1er fin de semana Jun)',
      'Programa Paseos con Encanto'
    ],
    highlightsEn: [
      'UNESCO Picturesque Village',
      'Loquat and chocolate handicrafts',
      'Loquat Festival (Nov 8-9)',
      'Chocolate Festival (Aug 10)',
      'Pepián Festival (1st weekend Jun)',
      'Charming Walks Program'
    ],
    population: 3586,
    foundedYear: 1524,
    status: 'active',
    category: 'artisan',
    mainActivities: [
      'Artesanías de níspero (licores, vinagres, mermeladas)',
      'Chocolate artesanal',
      'Ebanistería y productos de madera',
      'Trabajos en plata y hierro forjado',
      'Productos de cuero y miel'
    ],
    mainActivitiesEn: [
      'Loquat crafts (liqueurs, vinegars, jams)',
      'Artisanal chocolate',
      'Cabinetmaking and wood products',
      'Silver and wrought iron work',
      'Leather products and honey'
    ],
    culturalSignificance: 'Pueblo declarado "Pueblo Pintoresco" por la UNESCO. Fundado en el siglo XVI como San Juan Bautista de Guatemala, cambió su nombre en honor al primer obispo de Guatemala, Francisco Marroquín. Centro de tradiciones artesanales reconocido a nivel nacional.',
    culturalSignificanceEn: 'Village declared "Picturesque Village" by UNESCO. Founded in the 16th century as San Juan Bautista de Guatemala, it changed its name in honor of Guatemala\'s first bishop, Francisco Marroquín. Center of artisanal traditions recognized at the national level.',
    infrastructure: {
      hasSchool: true,
      hasHealthCenter: true,
      hasElectricity: true,
      hasWater: true,
      roadAccess: 'paved'
    },
    languages: ['Español', 'Kaqchikel'],
    economicActivities: [
      'Artesanías de níspero',
      'Chocolate artesanal',
      'Ebanistería y carpintería',
      'Turismo cultural',
      'Agricultura familiar'
    ],
    economicActivitiesEn: [
      'Loquat handicrafts',
      'Artisanal chocolate',
      'Cabinetmaking and carpentry',
      'Cultural tourism',
      'Family farming'
    ],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 2,
    name: 'Santa Ana',
    slug: 'santa-ana',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 3,
    name: 'El Hato',
    slug: 'el-hato',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 4,
    name: 'Guardiania El Hato',
    slug: 'guardiania-el-hato',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 5,
    name: 'Guayabal',
    slug: 'guayabal',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 6,
    name: 'San Bartolo',
    slug: 'san-bartolo',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 7,
    name: 'San Cristobal el Bajo',
    slug: 'san-cristobal-el-bajo',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 8,
    name: 'San Cristobal el Alto',
    slug: 'san-cristobal-el-alto',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 9,
    name: 'San Felipe',
    slug: 'san-felipe',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 10,
    name: 'San Gaspar Vivar',
    slug: 'san-gaspar-vivar',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 11,
    name: 'San Juan Gascón',
    slug: 'san-juan-gascon',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 12,
    name: 'San Lázaro',
    slug: 'san-lazaro',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [
      'https://images.unsplash.com/photo-1602120012884-6aa678fa79c7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617679139957-a2a988781f25?q=80&w=800&auto=format&fit=crop'
    ],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 13,
    name: 'San Mateo Milpas Altas',
    slug: 'san-mateo-milpas-altas',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [
      'https://plus.unsplash.com/premium_photo-1687879693677-d04e793214a3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590778197285-06a014f2226a?q=80&w=800&auto=format&fit=crop'
    ],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 14,
    name: 'San Pedro',
    slug: 'san-pedro',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 15,
    name: 'Santa Catarina Bobadilla',
    slug: 'santa-catarina-bobadilla',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [
      'https://plus.unsplash.com/premium_photo-1726721290778-6b6a364d834d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589783500222-4529ddfd87d1?q=80&w=800&auto=format&fit=crop'
    ],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 16,
    name: 'Santa Inés',
    slug: 'santa-ines',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [
      'https://images.unsplash.com/photo-1635697298927-0784975caa66?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529456559600-c3e56a82b3e1?q=80&w=800&auto=format&fit=crop'
    ],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 17,
    name: 'San Pedro las Huertas',
    slug: 'san-pedro-las-huertas',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [
      'https://plus.unsplash.com/premium_photo-1730145749990-e0a854daea1c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604251086259-8f3bf6000a18?q=80&w=800&auto=format&fit=crop'
    ],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  },
  {
    id: 18,
    name: 'San Bartolome Becerra',
    slug: 'san-bartolome-becerra',
    shortDesc: 'Pendiente',
    description: 'Pendiente',
    images: [],
    location: { 
      lat: 0, 
      lng: 0,
      distance: 'Pendiente',
      municipality: 'Antigua Guatemala',
      department: 'Sacatepéquez',
      elevation: 'Pendiente'
    },
    highlights: ['Pendiente', 'Pendiente', 'Pendiente'],
    population: 0,
    foundedYear: 0,
    status: 'active',
    category: 'cultural',
    mainActivities: ['Pendiente'],
    culturalSignificance: 'Pendiente',
    infrastructure: {
      hasSchool: false,
      hasHealthCenter: false,
      hasElectricity: false,
      hasWater: false,
      roadAccess: 'unpaved'
    },
    languages: ['Español'],
    economicActivities: ['Pendiente'],
    createdAt: '2024-08-04',
    updatedAt: '2024-08-04'
  }
]
export const translations = {
  es: {
    // Navigation
    home: 'Inicio',
    tours: 'Tours',
    villages: 'Aldeas',
    events: 'Eventos',
    contact: 'Contacto',
    bookNow: 'Reservar Ahora',
    
    // Hero Section
    heroTitle: 'Descubre la Magia de',
    heroSubtitle: 'Antigua Guatemala',
    heroDescription: 'Explora aldeas auténticas, experimenta cultura viva y crea recuerdos inolvidables en la joya colonial de Guatemala',
    searchTours: 'Buscar Tours',
    date: 'Fecha',
    destination: 'Destino',
    people: 'Personas',
    allVillages: 'Todas las aldeas',
    
    // Experience Finder
    experienceFinderTitle: 'Encuentra tu Experiencia Perfecta',
    experienceFinderSubtitle: 'Desde talleres artesanales hasta aventuras en la naturaleza, descubre experiencias auténticas en cada aldea',
    searchExperiences: 'Buscar experiencias...',
    all: 'Todas',
    cultural: 'Cultural',
    adventure: 'Aventura',
    gastronomic: 'Gastronómico',
    artisan: 'Artesanal',
    nature: 'Naturaleza',
    
    // Featured Tours
    featuredToursTitle: 'Tours Destacados',
    featuredToursSubtitle: 'Experiencias cuidadosamente diseñadas para mostrarte lo mejor de Antigua y sus alrededores con guías locales expertos',
    includes: 'Incluye:',
    viewAllTours: 'Ver Todos los Tours',
    
    // Featured Villages
    featuredVillagesTitle: 'Aldeas Auténticas',
    featuredVillagesSubtitle: 'Descubre comunidades tradicionales donde la cultura maya vive en armonía con la herencia colonial española',
    explore: 'Explorar',
    readyToExplore: '¿Listo para Explorar?',
    planMyTrip: 'Planificar Mi Viaje',
    
    // Events
    eventsTitle: 'Eventos y Festivales',
    eventsSubtitle: 'Vive las tradiciones guatemaltecas en festivales únicos que combinan herencia maya, colonial y contemporánea',
    featuredEvent: 'EVENTO DESTACADO',
    viewDetails: 'Ver Detalles',
    buyTickets: 'Comprar Boletos',
    dontMissEvents: 'No Te Pierdas Ningún Evento',
    subscribe: 'Suscribirse',
    
    // Common
    hours: 'horas',
    maxPeople: 'Máx. personas',
    person: 'persona',
    people: 'personas',
    usd: 'USD'
  },
  en: {
    // Navigation
    home: 'Home',
    tours: 'Tours',
    villages: 'Villages',
    events: 'Events',
    contact: 'Contact',
    bookNow: 'Book Now',
    
    // Hero Section
    heroTitle: 'Discover the Magic of',
    heroSubtitle: 'Antigua Guatemala',
    heroDescription: 'Explore authentic villages, experience living culture and create unforgettable memories in Guatemala\'s colonial gem',
    searchTours: 'Search Tours',
    date: 'Date',
    destination: 'Destination',
    people: 'People',
    allVillages: 'All villages',
    
    // Experience Finder
    experienceFinderTitle: 'Find Your Perfect Experience',
    experienceFinderSubtitle: 'From artisan workshops to nature adventures, discover authentic experiences in every village',
    searchExperiences: 'Search experiences...',
    all: 'All',
    cultural: 'Cultural',
    adventure: 'Adventure',
    gastronomic: 'Gastronomic',
    artisan: 'Artisan',
    nature: 'Nature',
    
    // Featured Tours
    featuredToursTitle: 'Featured Tours',
    featuredToursSubtitle: 'Carefully designed experiences to show you the best of Antigua and its surroundings with expert local guides',
    includes: 'Includes:',
    viewAllTours: 'View All Tours',
    
    // Featured Villages
    featuredVillagesTitle: 'Authentic Villages',
    featuredVillagesSubtitle: 'Discover traditional communities where Mayan culture lives in harmony with Spanish colonial heritage',
    explore: 'Explore',
    readyToExplore: 'Ready to Explore?',
    planMyTrip: 'Plan My Trip',
    
    // Events
    eventsTitle: 'Events & Festivals',
    eventsSubtitle: 'Experience Guatemalan traditions in unique festivals that combine Mayan, colonial, and contemporary heritage',
    featuredEvent: 'FEATURED EVENT',
    viewDetails: 'View Details',
    buyTickets: 'Buy Tickets',
    dontMissEvents: 'Don\'t Miss Any Event',
    subscribe: 'Subscribe',
    
    // Common
    hours: 'hours',
    maxPeople: 'Max people',
    person: 'person',
    people: 'people',
    usd: 'USD'
  }
}

export type Language = 'es' | 'en'
export type TranslationKey = keyof typeof translations.es

export function getTranslation(lang: Language, key: TranslationKey): string {
  return translations[lang][key] || translations.es[key] || key
}
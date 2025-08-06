require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const aldeasData = require('../src/data/aldeas.json')

const prisma = new PrismaClient()

function mapStatusToEnum(status) {
  return status === 'active' ? 'ACTIVE' : 'DRAFT'
}

function mapCategoryToEnum(category) {
  const categoryMap = {
    'cultural': 'CULTURAL',
    'artisan': 'ARTISAN', 
    'nature': 'NATURE',
    'agricultural': 'AGRICULTURAL',
    'historical': 'HISTORICAL'
  }
  return categoryMap[category] || 'CULTURAL'
}

async function seed() {
  console.log('🌱 Starting database seed...')
  
  try {
    // Clear existing aldeas
    await prisma.aldea.deleteMany()
    console.log('🧹 Cleared existing aldeas')
    
    // Seed aldeas
    for (const aldea of aldeasData) {
      const createdAldea = await prisma.aldea.create({
        data: {
          id: aldea.id,
          name: aldea.name,
          nameEn: aldea.nameEn,
          slug: aldea.slug,
          shortDesc: aldea.shortDesc,
          shortDescEn: aldea.shortDescEn,
          description: aldea.description || '',
          descriptionEn: aldea.descriptionEn,
          images: aldea.images || [],
          location: aldea.location,
          highlights: aldea.highlights || [],
          highlightsEn: aldea.highlightsEn || [],
          population: aldea.population,
          foundedYear: aldea.foundedYear,
          status: mapStatusToEnum(aldea.status),
          category: mapCategoryToEnum(aldea.category),
          mainActivities: aldea.mainActivities || [],
          mainActivitiesEn: aldea.mainActivitiesEn || [],
          culturalSignificance: aldea.culturalSignificance || '',
          culturalSignificanceEn: aldea.culturalSignificanceEn,
          infrastructure: aldea.infrastructure,
          languages: aldea.languages || ['Español'],
          economicActivities: aldea.economicActivities || [],
          economicActivitiesEn: aldea.economicActivitiesEn || [],
        }
      })
      console.log(`✅ Created aldea: ${createdAldea.name}`)
    }
    
    const count = await prisma.aldea.count()
    console.log(`🎉 Successfully seeded ${count} aldeas!`)
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
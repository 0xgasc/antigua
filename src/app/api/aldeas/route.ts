import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function mapStatusFromEnum(status: string) {
  return status === 'ACTIVE' ? 'active' : 'draft'
}

function mapCategoryFromEnum(category: string) {
  return category.toLowerCase()
}

export async function GET() {
  try {
    console.log('=== ALDEAS API CALLED ===')
    console.log('Environment:', process.env.NODE_ENV)
    console.log('Database URL exists:', !!process.env.DATABASE_URL)
    console.log('Database URL preview:', process.env.DATABASE_URL?.substring(0, 30) + '...')
    
    // First test the connection
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    const aldeas = await prisma.aldea.findMany({
      orderBy: { id: 'asc' }
    })
    
    console.log(`✅ Found ${aldeas.length} aldeas`)
    console.log('Sample aldea names:', aldeas.slice(0, 3).map(a => a.name))
    
    const responseData = aldeas.map(aldea => ({
      ...aldea,
      status: mapStatusFromEnum(aldea.status),
      category: mapCategoryFromEnum(aldea.category),
      createdAt: aldea.createdAt.toISOString().split('T')[0],
      updatedAt: aldea.updatedAt.toISOString().split('T')[0],
      tours: 0 // Add tours count if needed later
    }))
    
    console.log('✅ Returning response with', responseData.length, 'aldeas')
    return NextResponse.json(responseData)
  } catch (error) {
    console.error('❌ Error fetching aldeas:', error)
    
    // Fallback data if database fails
    const fallbackData = [
      {
        id: 1,
        name: "San Juan del Obispo",
        slug: "san-juan-del-obispo", 
        shortDesc: "Pueblo pintoresco declarado por UNESCO",
        description: "Aldea pintoresca de la Antigua Guatemala",
        images: ["https://devnet.irys.xyz/85PcSP7bsr3mAP8219M7bNuQQc4K46cj34cYPEYk7WG5"],
        location: {
          lat: 14.5447,
          lng: -90.7342,
          distance: "4 km al sur de Antigua",
          municipality: "Antigua Guatemala",
          department: "Sacatepéquez",
          elevation: "1,550 msnm"
        },
        highlights: ["Pueblo Pintoresco UNESCO", "Artesanías de níspero"],
        population: 3586,
        foundedYear: 1524,
        status: "active",
        category: "artisan",
        mainActivities: ["Artesanías de níspero"],
        culturalSignificance: "Pueblo declarado Pueblo Pintoresco por la UNESCO",
        infrastructure: {
          hasSchool: true,
          hasHealthCenter: true,
          hasElectricity: true,
          hasWater: true,
          roadAccess: "paved"
        },
        languages: ["Español"],
        economicActivities: ["Artesanías de níspero"],
        createdAt: "2024-08-04",
        updatedAt: "2024-08-04",
        tours: 0
      }
    ]
    
    console.log('⚠️ Using fallback data')
    return NextResponse.json(fallbackData)
  } finally {
    await prisma.$disconnect()
  }
}

function mapStatusToEnum(status: string) {
  return status === 'active' ? 'ACTIVE' : 'DRAFT'
}

function mapCategoryToEnum(category: string) {
  const categoryMap: { [key: string]: string } = {
    'cultural': 'CULTURAL',
    'artisan': 'ARTISAN', 
    'nature': 'NATURE',
    'agricultural': 'AGRICULTURAL',
    'historical': 'HISTORICAL'
  }
  return categoryMap[category] || 'CULTURAL'
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== CREATE ALDEA API CALLED ===')
    const requestData = await request.json()
    console.log('Received data:', requestData)
    
    // Create the aldea in database
    const newAldea = await prisma.aldea.create({
      data: {
        name: requestData.name,
        nameEn: requestData.nameEn,
        slug: requestData.slug,
        shortDesc: requestData.shortDesc,
        shortDescEn: requestData.shortDescEn,
        description: requestData.description || '',
        descriptionEn: requestData.descriptionEn,
        images: requestData.images || [],
        location: requestData.location,
        highlights: requestData.highlights || [],
        highlightsEn: requestData.highlightsEn || [],
        population: requestData.population,
        foundedYear: requestData.foundedYear,
        status: requestData.status ? mapStatusToEnum(requestData.status) : 'DRAFT',
        category: requestData.category ? mapCategoryToEnum(requestData.category) : 'CULTURAL',
        mainActivities: requestData.mainActivities || [],
        mainActivitiesEn: requestData.mainActivitiesEn || [],
        culturalSignificance: requestData.culturalSignificance || '',
        culturalSignificanceEn: requestData.culturalSignificanceEn,
        infrastructure: requestData.infrastructure,
        languages: requestData.languages || ['Español'],
        economicActivities: requestData.economicActivities || [],
        economicActivitiesEn: requestData.economicActivitiesEn || [],
      }
    })
    
    console.log('✅ Created aldea:', newAldea.name)
    
    // Convert back to frontend format
    const responseData = {
      ...newAldea,
      status: mapStatusFromEnum(newAldea.status),
      category: mapCategoryFromEnum(newAldea.category),
      createdAt: newAldea.createdAt.toISOString().split('T')[0],
      updatedAt: newAldea.updatedAt.toISOString().split('T')[0]
    }
    
    return NextResponse.json(responseData, { status: 201 })
  } catch (error) {
    console.error('❌ Error creating aldea:', error)
    return NextResponse.json(
      { error: 'Failed to create aldea', details: error.message },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
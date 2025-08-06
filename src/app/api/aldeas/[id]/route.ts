import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function mapStatusFromEnum(status: string) {
  return status === 'ACTIVE' ? 'active' : 'draft'
}

function mapCategoryFromEnum(category: string) {
  return category.toLowerCase()
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const aldeaId = parseInt(params.id)
    const updatedData = await request.json()
    
    // Update the aldea in database
    const updatedAldea = await prisma.aldea.update({
      where: { id: aldeaId },
      data: {
        name: updatedData.name,
        nameEn: updatedData.nameEn,
        slug: updatedData.slug,
        shortDesc: updatedData.shortDesc,
        shortDescEn: updatedData.shortDescEn,
        description: updatedData.description || '',
        descriptionEn: updatedData.descriptionEn,
        images: updatedData.images || [],
        location: updatedData.location,
        highlights: updatedData.highlights || [],
        highlightsEn: updatedData.highlightsEn || [],
        population: updatedData.population,
        foundedYear: updatedData.foundedYear,
        status: updatedData.status ? mapStatusToEnum(updatedData.status) : undefined,
        category: updatedData.category ? mapCategoryToEnum(updatedData.category) : undefined,
        mainActivities: updatedData.mainActivities || [],
        mainActivitiesEn: updatedData.mainActivitiesEn || [],
        culturalSignificance: updatedData.culturalSignificance || '',
        culturalSignificanceEn: updatedData.culturalSignificanceEn,
        infrastructure: updatedData.infrastructure,
        languages: updatedData.languages || ['Español'],
        economicActivities: updatedData.economicActivities || [],
        economicActivitiesEn: updatedData.economicActivitiesEn || [],
      }
    })
    
    // Convert back to frontend format
    const responseData = {
      ...updatedAldea,
      status: mapStatusFromEnum(updatedAldea.status),
      category: mapCategoryFromEnum(updatedAldea.category),
      createdAt: updatedAldea.createdAt.toISOString().split('T')[0],
      updatedAt: updatedAldea.updatedAt.toISOString().split('T')[0]
    }
    
    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error updating aldea:', error)
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Aldea not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update aldea' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const aldeaId = parseInt(params.id)
    
    const aldea = await prisma.aldea.findUnique({
      where: { id: aldeaId }
    })
    
    if (!aldea) {
      return NextResponse.json(
        { error: 'Aldea not found' },
        { status: 404 }
      )
    }
    
    // Convert to frontend format
    const responseData = {
      ...aldea,
      status: mapStatusFromEnum(aldea.status),
      category: mapCategoryFromEnum(aldea.category),
      createdAt: aldea.createdAt.toISOString().split('T')[0],
      updatedAt: aldea.updatedAt.toISOString().split('T')[0]
    }
    
    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error fetching aldea:', error)
    return NextResponse.json(
      { error: 'Failed to fetch aldea' },
      { status: 500 }
    )
  }
}
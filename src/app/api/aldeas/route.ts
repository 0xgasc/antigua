import { NextResponse } from 'next/server'
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
    console.log('Fetching aldeas from database...')
    
    // First test the connection
    await prisma.$connect()
    console.log('Database connected successfully')
    
    const aldeas = await prisma.aldea.findMany({
      orderBy: { id: 'asc' }
    })
    
    console.log(`Found ${aldeas.length} aldeas`)
    
    const responseData = aldeas.map(aldea => ({
      ...aldea,
      status: mapStatusFromEnum(aldea.status),
      category: mapCategoryFromEnum(aldea.category),
      createdAt: aldea.createdAt.toISOString().split('T')[0],
      updatedAt: aldea.updatedAt.toISOString().split('T')[0],
      tours: 0 // Add tours count if needed later
    }))
    
    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error fetching aldeas:', error)
    return NextResponse.json(
      { error: 'Failed to fetch aldeas', details: error.message },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
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
    const aldeas = await prisma.aldea.findMany({
      orderBy: { id: 'asc' }
    })
    
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
      { error: 'Failed to fetch aldeas' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { type Aldea } from '@/data/aldeas'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const aldeaId = parseInt(params.id)
    const updatedData: Partial<Aldea> = await request.json()
    
    // Read the JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'aldeas.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const aldeasData: Aldea[] = JSON.parse(fileContent)
    
    // Find the aldea to update
    const aldeaIndex = aldeasData.findIndex(a => a.id === aldeaId)
    
    if (aldeaIndex === -1) {
      return NextResponse.json(
        { error: 'Aldea not found' },
        { status: 404 }
      )
    }
    
    // Update the aldea
    const updatedAldea = {
      ...aldeasData[aldeaIndex],
      ...updatedData,
      updatedAt: new Date().toISOString().split('T')[0]
    }
    
    aldeasData[aldeaIndex] = updatedAldea
    
    // Write back to the JSON file
    await fs.writeFile(filePath, JSON.stringify(aldeasData, null, 2), 'utf-8')
    
    return NextResponse.json(updatedAldea)
  } catch (error) {
    console.error('Error updating aldea:', error)
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
    
    // Read the JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'aldeas.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const aldeasData: Aldea[] = JSON.parse(fileContent)
    
    const aldea = aldeasData.find(a => a.id === aldeaId)
    
    if (!aldea) {
      return NextResponse.json(
        { error: 'Aldea not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(aldea)
  } catch (error) {
    console.error('Error fetching aldea:', error)
    return NextResponse.json(
      { error: 'Failed to fetch aldea' },
      { status: 500 }
    )
  }
}
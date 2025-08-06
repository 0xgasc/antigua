import { NextRequest, NextResponse } from 'next/server'
import { Uploader } from '@irys/upload'
import { Ethereum } from '@irys/upload-ethereum'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting Irys upload...')
    
    // Get form data from request
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }
    
    console.log(`📁 Received file: ${file.name} (${file.size} bytes)`)
    
    // Check environment variables
    const privateKey = process.env.PRIVATE_KEY
    const sepoliaRpc = process.env.SEPOLIA_RPC
    
    console.log('🔍 Environment check:')
    console.log(`  - PRIVATE_KEY exists: ${!!privateKey}`)
    console.log(`  - SEPOLIA_RPC exists: ${!!sepoliaRpc}`)
    
    if (!privateKey) {
      return NextResponse.json(
        { error: 'PRIVATE_KEY environment variable not configured' },
        { status: 500 }
      )
    }
    
    if (!sepoliaRpc) {
      return NextResponse.json(
        { error: 'SEPOLIA_RPC environment variable not configured' },
        { status: 500 }
      )
    }
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Initialize Irys uploader
    const irysUploader = await Uploader(Ethereum)
      .withWallet(privateKey)
      .withRpc(sepoliaRpc)
      .devnet()
    
    // Check balance and price
    const price = await irysUploader.getPrice(buffer.length)
    const balance = await irysUploader.getBalance()
    
    console.log(`💰 Balance: ${balance} wei, Cost: ${price} wei`)
    
    if (BigInt(balance) < BigInt(price)) {
      return NextResponse.json(
        { error: `Insufficient balance. Need: ${price} wei, Have: ${balance} wei` },
        { status: 400 }
      )
    }
    
    // Determine content type
    const contentType = getContentType(file.name)
    
    // Upload to Irys
    console.log(`🚀 Uploading ${file.name} to Irys...`)
    const receipt = await irysUploader.upload(buffer, {
      tags: [
        { name: 'Content-Type', value: contentType },
        { name: 'Filename', value: file.name },
        { name: 'Original-Size', value: buffer.length.toString() },
        { name: 'Upload-Timestamp', value: new Date().toISOString() },
        { name: 'Application', value: 'Antigua Tourism' }
      ]
    })
    
    const irysUrl = `https://devnet.irys.xyz/${receipt.id}`
    
    console.log(`✅ Upload successful: ${irysUrl}`)
    
    return NextResponse.json({
      success: true,
      url: irysUrl,
      id: receipt.id,
      arUrl: `ar://${receipt.id}`,
      size: buffer.length,
      contentType: contentType
    })
    
  } catch (error) {
    console.error('❌ Irys upload error:', error)
    return NextResponse.json(
      { 
        error: 'Upload failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}

// Enhanced content type detection
const getContentType = (filename: string): string => {
  const ext = filename.toLowerCase().split('.').pop()
  const contentTypes: { [key: string]: string } = {
    // Images
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'bmp': 'image/bmp',
    'tiff': 'image/tiff',
    'ico': 'image/x-icon',
    
    // Videos
    'mp4': 'video/mp4',
    'mov': 'video/quicktime',
    'avi': 'video/x-msvideo',
    'webm': 'video/webm',
    'mkv': 'video/x-matroska',
    'flv': 'video/x-flv',
    'wmv': 'video/x-ms-wmv',
    'm4v': 'video/x-m4v',
    '3gp': 'video/3gpp',
    
    // Audio
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'flac': 'audio/flac',
    'm4a': 'audio/mp4',
    'aac': 'audio/aac',
    'ogg': 'audio/ogg',
    'wma': 'audio/x-ms-wma',
    
    // Documents
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'txt': 'text/plain',
    
    // Default
    'default': 'application/octet-stream'
  }
  
  return contentTypes[ext || ''] || contentTypes['default']
}
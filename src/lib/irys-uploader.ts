/**
 * Irys/Arweave File Uploader Utility
 * 
 * A standalone utility for uploading files to Irys/Arweave decentralized storage.
 * Extracted from King Gizzard Archive project for reuse in other applications.
 */

import { Uploader } from '@irys/upload';
import { Ethereum } from '@irys/upload-ethereum';

export interface UploadResult {
  id: string;
  url: string;
  arUrl: string;
  originalHash: string;
  size: number;
  contentType: string;
  filename: string;
}

export interface UploadConfig {
  privateKey: string;
  rpcUrl: string;
  useDevnet?: boolean;
}

// Enhanced content type detection
const getContentType = (filename: string): string => {
  const ext = filename.toLowerCase().split('.').pop();
  const contentTypes: Record<string, string> = {
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
    'json': 'application/json',
    
    // Default
    'default': 'application/octet-stream'
  };
  
  return contentTypes[ext || ''] || contentTypes['default'];
};

// Calculate MD5 hash for verification
const calculateHash = async (buffer: ArrayBuffer): Promise<string> => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    // Browser environment
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } else {
    // Node.js environment
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(Buffer.from(buffer)).digest('hex');
  }
};

// Initialize Irys uploader
const getIrysUploader = async (config: UploadConfig) => {
  try {
    let uploader = Uploader(Ethereum)
      .withWallet(config.privateKey)
      .withRpc(config.rpcUrl);
    
    if (config.useDevnet !== false) {
      uploader = uploader.devnet();
    }
    
    return await uploader;
  } catch (error) {
    console.error('Error initializing Irys uploader:', error);
    throw new Error(`Failed to initialize Irys uploader: ${error}`);
  }
};

// Upload file to Irys
export const uploadFileToIrys = async (
  file: File | Buffer,
  config: UploadConfig,
  onProgress?: (progress: number) => void
): Promise<UploadResult> => {
  try {
    let buffer: ArrayBuffer;
    let filename: string;
    
    if (file instanceof File) {
      // Browser File object
      filename = file.name;
      buffer = await file.arrayBuffer();
    } else {
      // Node.js Buffer
      filename = 'uploaded-file';
      buffer = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
    }
    
    if (buffer.byteLength === 0) {
      throw new Error('File is empty');
    }

    console.log(`📁 Processing: ${filename}`);
    console.log(`   Size: ${(buffer.byteLength / 1024 / 1024).toFixed(2)} MB`);
    
    onProgress?.(10);
    
    // Create hash for verification
    const originalHash = await calculateHash(buffer);
    console.log(`   Hash: ${originalHash.substring(0, 16)}...`);
    
    onProgress?.(20);
    
    const irysUploader = await getIrysUploader(config);
    
    onProgress?.(30);
    
    // Check price and balance
    const price = await irysUploader.getPrice(buffer.byteLength);
    const balance = await irysUploader.getBalance();
    console.log(`💰 Cost: ${price} wei, Balance: ${balance} wei`);
    
    if (BigInt(balance) < BigInt(price)) {
      throw new Error(`Insufficient balance. Need: ${price} wei, Have: ${balance} wei`);
    }
    
    onProgress?.(40);
    
    // Determine content type
    const contentType = getContentType(filename);
    console.log(`   Content-Type: ${contentType}`);
    
    onProgress?.(50);
    
    console.log(`🚀 Uploading ${filename}...`);
    const receipt = await irysUploader.upload(new Uint8Array(buffer), {
      tags: [
        { name: 'Content-Type', value: contentType },
        { name: 'Filename', value: filename },
        { name: 'Original-Size', value: buffer.byteLength.toString() },
        { name: 'Original-Hash', value: originalHash },
        { name: 'Upload-Timestamp', value: new Date().toISOString() },
        { name: 'Uploader', value: 'antigua-tourism-app' }
      ]
    });
    
    onProgress?.(90);
    
    const baseUrl = config.useDevnet !== false ? 'https://devnet.irys.xyz' : 'https://irys.xyz';
    const arweaveUrl = `${baseUrl}/${receipt.id}`;
    
    console.log(`✅ Upload complete: ${arweaveUrl}`);
    console.log(`   Transaction ID: ${receipt.id}`);
    
    onProgress?.(100);
    
    return {
      id: receipt.id,
      url: arweaveUrl,
      arUrl: `ar://${receipt.id}`,
      originalHash,
      size: buffer.byteLength,
      contentType,
      filename
    };
    
  } catch (error) {
    console.error('❌ Upload error:', error);
    throw error;
  }
};

// Check account balance
export const checkIrysBalance = async (config: UploadConfig): Promise<string> => {
  try {
    const irysUploader = await getIrysUploader(config);
    const balance = await irysUploader.getBalance();
    console.log(`💰 Balance: ${balance} wei`);
    return balance;
  } catch (error) {
    console.error('❌ Balance check error:', error);
    throw error;
  }
};

// Fund account
export const fundIrysAccount = async (config: UploadConfig, amount: string): Promise<any> => {
  try {
    const irysUploader = await getIrysUploader(config);
    const receipt = await irysUploader.fund(amount);
    console.log(`💸 Funded account with ${amount} wei`);
    return receipt;
  } catch (error) {
    console.error('❌ Funding error:', error);
    throw error;
  }
};

// Utility function to create config from environment variables
export const createConfigFromEnv = (): UploadConfig => {
  const privateKey = process.env.PRIVATE_KEY || process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const rpcUrl = process.env.SEPOLIA_RPC || process.env.NEXT_PUBLIC_SEPOLIA_RPC;
  
  if (!privateKey || !rpcUrl) {
    throw new Error('Missing required environment variables: PRIVATE_KEY and SEPOLIA_RPC');
  }
  
  return {
    privateKey,
    rpcUrl,
    useDevnet: true
  };
};
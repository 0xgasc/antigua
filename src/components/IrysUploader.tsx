'use client';

import React, { useState, useCallback, useRef } from 'react';
import { uploadFileToIrys, checkIrysBalance, UploadResult, UploadConfig } from '@/lib/irys-uploader';

interface IrysUploaderProps {
  config: UploadConfig;
  onUploadComplete?: (result: UploadResult) => void;
  onUploadError?: (error: string) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number; // in bytes
  className?: string;
  children?: React.ReactNode;
}

interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  result: UploadResult | null;
}

export const IrysUploader: React.FC<IrysUploaderProps> = ({
  config,
  onUploadComplete,
  onUploadError,
  acceptedFileTypes = "image/*,video/*,audio/*,.pdf,.doc,.docx,.txt",
  maxFileSize = 6 * 1024 * 1024 * 1024, // 6GB default
  className = "",
  children
}) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    result: null
  });
  
  const [balance, setBalance] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check balance on component mount
  React.useEffect(() => {
    const checkBalance = async () => {
      try {
        const bal = await checkIrysBalance(config);
        setBalance(bal);
      } catch (error) {
        console.error('Failed to check balance:', error);
      }
    };
    
    checkBalance();
  }, [config]);

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxFileSize) {
      const errorMsg = `File too large. Maximum size is ${(maxFileSize / 1024 / 1024 / 1024).toFixed(1)}GB`;
      setUploadState(prev => ({ ...prev, error: errorMsg }));
      onUploadError?.(errorMsg);
      return;
    }

    setUploadState({
      isUploading: true,
      progress: 0,
      error: null,
      result: null
    });

    try {
      const result = await uploadFileToIrys(
        file,
        config,
        (progress) => {
          setUploadState(prev => ({ ...prev, progress }));
        }
      );

      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        progress: 100,
        result
      }));

      onUploadComplete?.(result);
      
      // Update balance after successful upload
      const newBalance = await checkIrysBalance(config);
      setBalance(newBalance);

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Upload failed';
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        error: errorMsg
      }));
      onUploadError?.(errorMsg);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [config, maxFileSize, onUploadComplete, onUploadError]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatBalance = (wei: string): string => {
    try {
      const balance = BigInt(wei);
      const eth = Number(balance) / 1e18;
      return `${eth.toFixed(6)} ETH`;
    } catch {
      return 'Unknown';
    }
  };

  return (
    <div className={`irys-uploader ${className}`}>
      {/* Balance Display */}
      {balance && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💰 Account Balance: {formatBalance(balance)}
          </p>
        </div>
      )}

      {/* File Input */}
      <div className="upload-area">
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileSelect}
          disabled={uploadState.isUploading}
          className="hidden"
          id="irys-file-input"
        />
        
        {children ? (
          <label htmlFor="irys-file-input" className="cursor-pointer">
            {children}
          </label>
        ) : (
          <label 
            htmlFor="irys-file-input" 
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> to Arweave
              </p>
              <p className="text-xs text-gray-500">
                Up to {formatFileSize(maxFileSize)}
              </p>
            </div>
          </label>
        )}
      </div>

      {/* Upload Progress */}
      {uploadState.isUploading && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">
              Uploading to Arweave...
            </span>
            <span className="text-sm text-blue-600">
              {Math.round(uploadState.progress)}%
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadState.progress}%` }}
            />
          </div>
          <p className="text-xs text-blue-600 mt-2">
            Your file is being secured by the decentralized web...
          </p>
        </div>
      )}

      {/* Error Display */}
      {uploadState.error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            ❌ {uploadState.error}
          </p>
        </div>
      )}

      {/* Success Display */}
      {uploadState.result && !uploadState.isUploading && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 mb-2">
            ✅ Upload Successful!
          </h3>
          <div className="space-y-1 text-xs text-green-700">
            <p><strong>File:</strong> {uploadState.result.filename}</p>
            <p><strong>Size:</strong> {formatFileSize(uploadState.result.size)}</p>
            <p><strong>Type:</strong> {uploadState.result.contentType}</p>
            <div className="mt-2 space-y-1">
              <p><strong>Irys URL:</strong></p>
              <a 
                href={uploadState.result.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block break-all text-blue-600 hover:text-blue-800 underline"
              >
                {uploadState.result.url}
              </a>
              <p><strong>AR URL:</strong></p>
              <p className="break-all font-mono text-xs bg-gray-100 p-1 rounded">
                {uploadState.result.arUrl}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IrysUploader;
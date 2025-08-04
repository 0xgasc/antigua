/**
 * Test page for Irys uploader component
 * This shows how to integrate the uploader into your Antigua tourism website
 */

'use client';

import React, { useState } from 'react';
import IrysUploader from '@/components/IrysUploader';
import { UploadResult, createConfigFromEnv } from '@/lib/irys-uploader';

export default function UploadTestPage() {
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([]);
  const [config] = useState(() => {
    // For demo purposes - in production, these should come from environment variables
    return {
      privateKey: '06da2e1158b524adebddfa182da5fe825bc8fe754888ce20a2f032f4046b6191',
      rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/alcht_YbDiff1KAqK0fNAzBgycHfz7G0iz4n',
      useDevnet: true
    };
  });

  const handleUploadComplete = (result: UploadResult) => {
    console.log('Upload completed:', result);
    setUploadResults(prev => [result, ...prev]);
  };

  const handleUploadError = (error: string) => {
    console.error('Upload error:', error);
    alert(`Upload failed: ${error}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Arweave File Uploader
          </h1>
          <p className="text-gray-600 mb-8">
            Upload files to decentralized storage for your Antigua tourism website
          </p>

          {/* Basic Uploader */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Basic Upload
            </h2>
            <IrysUploader
              config={config}
              onUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              acceptedFileTypes="image/*,video/*,audio/*,.pdf"
              maxFileSize={100 * 1024 * 1024} // 100MB limit for demo
              className="mb-4"
            />
          </div>

          {/* Custom Styled Uploader */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Custom Styled Upload
            </h2>
            <IrysUploader
              config={config}
              onUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              acceptedFileTypes="image/*"
              maxFileSize={50 * 1024 * 1024} // 50MB for images
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg text-center hover:from-blue-600 hover:to-purple-700 transition-all">
                <div className="text-2xl mb-2">📸</div>
                <h3 className="text-lg font-semibold mb-1">Upload Tourism Photos</h3>
                <p className="text-blue-100">Click to upload beautiful Antigua images</p>
              </div>
            </IrysUploader>
          </div>

          {/* Upload History */}
          {uploadResults.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Uploads
              </h2>
              <div className="space-y-4">
                {uploadResults.map((result, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {result.filename}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {result.contentType} • {(result.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">Irys URL:</span>
                            <a 
                              href={result.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-xs font-mono"
                            >
                              {result.url}
                            </a>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">AR URL:</span>
                            <span className="text-xs font-mono text-gray-700">
                              {result.arUrl}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        {result.contentType.startsWith('image/') && (
                          <img 
                            src={result.url} 
                            alt={result.filename}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Integration Guide */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">
            Integration Guide
          </h2>
          <div className="space-y-4 text-sm text-blue-800">
            <div>
              <h3 className="font-medium mb-1">1. Environment Setup</h3>
              <p>Add your credentials to <code className="bg-blue-100 px-1 rounded">.env.local</code>:</p>
              <pre className="bg-blue-100 p-2 rounded mt-1 text-xs overflow-x-auto">
{`PRIVATE_KEY=your_ethereum_private_key
SEPOLIA_RPC=your_sepolia_rpc_url`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">2. Install Dependencies</h3>
              <pre className="bg-blue-100 p-2 rounded text-xs">
                npm install @irys/upload @irys/upload-ethereum
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">3. Use in Your Components</h3>
              <pre className="bg-blue-100 p-2 rounded text-xs overflow-x-auto">
{`import IrysUploader from '@/components/IrysUploader';
import { createConfigFromEnv } from '@/lib/irys-uploader';

const config = createConfigFromEnv();

<IrysUploader
  config={config}
  onUploadComplete={(result) => console.log(result)}
  acceptedFileTypes="image/*"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
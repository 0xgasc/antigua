# Irys/Arweave File Uploader Component

A ready-to-use React component for uploading files to Irys/Arweave decentralized storage, extracted from the King Gizzard Archive project and integrated into your Antigua Tourism website.

## Files Added

```
src/
├── lib/
│   └── irys-uploader.ts       # Core upload utility functions
├── components/
│   └── IrysUploader.tsx       # React component
└── app/
    └── upload-test/
        └── page.tsx           # Demo/test page
```

## Quick Start

### 1. Install Dependencies

```bash
cd /Users/g/antigua/antigua-tourism
npm install @irys/upload @irys/upload-ethereum
```

### 2. Environment Setup

Create or update your `.env.local` file:

```env
# Your existing environment variables...
DATABASE_URL="your_database_url"
NEXTAUTH_SECRET="your_nextauth_secret"

# Add Irys configuration (same as King Gizzard project)
PRIVATE_KEY=06da2e1158b524adebddfa182da5fe825bc8fe754888ce20a2f032f4046b6191
SEPOLIA_RPC=https://eth-sepolia.g.alchemy.com/v2/alcht_YbDiff1KAqK0fNAzBgycHfz7G0iz4n
```

### 3. Basic Usage

```tsx
import IrysUploader from '@/components/IrysUploader';
import { createConfigFromEnv } from '@/lib/irys-uploader';

export default function MyPage() {
  const config = createConfigFromEnv();

  return (
    <IrysUploader
      config={config}
      onUploadComplete={(result) => {
        console.log('File uploaded:', result.url);
        // Save the URL to your database, show to user, etc.
      }}
      onUploadError={(error) => {
        console.error('Upload failed:', error);
      }}
      acceptedFileTypes="image/*,video/*"
      maxFileSize={100 * 1024 * 1024} // 100MB
    />
  );
}
```

## Component Props

### `IrysUploader` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `UploadConfig` | Required | Irys configuration (privateKey, rpcUrl, useDevnet) |
| `onUploadComplete` | `(result: UploadResult) => void` | Optional | Callback when upload succeeds |
| `onUploadError` | `(error: string) => void` | Optional | Callback when upload fails |
| `acceptedFileTypes` | `string` | `"image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"` | HTML input accept attribute |
| `maxFileSize` | `number` | `6GB` | Maximum file size in bytes |
| `className` | `string` | `""` | CSS classes for styling |
| `children` | `ReactNode` | Default upload UI | Custom upload trigger element |

### `UploadResult` Type

```typescript
interface UploadResult {
  id: string;           // Arweave transaction ID
  url: string;          // https://devnet.irys.xyz/... URL
  arUrl: string;        // ar://... URL
  originalHash: string; // SHA-256 hash for verification
  size: number;         // File size in bytes
  contentType: string;  // MIME type
  filename: string;     // Original filename
}
```

## Advanced Usage Examples

### Custom Styled Upload Button

```tsx
<IrysUploader config={config} onUploadComplete={handleUpload}>
  <div className="bg-blue-500 text-white p-4 rounded-lg cursor-pointer hover:bg-blue-600">
    📸 Upload Tourism Photos
  </div>
</IrysUploader>
```

### Image Gallery with Upload

```tsx
const [images, setImages] = useState<UploadResult[]>([]);

const handleUpload = (result: UploadResult) => {
  if (result.contentType.startsWith('image/')) {
    setImages(prev => [...prev, result]);
  }
};

return (
  <div>
    <IrysUploader 
      config={config}
      onUploadComplete={handleUpload}
      acceptedFileTypes="image/*"
    />
    
    <div className="grid grid-cols-3 gap-4 mt-4">
      {images.map((img, index) => (
        <img key={index} src={img.url} alt={img.filename} className="rounded-lg" />
      ))}
    </div>
  </div>
);
```

### Save URLs to Database

```tsx
const handleUpload = async (result: UploadResult) => {
  // Save to your database
  const response = await fetch('/api/media', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: result.filename,
      irysUrl: result.url,
      arweaveUrl: result.arUrl,
      contentType: result.contentType,
      fileSize: result.size,
      transactionId: result.id
    })
  });
  
  if (response.ok) {
    toast.success('File uploaded and saved!');
  }
};
```

## Use Cases for Antigua Tourism

### 1. User-Generated Content
Allow tourists to upload photos of their experiences:

```tsx
<IrysUploader 
  config={config}
  acceptedFileTypes="image/*"
  maxFileSize={20 * 1024 * 1024} // 20MB
  onUploadComplete={(result) => {
    // Save to user's profile or gallery
    saveToUserGallery(result);
  }}
>
  <button className="btn-primary">
    Share Your Antigua Experience 📸
  </button>
</IrysUploader>
```

### 2. Admin Content Management
Upload promotional materials, tour videos, etc:

```tsx
// In admin panel
<IrysUploader 
  config={config}
  acceptedFileTypes="image/*,video/*"
  onUploadComplete={(result) => {
    // Add to CMS
    addToMediaLibrary(result);
  }}
/>
```

### 3. Aldea Documentation
Upload images and documents for each aldea:

```tsx
<IrysUploader 
  config={config}
  acceptedFileTypes="image/*,.pdf,.doc,.docx"
  onUploadComplete={(result) => {
    // Associate with aldea
    addMediaToAldea(aldeaId, result);
  }}
/>
```

## Testing

Visit `/upload-test` in your development server to test the component:

```bash
npm run dev
# Open http://localhost:3000/upload-test
```

## Production Considerations

1. **Environment Variables**: Use server-side environment variables for production
2. **File Size Limits**: Adjust based on your needs (large files cost more)
3. **Content Validation**: Add client-side and server-side validation
4. **Error Handling**: Implement proper error handling and user feedback
5. **Rate Limiting**: Consider implementing upload rate limiting

## Security Notes

- Private keys should never be exposed to the client side
- Consider using server-side API routes for production uploads
- Validate file types and sizes on both client and server
- Monitor upload costs and balance

## Support

The component is ready to use with your existing Antigua tourism website. All files have been created in the correct Next.js structure with TypeScript support.
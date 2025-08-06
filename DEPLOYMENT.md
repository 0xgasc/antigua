# Deployment Instructions

## Environment Variables Setup

To fix the admin login error in production, you need to set these environment variables in Vercel:

### Required Environment Variables:

1. **NEXTAUTH_SECRET** - A secure random string for NextAuth.js
2. **NEXTAUTH_URL** - Your production domain URL

### Steps to Configure in Vercel:

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Select your antigua project
3. Navigate to **Settings** > **Environment Variables**
4. Add the following variables:

```
Name: NEXTAUTH_SECRET
Value: [Generate a secure random string - at least 32 characters]

Name: NEXTAUTH_URL  
Value: https://antigua-two.vercel.app
```

### Generate NEXTAUTH_SECRET:

You can generate a secure secret using:
```bash
openssl rand -base64 32
```

Or use any secure password generator to create a 32+ character string.

### Admin Credentials:

- **Email:** admin@muniantigua.gob.gt
- **Password:** admin123

### After Setting Environment Variables:

1. **Redeploy** the application (Vercel will auto-redeploy when you push to main)
2. Or manually trigger a redeploy from the Vercel dashboard
3. Admin login should work at: https://antigua-two.vercel.app/admin/login

### Current Features:

- ✅ Professional municipal portal design
- ✅ 18 aldeas ready for content
- ✅ San Juan del Obispo with complete information  
- ✅ Paseos con Encanto branding
- ✅ Bilingual support (Spanish/English)
- ✅ Individual aldea detail pages
- ✅ Admin dashboard with municipal statistics
- ✅ Image slideshow with 5 Antigua Guatemala photos
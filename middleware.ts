import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect all /admin routes except /admin/login
        if (req.nextUrl.pathname.startsWith('/admin')) {
          if (req.nextUrl.pathname === '/admin/login') {
            return true // Allow access to login page
          }
          return !!token // Require authentication for other admin pages
        }
        return true // Allow access to non-admin pages
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*']
}
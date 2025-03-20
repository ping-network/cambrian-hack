import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Basic auth has been removed - all requests are allowed to pass through
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
} 
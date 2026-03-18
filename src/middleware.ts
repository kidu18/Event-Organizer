/** CONCEPT: Custom Security Gatekeeper - Replaced NextAuth with custom authentication */
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Check if accessing admin routes
    if (pathname.startsWith('/admin')) {
        // Skip protection for login page
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }
        
        // Check for authentication token
        const token = request.cookies.get('accessToken')?.value;
        
        if (!token) {
            console.log('🔒 No token found, redirecting to admin login');
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        
        // For now, allow access if token exists
        // In production, you'd verify the JWT token here
        console.log('✅ Admin access granted with token');
        return NextResponse.next();
    }
    
    // Check if accessing user routes
    if (pathname.startsWith('/user') || pathname.startsWith('/my-tickets')) {
        // Skip protection for login page
        if (pathname === '/login') {
            return NextResponse.next();
        }
        
        // Check for authentication token
        const token = request.cookies.get('accessToken')?.value;
        
        if (!token) {
            console.log('🔒 No token found, redirecting to user login');
            return NextResponse.redirect(new URL('/login', request.url));
        }
        
        console.log('✅ User access granted with token');
        return NextResponse.next();
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*", 
        "/user/:path*", 
        "/my-tickets/:path*", 
        "/auth/change-password"
    ],
};


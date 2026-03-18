import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // Get token from Authorization header or localStorage (via cookie)
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '') || 
                      request.cookies.get('accessToken')?.value;

        if (!token) {
            return NextResponse.json(
                { error: "No authentication token found" },
                { status: 401 }
            );
        }

        // For now, return user data from localStorage simulation
        // In production, you'd verify the JWT token with your backend
        const userCookie = request.cookies.get('user')?.value;
        
        if (userCookie) {
            try {
                const user = JSON.parse(decodeURIComponent(userCookie));
                return NextResponse.json({
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name || user.firstName,
                        role: user.role,
                        firstName: user.firstName,
                        lastName: user.lastName
                    },
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
                });
            } catch (parseError) {
                console.error('Failed to parse user cookie:', parseError);
            }
        }

        // Fallback: return null session
        return NextResponse.json({
            user: null,
            expires: null
        });

    } catch (error) {
        console.error('Session error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

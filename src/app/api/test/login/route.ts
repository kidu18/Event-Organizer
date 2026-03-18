import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        console.log('🧪 Test login attempt:', { email, passwordLength: password?.length });

        // Mock admin credentials
        if (email === 'admin@eventmanager.com' && password === 'Admin123!') {
            const mockResponse = {
                accessToken: 'mock-access-token-' + Date.now(),
                refreshToken: 'mock-refresh-token-' + Date.now(),
                user: {
                    id: '550e8400-e29b-41d4-a716-446655440000',
                    email: 'admin@eventmanager.com',
                    role: 'ADMIN',
                    firstName: 'Admin',
                    lastName: 'User',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            };

            console.log('✅ Test login successful');
            return NextResponse.json(mockResponse);
        }

        // Mock user credentials
        if (email === 'user@example.com' && password === 'User123!') {
            const mockResponse = {
                accessToken: 'mock-access-token-' + Date.now(),
                refreshToken: 'mock-refresh-token-' + Date.now(),
                user: {
                    id: '660e8400-e29b-41d4-a716-446655440001',
                    email: 'user@example.com',
                    role: 'USER',
                    firstName: 'Test',
                    lastName: 'User',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            };

            console.log('✅ Test user login successful');
            return NextResponse.json(mockResponse);
        }

        console.log('❌ Invalid credentials');
        return NextResponse.json(
            { message: "Invalid email or password" },
            { status: 401 }
        );

    } catch (error) {
        console.error('❌ Test login error:', error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

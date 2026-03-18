import { NextRequest, NextResponse } from "next/server";

// Mock user database (in production, use real database)
const users: any[] = [];

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, password, phone } = body;

        console.log('🧪 User registration attempt:', { 
            email, 
            firstName, 
            lastName, 
            phone: phone || 'not provided'
        });

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json(
                { message: "All required fields must be provided" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = users.find(user => user.email === email.toLowerCase());
        if (existingUser) {
            return NextResponse.json(
                { message: "A user with this email already exists" },
                { status: 409 }
            );
        }

        // Create new user (in production, hash password)
        const newUser = {
            id: Date.now().toString(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.toLowerCase().trim(),
            password: password, // In production, this would be hashed
            phone: phone ? phone.trim() : null,
            role: 'USER',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Add to mock database
        users.push(newUser);

        console.log('✅ User registration successful:', { 
            id: newUser.id, 
            email: newUser.email,
            role: newUser.role 
        });

        // Return success response
        const response = {
            message: "User registered successfully",
            user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role,
                createdAt: newUser.createdAt
            },
            accessToken: 'mock-access-token-' + Date.now(),
            refreshToken: 'mock-refresh-token-' + Date.now()
        };

        return NextResponse.json(response, { status: 201 });

    } catch (error) {
        console.error('❌ Registration error:', error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

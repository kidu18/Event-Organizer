import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Find user in database
    const user = await db.user.findUnique({
      where: { email }
    })

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Return user data (in production, use JWT tokens)
    return NextResponse.json({
      accessToken: "mock-jwt-token",
      refreshToken: "mock-refresh-token",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.name?.split(' ')[0] || "",
        lastName: user.name?.split(' ')[1] || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

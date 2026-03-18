import { AuthResponse } from "@/types/auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://event-ticket-production.up.railway.app"

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  console.log('🔍 Login attempt:', { email })

  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error('❌ Login Error Details:', {
      status: response.status,
      error: errorData,
    })
    throw new Error(errorData.message || `Login failed: ${response.status}`)
  }

  return response.json()
}

export async function register(
  data: { email: string; password?: string; firstName: string; lastName: string }
): Promise<AuthResponse> {
  console.log('📝 Registration attempt:', { email: data.email })

  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error('❌ Registration Error Details:', {
      status: response.status,
      error: errorData,
    })
    throw new Error(errorData.message || `Registration failed: ${response.status}`)
  }

  return response.json()
}

export async function refresh(
  refreshToken: string
): Promise<AuthResponse> {
  console.log('🔄 Token refresh attempt')

  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error('❌ Token Refresh Error Details:', {
      status: response.status,
      error: errorData,
    })
    throw new Error(errorData.message || `Refresh failed: ${response.status}`)
  }

  return response.json()
}
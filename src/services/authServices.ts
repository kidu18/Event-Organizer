import { AuthResponse } from "@/types/auth"

// Use local API for development, external API for production
const API_URL = process.env.NODE_ENV === 'development' 
  ? "http://localhost:3000" 
  : (process.env.NEXT_PUBLIC_API_URL || "https://event-ticket-production.up.railway.app")

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  console.log('🔍 Login attempt:', { email })

  // Use test API for development
  const loginEndpoint = process.env.NODE_ENV === 'development' 
    ? '/api/test/login' 
    : '/api/auth/login'

  const response = await fetch(`${API_URL}${loginEndpoint}`, {
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

  // Use local API for development
  const registerEndpoint = process.env.NODE_ENV === 'development' 
    ? '/api/auth/register' 
    : '/api/auth/register'

  const response = await fetch(`${API_URL}${registerEndpoint}`, {
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
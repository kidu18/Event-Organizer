import { AuthResponse } from "@/types/auth"

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {

  console.log('🔍 Login attempt:', { email, passwordLength: password.length })

  // Use test endpoint for now
  const response = await fetch(
    `http://localhost:3000/api/test/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  )

  console.log('📡 Response status:', response.status, response.statusText)

  if (!response.ok) {
    const error = await response.json()
    console.error('❌ Login Error Details:', {
      status: response.status,
      statusText: response.statusText,
      error: error,
      url: `http://localhost:3000/api/test/login`
    })
    throw new Error(error.message || error.error || `Login failed: ${response.status}`)
  }

  return response.json()
}
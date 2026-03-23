// ─── Auth Services ──────────────────────────────────────────────────────────
// Direct API calls to the backend. All requests go to the Railway backend.
// These are called from server actions (authActions.ts), NOT from client code.

import { AuthResponse, LoginInput, RegisterInput } from "@/types/auth"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://event-ticket-production.up.railway.app"

// ─── Helper: Parse error response from backend ─────────────────────────────

async function parseErrorResponse(response: Response): Promise<{ message: string; status: number }> {
  let message = `Request failed with status ${response.status}`
  
  try {
    const errorData = await response.json()
    // Backend may return { message: "..." } or { error: "..." }
    message = errorData.message || errorData.error || message
  } catch {
    // If response body isn't JSON, use status text
    message = response.statusText || message
  }
  
  return { message, status: response.status }
}

// ─── LOGIN ──────────────────────────────────────────────────────────────────

export async function login(input: LoginInput): Promise<AuthResponse> {
  console.log('🔐 [AuthService] Login attempt:', { email: input.email })

  let response: Response

  try {
    response = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(input),
    })
  } catch (networkError) {
    console.error('🌐 [AuthService] Network error during login:', networkError)
    throw new Error("NETWORK::Unable to connect to the server. Please check your internet connection and try again.")
  }

  if (!response.ok) {
    const { message, status } = await parseErrorResponse(response)
    console.error(`❌ [AuthService] Login failed [${status}]:`, message)

    if (status === 401) {
      throw new Error("UNAUTHORIZED::Invalid email or password. Please check your credentials and try again.")
    }
    if (status === 400) {
      throw new Error(`VALIDATION::${message}`)
    }
    throw new Error(`SERVER::${message}`)
  }

  const data: AuthResponse = await response.json()
  console.log('✅ [AuthService] Login successful:', { userId: data.user?.id, role: data.user?.role })
  return data
}

// ─── REGISTER ───────────────────────────────────────────────────────────────

export async function register(input: RegisterInput): Promise<AuthResponse> {
  console.log('📝 [AuthService] Registration attempt:', { email: input.email, firstName: input.firstName })

  let response: Response

  try {
    response = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(input),
    })
  } catch (networkError) {
    console.error('🌐 [AuthService] Network error during registration:', networkError)
    throw new Error("NETWORK::Unable to connect to the server. Please check your internet connection and try again.")
  }

  if (!response.ok) {
    const { message, status } = await parseErrorResponse(response)
    console.error(`❌ [AuthService] Registration failed [${status}]:`, message)

    if (status === 409) {
      throw new Error("CONFLICT::An account with this email already exists. Please use a different email or sign in.")
    }
    if (status === 400) {
      throw new Error(`VALIDATION::${message}`)
    }
    throw new Error(`SERVER::${message}`)
  }

  const data: AuthResponse = await response.json()
  console.log('✅ [AuthService] Registration successful:', { userId: data.user?.id, email: data.user?.email })
  return data
}

// ─── REFRESH TOKEN ──────────────────────────────────────────────────────────

export async function refreshToken(refreshTokenValue: string): Promise<AuthResponse> {
  console.log('🔄 [AuthService] Token refresh attempt')

  let response: Response

  try {
    response = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshTokenValue }),
    })
  } catch (networkError) {
    console.error('🌐 [AuthService] Network error during token refresh:', networkError)
    throw new Error("NETWORK::Unable to connect to the server. Please check your internet connection.")
  }

  if (!response.ok) {
    const { message, status } = await parseErrorResponse(response)
    console.error(`❌ [AuthService] Token refresh failed [${status}]:`, message)

    if (status === 401) {
      throw new Error("UNAUTHORIZED::Your session has expired. Please sign in again.")
    }
    throw new Error(`SERVER::${message}`)
  }

  const data: AuthResponse = await response.json()
  console.log('✅ [AuthService] Token refresh successful')
  return data
}

// ─── LOGOUT ─────────────────────────────────────────────────────────────────

export async function logout(accessToken: string): Promise<void> {
  console.log('🚪 [AuthService] Logout attempt')

  try {
    const response = await fetch(`${API_BASE}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const { message, status } = await parseErrorResponse(response)
      console.warn(`⚠️ [AuthService] Logout API returned [${status}]:`, message)
      // We don't throw here — even if the server-side logout fails,
      // we still want to clear client-side tokens
    } else {
      console.log('✅ [AuthService] Logout successful on server')
    }
  } catch (networkError) {
    console.warn('⚠️ [AuthService] Network error during logout (continuing anyway):', networkError)
    // Don't throw — we still clear cookies locally
  }
}
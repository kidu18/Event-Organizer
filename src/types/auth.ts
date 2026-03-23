// ─── User & Auth Response Types ─────────────────────────────────────────────
// Matches the backend API at: https://event-ticket-production.up.railway.app

export type User = {
  id: string
  email: string
  role: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
}

export type AuthResponse = {
  accessToken: string
  refreshToken: string
  user: User
  expiresIn?: number
}

// ─── Auth Action Results ────────────────────────────────────────────────────
// Used by server actions to return typed results to client components

export type AuthActionResult = {
  success: boolean
  data?: AuthResponse
  error?: string
  errorCode?: 'VALIDATION' | 'CONFLICT' | 'UNAUTHORIZED' | 'NETWORK' | 'SERVER' | 'UNKNOWN'
}

// ─── Form Input Types ───────────────────────────────────────────────────────

export type LoginInput = {
  email: string
  password: string
}

export type RegisterInput = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type RefreshInput = {
  refreshToken: string
}
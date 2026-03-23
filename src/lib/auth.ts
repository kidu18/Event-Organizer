/**
 * Auth utility functions for server-side use.
 * Replaces the old NextAuth configuration.
 * 
 * For server actions, use: @/actions/authActions
 * For client hooks, use: @/hooks/useAuth
 * For context provider, use: @/components/providers/AuthProvider
 */

import { cookies } from "next/headers"
import type { User } from "@/types/auth"

/**
 * Get the current authenticated user from cookies (server-side).
 * Returns null if not authenticated.
 */
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const userStr = cookieStore.get("user")?.value
  const accessToken = cookieStore.get("accessToken")?.value

  if (!userStr || !accessToken) return null

  try {
    return JSON.parse(userStr) as User
  } catch {
    return null
  }
}

/**
 * Get the current access token from cookies (server-side).
 * Useful for making authenticated API calls from server components.
 */
export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get("accessToken")?.value || null
}

/**
 * Check if the current user has a specific role (server-side).
 */
export async function hasRole(role: string): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role?.toUpperCase() === role.toUpperCase()
}

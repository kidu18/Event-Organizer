/** 
 * CONCEPT: The Auth Context Provider
 * Wraps the application and provides auth state to all child components.
 * Replaces NextAuth's SessionProvider with our custom cookie-based auth.
 */
"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { User } from "@/types/auth"

// ─── Auth Context Type ──────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  refreshUser: () => void
  clearUser: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  refreshUser: () => {},
  clearUser: () => {},
})

// ─── useAuthContext hook ────────────────────────────────────────────────────

export function useAuthContext() {
  return useContext(AuthContext)
}

// ─── Auth Provider Component ────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const getUserFromCookie = useCallback((): User | null => {
    if (typeof document === "undefined") return null

    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="))

    if (userCookie) {
      try {
        const raw = userCookie.split("=").slice(1).join("=")
        return JSON.parse(decodeURIComponent(raw)) as User
      } catch {
        return null
      }
    }
    return null
  }, [])

  // Load user on mount
  useEffect(() => {
    const userData = getUserFromCookie()
    setUser(userData)
    setIsLoading(false)
  }, [getUserFromCookie])

  const refreshUser = useCallback(() => {
    const userData = getUserFromCookie()
    setUser(userData)
  }, [getUserFromCookie])

  const clearUser = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        refreshUser,
        clearUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

"use client"

// ─── useAuth Hook ───────────────────────────────────────────────────────────
// Client-side hook that connects components to auth server actions.
// Manages loading states, errors, user state, and navigation.

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  loginAction,
  registerAction,
  logoutAction,
} from "@/actions/authActions"
import type { User, AuthActionResult, LoginInput, RegisterInput } from "@/types/auth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorCode, setErrorCode] = useState<AuthActionResult["errorCode"] | null>(null)
  const router = useRouter()

  // ─── Read user from cookie on mount ─────────────────────────────────
  const getUserFromCookie = useCallback((): User | null => {
    if (typeof document === "undefined") return null

    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="))

    if (userCookie) {
      try {
        const raw = userCookie.split("=").slice(1).join("=") // handle '=' in JSON
        return JSON.parse(decodeURIComponent(raw)) as User
      } catch (err) {
        console.error("⚠️ [useAuth] Failed to parse user cookie:", err)
      }
    }
    return null
  }, [])

  useEffect(() => {
    const userData = getUserFromCookie()
    if (userData) {
      console.log("👤 [useAuth] User restored from cookie:", userData.email)
      setUser(userData)
    }
  }, [getUserFromCookie])

  // ─── Clear error state ──────────────────────────────────────────────
  const clearError = useCallback(() => {
    setError(null)
    setErrorCode(null)
  }, [])

  // ─── LOGIN ──────────────────────────────────────────────────────────
  const login = useCallback(async (input: LoginInput) => {
    console.log("🔐 [useAuth] Login initiated for:", input.email)
    setIsLoading(true)
    clearError()

    const result = await loginAction(input)
    setIsLoading(false)

    if (result.success && result.data) {
      console.log("✅ [useAuth] Login successful — navigating based on role:", result.data.user.role)
      setUser(result.data.user)

      // Route based on user role
      const role = result.data.user.role?.toUpperCase()
      if (role === "ADMIN") {
        router.push("/admin")
      } else {
        router.push("/user?dashboard=main")
      }
    } else {
      console.error("❌ [useAuth] Login failed:", result.error)
      setError(result.error || "Login failed. Please try again.")
      setErrorCode(result.errorCode || "UNKNOWN")
    }

    return result
  }, [router, clearError])

  // ─── REGISTER ───────────────────────────────────────────────────────
  const register = useCallback(async (input: RegisterInput) => {
    console.log("📝 [useAuth] Registration initiated for:", input.email)
    setIsLoading(true)
    clearError()

    const result = await registerAction(input)
    setIsLoading(false)

    if (result.success && result.data) {
      console.log("✅ [useAuth] Registration successful:", result.data.user.email)
      setUser(result.data.user)
      // After registration, redirect to login with success message
      router.push("/login?registered=true")
    } else {
      console.error("❌ [useAuth] Registration failed:", result.error)
      setError(result.error || "Registration failed. Please try again.")
      setErrorCode(result.errorCode || "UNKNOWN")
    }

    return result
  }, [router, clearError])

  // ─── LOGOUT ─────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    console.log("🚪 [useAuth] Logout initiated")
    setIsLoading(true)

    await logoutAction()

    setUser(null)
    setIsLoading(false)
    console.log("✅ [useAuth] Logout complete — redirecting to login")
    router.push("/login")
  }, [router])

  // ─── CHECK AUTH ─────────────────────────────────────────────────────
  const checkAuth = useCallback((): boolean => {
    const userData = getUserFromCookie()
    setUser(userData)
    return !!userData
  }, [getUserFromCookie])

  return {
    user,
    isLoading,
    error,
    errorCode,
    clearError,
    login,
    register,
    logout,
    checkAuth,
    isAuthenticated: !!user,
  }
}

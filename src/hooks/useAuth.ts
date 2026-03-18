"use client"

import { loginAction, registerAction, logoutAction } from "@/actions/authActions"
import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User } from "@/types/auth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const getUserFromCookie = useCallback(() => {
    const userCookie = document.cookie.split("; ").find(row => row.startsWith("user="))
    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie.split("=")[1]))
        return userData
      } catch (err) {
        console.error("Failed to parse user cookie", err)
      }
    }
    return null
  }, [])

  useEffect(() => {
    const userData = getUserFromCookie()
    if (userData) {
      setUser(userData)
    }
  }, [getUserFromCookie])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    const result = await loginAction(email, password)
    setIsLoading(false)
    
    if (result.success && result.data) {
      setUser(result.data.user)
      const role = result.data.user.role
      if (role === 'ADMIN') {
        router.push('/admin')
      } else {
        router.push('/user?dashboard=main')
      }
    } else {
      setError(result.error as string)
    }
    return result
  }, [router])

  const register = useCallback(async (data: { email: string; password?: string; firstName: string; lastName: string }) => {
    setIsLoading(true)
    setError(null)
    const result = await registerAction(data)
    setIsLoading(false)
    
    if (result.success && result.data) {
      setUser(result.data.user)
      router.push('/login?message=registration-success')
    } else {
      setError(result.error as string)
    }
    return result
  }, [router])

  const logout = useCallback(async () => {
    await logoutAction()
    setUser(null)
    router.push('/login')
  }, [router])

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    checkAuth: () => {
      const userData = getUserFromCookie()
      setUser(userData)
      return !!userData
    }
  }
}

"use server"

import { cookies } from "next/headers"
import { login as loginService, register as registerService, refresh as refreshService } from "@/services/authServices"
import { AuthResponse } from "@/types/auth"

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
}

export async function loginAction(email: string, password: string) {
  try {
    const response: AuthResponse = await loginService(email, password)
    
    const cookieStore = await cookies()
    
    cookieStore.set("accessToken", response.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: response.expiresIn || 900, // Default to 15 mins if not provided
    })
    
    cookieStore.set("refreshToken", response.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    // Store user data in a cookie (non-httpOnly so client can read basic info if needed)
    // Or just let the client store it in localStorage/State
    cookieStore.set("user", JSON.stringify(response.user), {
      ...COOKIE_OPTIONS,
      httpOnly: false, // Allow client to read user info
    })

    return { success: true, data: response }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Authentication failed" }
  }
}

export async function registerAction(data: { email: string; password?: string; firstName: string; lastName: string }) {
  try {
    const response: AuthResponse = await registerService(data)
    
    const cookieStore = await cookies()
    
    cookieStore.set("accessToken", response.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: response.expiresIn || 900,
    })
    
    cookieStore.set("refreshToken", response.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60,
    })

    cookieStore.set("user", JSON.stringify(response.user), {
      ...COOKIE_OPTIONS,
      httpOnly: false,
    })

    return { success: true, data: response }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Registration failed" }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")
  cookieStore.delete("user")
  return { success: true }
}

export async function getAuthSession() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  const user = cookieStore.get("user")?.value
  
  if (!accessToken || !user) return null
  
  try {
    return {
      accessToken,
      user: JSON.parse(user)
    }
  } catch {
    return null
  }
}

export async function refreshAction() {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get("refreshToken")?.value
    
    if (!refreshToken) throw new Error("No refresh token available")
    
    const response = await refreshService(refreshToken)
    
    cookieStore.set("accessToken", response.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: response.expiresIn || 900,
    })
    
    cookieStore.set("refreshToken", response.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60,
    })

    cookieStore.set("user", JSON.stringify(response.user), {
      ...COOKIE_OPTIONS,
      httpOnly: false,
    })

    return { success: true, data: response }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Token refresh failed" }
  }
}

"use server"

// ─── Server Actions for Authentication ──────────────────────────────────────
// These run on the server and handle cookie management + call auth services.
// Client components call these via the useAuth hook.

import { cookies } from "next/headers"
import {
  login as loginService,
  register as registerService,
  refreshToken as refreshService,
  logout as logoutService,
} from "@/services/authServices"
import { AuthActionResult, LoginInput, RegisterInput } from "@/types/auth"

// ─── Cookie configuration ───────────────────────────────────────────────────

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
}

// ─── Helper: Parse error code from service errors ───────────────────────────
// Service errors follow the pattern "CODE::Human readable message"

function parseServiceError(error: unknown): { message: string; errorCode: AuthActionResult["errorCode"] } {
  if (!(error instanceof Error)) {
    return { message: "An unexpected error occurred. Please try again.", errorCode: "UNKNOWN" }
  }

  const parts = error.message.split("::")
  if (parts.length === 2) {
    const code = parts[0] as AuthActionResult["errorCode"]
    const message = parts[1]
    return { message, errorCode: code }
  }

  return { message: error.message, errorCode: "UNKNOWN" }
}

// ─── Helper: Store auth tokens in cookies ───────────────────────────────────

async function storeAuthCookies(accessToken: string, refreshToken: string, user: object, expiresIn?: number) {
  const cookieStore = await cookies()

  cookieStore.set("accessToken", accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: expiresIn || 900, // Default 15 min
  })

  cookieStore.set("refreshToken", refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })

  // User data cookie (readable by client for UI display)
  cookieStore.set("user", JSON.stringify(user), {
    ...COOKIE_OPTIONS,
    httpOnly: false,
  })
}

// ─── Helper: Clear all auth cookies ─────────────────────────────────────────

async function clearAuthCookies() {
  const cookieStore = await cookies()
  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")
  cookieStore.delete("user")
}

// ─── LOGIN ACTION ───────────────────────────────────────────────────────────

export async function loginAction(input: LoginInput): Promise<AuthActionResult> {
  console.log("🔐 [AuthAction] Login action started for:", input.email)

  try {
    const response = await loginService(input)

    await storeAuthCookies(
      response.accessToken,
      response.refreshToken,
      response.user,
      response.expiresIn
    )

    console.log("✅ [AuthAction] Login action completed — cookies set for user:", response.user.email)

    return { success: true, data: response }
  } catch (error) {
    const { message, errorCode } = parseServiceError(error)
    console.error("❌ [AuthAction] Login action failed:", { errorCode, message })
    return { success: false, error: message, errorCode }
  }
}

// ─── REGISTER ACTION ────────────────────────────────────────────────────────

export async function registerAction(input: RegisterInput): Promise<AuthActionResult> {
  console.log("📝 [AuthAction] Register action started for:", input.email)

  try {
    const response = await registerService(input)

    await storeAuthCookies(
      response.accessToken,
      response.refreshToken,
      response.user,
      response.expiresIn
    )

    console.log("✅ [AuthAction] Register action completed — user created:", response.user.email)

    return { success: true, data: response }
  } catch (error) {
    const { message, errorCode } = parseServiceError(error)
    console.error("❌ [AuthAction] Register action failed:", { errorCode, message })
    return { success: false, error: message, errorCode }
  }
}

// ─── LOGOUT ACTION ──────────────────────────────────────────────────────────

export async function logoutAction(): Promise<AuthActionResult> {
  console.log("🚪 [AuthAction] Logout action started")

  try {
    // Get the access token to send to backend for server-side logout
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (accessToken) {
      await logoutService(accessToken)
    }

    await clearAuthCookies()

    console.log("✅ [AuthAction] Logout action completed — cookies cleared")
    return { success: true }
  } catch (error) {
    // Even if server logout fails, still clear cookies
    await clearAuthCookies()
    console.warn("⚠️ [AuthAction] Logout had server error but cookies cleared:", error)
    return { success: true }
  }
}

// ─── REFRESH ACTION ─────────────────────────────────────────────────────────

export async function refreshAction(): Promise<AuthActionResult> {
  console.log("🔄 [AuthAction] Refresh action started")

  try {
    const cookieStore = await cookies()
    const refreshTokenValue = cookieStore.get("refreshToken")?.value

    if (!refreshTokenValue) {
      console.warn("⚠️ [AuthAction] No refresh token found in cookies")
      return { success: false, error: "Session expired. Please sign in again.", errorCode: "UNAUTHORIZED" }
    }

    const response = await refreshService(refreshTokenValue)

    await storeAuthCookies(
      response.accessToken,
      response.refreshToken,
      response.user,
      response.expiresIn
    )

    console.log("✅ [AuthAction] Refresh action completed — new tokens set")
    return { success: true, data: response }
  } catch (error) {
    const { message, errorCode } = parseServiceError(error)
    console.error("❌ [AuthAction] Refresh action failed:", { errorCode, message })

    // If refresh failed, clear stale cookies
    await clearAuthCookies()

    return { success: false, error: message, errorCode }
  }
}

// ─── GET SESSION (for SSR/middleware) ────────────────────────────────────────

export async function getAuthSession() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  const userStr = cookieStore.get("user")?.value

  if (!accessToken || !userStr) return null

  try {
    return {
      accessToken,
      user: JSON.parse(userStr),
    }
  } catch {
    return null
  }
}

"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, CheckCircle, LogIn, ArrowRight } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

// ─── Validation Schema ─────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

// ─── Login Page Component ───────────────────────────────────────────────────

export default function LoginPage() {
  const { login, isLoading, error, errorCode, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()
  const justRegistered = searchParams.get("registered") === "true"
  const [showRegisteredBanner, setShowRegisteredBanner] = useState(justRegistered)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  })

  // Auto-hide the registration success banner after 8 seconds
  useEffect(() => {
    if (showRegisteredBanner) {
      const timer = setTimeout(() => setShowRegisteredBanner(false), 8000)
      return () => clearTimeout(timer)
    }
  }, [showRegisteredBanner])

  // Clear server errors when user starts typing
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 10000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  const onSubmit = async (data: LoginFormValues) => {
    console.log("🔐 [LoginPage] Form submitted for:", data.email)
    await login({ email: data.email, password: data.password })
  }

  // ─── Error icon/color based on error code ───────────────────────────
  const getErrorStyle = () => {
    switch (errorCode) {
      case "UNAUTHORIZED":
        return { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", icon: "🔒" }
      case "NETWORK":
        return { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", icon: "🌐" }
      case "VALIDATION":
        return { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400", icon: "⚠️" }
      default:
        return { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", icon: "❌" }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden px-4 py-12">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7c3aed] to-[#06b6d4] shadow-lg shadow-purple-500/20 group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-bold tracking-tight text-white">
              Event<span className="text-[#a78bfa]">Pro</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white mt-4">Welcome back</h1>
          <p className="text-slate-400 mt-2">Sign in to your account to continue</p>
        </div>

        {/* Registration Success Banner */}
        {showRegisteredBanner && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-emerald-400 font-medium text-sm">Account created successfully!</p>
                <p className="text-emerald-400/70 text-xs mt-0.5">Please sign in with your new credentials.</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className={`mb-6 p-4 rounded-xl ${getErrorStyle().bg} border ${getErrorStyle().border} backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]`}>
            <div className="flex items-start gap-3">
              <span className="text-lg flex-shrink-0 mt-0.5">{getErrorStyle().icon}</span>
              <div className="flex-1">
                <p className={`${getErrorStyle().text} font-medium text-sm`}>{error}</p>
                {errorCode === "UNAUTHORIZED" && (
                  <p className="text-slate-500 text-xs mt-1">
                    Forgot your password?{" "}
                    <Link href="/auth/forgot-password" className="text-purple-400 hover:text-purple-300 underline">
                      Reset it here
                    </Link>
                  </p>
                )}
                {errorCode === "NETWORK" && (
                  <p className="text-slate-500 text-xs mt-1">
                    Make sure you have a stable internet connection and try again.
                  </p>
                )}
              </div>
              <button onClick={clearError} className="text-slate-500 hover:text-slate-300 transition-colors p-1">
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Login Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl shadow-black/20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-slate-300 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  onChange={(e) => {
                    register("email").onChange(e)
                    if (error) clearError()
                  }}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.06] border text-white placeholder-slate-500 text-sm
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all
                    ${errors.email ? "border-red-500/50" : "border-white/10 hover:border-white/20"}`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="login-password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...register("password")}
                  onChange={(e) => {
                    register("password").onChange(e)
                    if (error) clearError()
                  }}
                  className={`w-full pl-11 pr-12 py-3 rounded-xl bg-white/[0.06] border text-white placeholder-slate-500 text-sm
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all
                    ${errors.password ? "border-red-500/50" : "border-white/10 hover:border-white/20"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white
                bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500
                shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
                disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                transition-all duration-200 active:scale-[0.98]
                flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign in
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#0a0f1a] px-4 text-slate-500">New to EventPro?</span>
            </div>
          </div>

          {/* Register Link */}
          <Link
            href="/register"
            className="w-full py-3 px-4 rounded-xl font-medium text-sm text-slate-300
              border border-white/10 hover:border-white/20 hover:bg-white/[0.04]
              transition-all duration-200 active:scale-[0.98]
              flex items-center justify-center gap-2"
          >
            Create an account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-600 mt-6">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-slate-500 hover:text-slate-400 underline">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="text-slate-500 hover:text-slate-400 underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

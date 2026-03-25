"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import {
  Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, CheckCircle,
  UserPlus, ArrowRight, ArrowLeft, User, Shield,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

// ─── Validation Schema ─────────────────────────────────────────────────────

const registerSchema = z.object({
  firstName: z.string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be under 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
  lastName: z.string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be under 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number"),
  confirmPassword: z.string()
    .min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof registerSchema>

// ─── Password Strength Indicator ────────────────────────────────────────────

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 8 characters", passed: password.length >= 8 },
    { label: "Contains lowercase letter", passed: /[a-z]/.test(password) },
    { label: "Contains uppercase letter", passed: /[A-Z]/.test(password) },
    { label: "Contains a number", passed: /\d/.test(password) },
  ]

  const passedCount = checks.filter((c) => c.passed).length
  const strengthPercent = (passedCount / checks.length) * 100

  const strengthColor =
    strengthPercent <= 25 ? "bg-red-500" :
    strengthPercent <= 50 ? "bg-orange-500" :
    strengthPercent <= 75 ? "bg-amber-500" :
    "bg-emerald-500"

  const strengthLabel =
    strengthPercent <= 25 ? "Weak" :
    strengthPercent <= 50 ? "Fair" :
    strengthPercent <= 75 ? "Good" :
    "Strong"

  return (
    <div className="mt-3 space-y-3">
      {/* Strength bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className={`h-full rounded-full ${strengthColor} transition-all duration-500 ease-out`}
            style={{ width: `${strengthPercent}%` }}
          />
        </div>
        <span className={`text-xs font-medium ${
          strengthPercent <= 25 ? "text-red-400" :
          strengthPercent <= 50 ? "text-orange-400" :
          strengthPercent <= 75 ? "text-amber-400" :
          "text-emerald-400"
        }`}>
          {strengthLabel}
        </span>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-2 gap-1.5">
        {checks.map((check) => (
          <div key={check.label} className="flex items-center gap-1.5">
            <CheckCircle className={`w-3 h-3 transition-colors ${
              check.passed ? "text-emerald-400" : "text-slate-600"
            }`} />
            <span className={`text-xs transition-colors ${
              check.passed ? "text-slate-300" : "text-slate-600"
            }`}>
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Step Indicator ─────────────────────────────────────────────────────────

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const steps = [
    { num: 1, label: "Personal Info" },
    { num: 2, label: "Security" },
    { num: 3, label: "Review" },
  ]

  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.slice(0, totalSteps).map((step, index) => (
        <React.Fragment key={step.num}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              currentStep > step.num
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : currentStep === step.num
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-lg shadow-purple-500/20"
                  : "bg-white/5 text-slate-600 border border-white/10"
            }`}>
              {currentStep > step.num ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                step.num
              )}
            </div>
            <span className={`text-xs font-medium hidden sm:block transition-colors ${
              currentStep >= step.num ? "text-slate-300" : "text-slate-600"
            }`}>
              {step.label}
            </span>
          </div>
          {index < totalSteps - 1 && (
            <div className={`w-8 sm:w-12 h-px transition-colors ${
              currentStep > step.num ? "bg-emerald-500/50" : "bg-white/10"
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

// ─── Register Page Component ────────────────────────────────────────────────

export default function RegisterPage() {
  const { register: registerUser, isLoading, error, errorCode, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  })

  const watchedPassword = watch("password") || ""
  const watchedFirstName = watch("firstName")
  const watchedLastName = watch("lastName")
  const watchedEmail = watch("email")

  // Auto-clear server errors after 10s
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 10000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("📝 [RegisterPage] Form submitted for:", data.email)
    await registerUser({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    })
  }

  const nextStep = async () => {
    if (currentStep === 1) {
      const valid = await trigger(["firstName", "lastName", "email"])
      if (valid) setCurrentStep(2)
    } else if (currentStep === 2) {
      const valid = await trigger(["password", "confirmPassword"])
      if (valid) setCurrentStep(3)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  // ─── Error style based on error code ──────────────────────────────
  const getErrorStyle = () => {
    switch (errorCode) {
      case "CONFLICT":
        return { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", icon: "👤" }
      case "NETWORK":
        return { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400", icon: "🌐" }
      case "VALIDATION":
        return { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", icon: "⚠️" }
      default:
        return { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", icon: "❌" }
    }
  }

  // ─── Input field helper ───────────────────────────────────────────
  const inputClass = (hasError: boolean) =>
    `w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.06] border text-white placeholder-slate-500 text-sm
     focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all
     ${hasError ? "border-red-500/50" : "border-white/10 hover:border-white/20"}`

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden px-4 py-12">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo / Brand */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7c3aed] to-[#06b6d4] shadow-lg shadow-purple-500/20 group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-bold tracking-tight text-white">
              Event<span className="text-[#a78bfa]">Pro</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white mt-4">Create your account</h1>
          <p className="text-slate-400 mt-2">Join EventPro and start booking amazing events</p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={3} />

        {/* Error Banner */}
        {error && (
          <div className={`mb-6 p-4 rounded-xl ${getErrorStyle().bg} border ${getErrorStyle().border} backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]`}>
            <div className="flex items-start gap-3">
              <span className="text-lg flex-shrink-0 mt-0.5">{getErrorStyle().icon}</span>
              <div className="flex-1">
                <p className={`${getErrorStyle().text} font-medium text-sm`}>{error}</p>
                {errorCode === "CONFLICT" && (
                  <p className="text-slate-500 text-xs mt-1">
                    Already have an account?{" "}
                    <Link href="/login" className="text-purple-400 hover:text-purple-300 underline">
                      Sign in instead
                    </Link>
                  </p>
                )}
              </div>
              <button onClick={clearError} className="text-slate-500 hover:text-slate-300 transition-colors p-1">
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Registration Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl shadow-black/20">
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* ─── Step 1: Personal Info ─────────────────────────────── */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div className="flex items-center gap-2 mb-6">
                  <User className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-semibold text-white">Personal Information</h2>
                </div>

                {/* First Name */}
                <div>
                  <label htmlFor="reg-firstName" className="block text-sm font-medium text-slate-300 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-slate-500" />
                    </div>
                    <input
                      id="reg-firstName"
                      type="text"
                      placeholder="John"
                      autoComplete="given-name"
                      {...register("firstName")}
                      className={inputClass(!!errors.firstName)}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="reg-lastName" className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-slate-500" />
                    </div>
                    <input
                      id="reg-lastName"
                      type="text"
                      placeholder="Doe"
                      autoComplete="family-name"
                      {...register("lastName")}
                      className={inputClass(!!errors.lastName)}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.lastName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="reg-email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-500" />
                    </div>
                    <input
                      id="reg-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...register("email")}
                      onChange={(e) => {
                        register("email").onChange(e)
                        if (error) clearError()
                      }}
                      className={inputClass(!!errors.email)}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white
                    bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500
                    shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
                    transition-all duration-200 active:scale-[0.98]
                    flex items-center justify-center gap-2 mt-8"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* ─── Step 2: Password Setup ────────────────────────────── */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-semibold text-white">Set Your Password</h2>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="reg-password" className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-500" />
                    </div>
                    <input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      {...register("password")}
                      className={`${inputClass(!!errors.password)} !pr-12`}
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
                      <AlertCircle className="w-3 h-3" /> {errors.password.message}
                    </p>
                  )}

                  {/* Password Strength Indicator */}
                  {watchedPassword && <PasswordStrength password={watchedPassword} />}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="reg-confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-500" />
                    </div>
                    <input
                      id="reg-confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      {...register("confirmPassword")}
                      className={`${inputClass(!!errors.confirmPassword)} !pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Nav Buttons */}
                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-3 px-4 rounded-xl font-medium text-sm text-slate-300
                      border border-white/10 hover:border-white/20 hover:bg-white/[0.04]
                      transition-all duration-200 active:scale-[0.98]
                      flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm text-white
                      bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500
                      shadow-lg shadow-purple-500/25 transition-all duration-200 active:scale-[0.98]
                      flex items-center justify-center gap-2"
                  >
                    Review
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ─── Step 3: Review & Submit ───────────────────────────── */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-semibold text-white">Review Your Information</h2>
                </div>

                {/* Review Card */}
                <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">First Name</p>
                      <p className="text-sm text-white font-medium">{watchedFirstName || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Last Name</p>
                      <p className="text-sm text-white font-medium">{watchedLastName || "—"}</p>
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-xs text-slate-500 mb-1">Email</p>
                    <p className="text-sm text-white font-medium">{watchedEmail || "—"}</p>
                  </div>
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-xs text-slate-500 mb-1">Password</p>
                    <p className="text-sm text-white font-medium tracking-widest">
                      {"•".repeat(watchedPassword.length || 0)}
                    </p>
                  </div>
                </div>

                {/* Terms Notice */}
                <p className="text-xs text-slate-500 leading-relaxed">
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" className="text-purple-400 hover:text-purple-300 underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-purple-400 hover:text-purple-300 underline">Privacy Policy</Link>.
                </p>

                {/* Nav Buttons */}
                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-3 px-4 rounded-xl font-medium text-sm text-slate-300
                      border border-white/10 hover:border-white/20 hover:bg-white/[0.04]
                      transition-all duration-200 active:scale-[0.98]
                      flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm text-white
                      bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500
                      shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                      transition-all duration-200 active:scale-[0.98]
                      flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Create Account
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

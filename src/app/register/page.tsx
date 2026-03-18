"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

// Enhanced validation schema for user registration
const userRegistrationSchema = z.object({
    firstName: z.string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name must be less than 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters"),
    lastName: z.string()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name must be less than 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters"),
    email: z.string()
        .email("Please enter a valid email address")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain uppercase, lowercase, and number"),
    confirmPassword: z.string()
        .min(8, "Please confirm your password"),
    phone: z.string()
        .regex(/^[+]?[\d\s-()]+$/, "Please enter a valid phone number")
        .optional(),
    agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type UserRegistrationValues = z.infer<typeof userRegistrationSchema>;

export default function UserRegistrationPage() {
    const { register: registerUser, isLoading, error: authError } = useAuth();
    const [success, setSuccess] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        trigger,
    } = useForm<UserRegistrationValues>({
        resolver: zodResolver(userRegistrationSchema),
        mode: "onChange",
    });

    const watchedPassword = watch("password");
    const watchedConfirmPassword = watch("confirmPassword");

    const onSubmit = async (data: UserRegistrationValues) => {
        setSuccess(null);

        const result = await registerUser({
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName
        });

        if (result.success) {
            setSuccess('Account created successfully! Redirecting to login...');
        }
    };

    // Step 1: Basic Information
    const renderStep1 = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Account</h2>
            <p className="text-gray-600 mb-8">Join our event management platform and start booking amazing events!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        {...register("firstName")}
                        placeholder="John"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.firstName ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.firstName.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        {...register("lastName")}
                        placeholder="Doe"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.lastName.message}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="john.doe@example.com"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                </div>
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                </label>
                <input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="+1 (555) 123-4567"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={async () => {
                        const isValid = await trigger(["firstName", "lastName", "email", "phone"]);
                        if (isValid) {
                            setCurrentStep(2);
                        }
                    }}
                    className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                    Continue to Password Setup
                </button>
            </div>
        </div>
    );

    // Step 2: Password Setup
    const renderStep2 = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Set Your Password</h2>
            <p className="text-gray-600 mb-8">Create a strong password to secure your account.</p>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="Create a strong password"
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        placeholder="Confirm your password"
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.confirmPassword ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.confirmPassword.message}
                    </p>
                )}
                {watchedPassword && watchedConfirmPassword && watchedPassword !== watchedConfirmPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Passwords do not match
                    </p>
                )}
            </div>

            <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Password Requirements:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li className="flex items-center">
                            <CheckCircle className={`w-4 h-4 mr-2 ${watchedPassword && watchedPassword.length >= 8 ? 'text-green-600' : 'text-gray-400'}`} />
                            At least 8 characters
                        </li>
                        <li className="flex items-center">
                            <CheckCircle className={`w-4 h-4 mr-2 ${watchedPassword && /[a-z]/.test(watchedPassword) ? 'text-green-600' : 'text-gray-400'}`} />
                            Contains lowercase letter
                        </li>
                        <li className="flex items-center">
                            <CheckCircle className={`w-4 h-4 mr-2 ${watchedPassword && /[A-Z]/.test(watchedPassword) ? 'text-green-600' : 'text-gray-400'}`} />
                            Contains uppercase letter
                        </li>
                        <li className="flex items-center">
                            <CheckCircle className={`w-4 h-4 mr-2 ${watchedPassword && /\d/.test(watchedPassword) ? 'text-green-600' : 'text-gray-400'}`} />
                            Contains number
                        </li>
                    </ul>
                </div>

                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        {...register("agreeToTerms")}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">
                        I agree to the{' '}
                        <Link href="/terms" className="text-purple-600 hover:text-purple-800 underline">
                            Terms and Conditions
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-purple-600 hover:text-purple-800 underline">
                            Privacy Policy
                        </Link>
                    </span>
                </label>
                {errors.agreeToTerms && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.agreeToTerms.message}
                    </p>
                )}
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={async () => {
                        const isValid = await trigger(["password", "confirmPassword", "agreeToTerms"]);
                        if (isValid) {
                            setCurrentStep(3);
                        }
                    }}
                    className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                    Review Information
                </button>
            </div>
        </div>
    );

    // Step 3: Review & Submit
    const renderStep3 = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Information</h2>
            <p className="text-gray-600 mb-8">Please review your information before submitting.</p>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-medium text-gray-900">Personal Information</h4>
                        <div className="mt-2 space-y-1 text-sm">
                            <p><span className="font-medium">Name:</span> {watch("firstName")} {watch("lastName")}</p>
                            <p><span className="font-medium">Email:</span> {watch("email")}</p>
                            {watch("phone") && <p><span className="font-medium">Phone:</span> {watch("phone")}</p>}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900">Account Status</h4>
                        <div className="mt-2 space-y-1 text-sm">
                            <p><span className="font-medium">Password:</span> {'*'.repeat(watchedPassword?.length || 0)}</p>
                            <p><span className="font-medium">Terms:</span> {watch("agreeToTerms") ? "✅ Agreed" : "❌ Not agreed"}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Creating Account...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full space-y-8">
                {/* Progress Indicator */}
                <div className="flex items-center justify-center space-x-2">
                    {[1, 2, 3].map((step) => (
                        <div
                            key={step}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                currentStep >= step
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-300 text-gray-600'
                            }`}
                        >
                            {step}
                        </div>
                    ))}
                </div>

                {/* Error Message */}
                {authError && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            <span>{authError}</span>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                        <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            <span>{success}</span>
                        </div>
                    </div>
                )}

                {/* Registration Form */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {currentStep === 1 && renderStep1()}
                        {currentStep === 2 && renderStep2()}
                        {currentStep === 3 && renderStep3()}
                    </form>
                </div>

                {/* Login Link */}
                <div className="text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-purple-600 hover:text-purple-800 font-medium underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

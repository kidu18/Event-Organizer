"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield, Mail, Lock, AlertCircle, Loader2, Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import { login } from "@/services/authServices";
import { getSession } from "@/lib/custom-auth";

// Enhanced validation schema
const adminLoginSchema = z.object({
    email: z.string()
        .email("Please enter a valid admin email")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain uppercase, lowercase, and number"),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

export default function AdminLoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<AdminLoginFormValues>({
        resolver: zodResolver(adminLoginSchema),
        mode: "onChange",
    });

    // Watch form values for real-time validation
    const watchedEmail = watch("email");
    const watchedPassword = watch("password");

    // Check if user is blocked after too many attempts
    useEffect(() => {
        if (loginAttempts >= 3) {
            setIsBlocked(true);
            const timer = setTimeout(() => {
                setIsBlocked(false);
                setLoginAttempts(0);
            }, 30000); // Block for 30 seconds
            return () => clearTimeout(timer);
        }
    }, [loginAttempts]);

    const onSubmit = async (data: AdminLoginFormValues) => {
        if (isBlocked) {
            setError("Too many failed attempts. Please wait 30 seconds and try again.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            console.log('🔴 Admin login attempt:', { 
                email: data.email, 
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            });
            
            // Call backend API
            const response = await login(data.email, data.password);
            
            console.log('✅ Admin login successful:', {
                userRole: response.user.role,
                userId: response.user.id,
                timestamp: new Date().toISOString()
            });
            
            // Verify admin role with strict checking
            if (response.user.role !== 'ADMIN' && response.user.role !== 'admin') {
                throw new Error("Access denied. Admin privileges required.");
            }
            
            // Store tokens and admin flag with metadata
            const loginData = {
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                user: response.user,
                loginTime: new Date().toISOString(),
                loginAttempts: loginAttempts + 1
            };
            
            // Store in localStorage for client-side access
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('isAdmin', 'true');
            localStorage.setItem('loginTime', loginData.loginTime);
            localStorage.setItem('loginMetadata', JSON.stringify(loginData));
            
            // Store in cookies for middleware access
            document.cookie = `accessToken=${response.accessToken}; path=/; max-age=86400; SameSite=Strict`;
            document.cookie = `user=${encodeURIComponent(JSON.stringify(response.user))}; path=/; max-age=86400; SameSite=Strict`;
            
            // Reset login attempts on success
            setLoginAttempts(0);
            
            // Show success message briefly
            console.log('🔴 Redirecting to admin dashboard...');
            
            // Small delay for better UX, then redirect
            setTimeout(() => {
                console.log('🔴 Navigating to /admin');
                window.location.href = '/admin';
            }, 500);
            
        } catch (err) {
            console.error('❌ Admin login failed:', {
                error: err instanceof Error ? err.message : 'Unknown error',
                email: data.email,
                timestamp: new Date().toISOString(),
                attempts: loginAttempts + 1
            });
            
            // Increment failed attempts
            setLoginAttempts(prev => prev + 1);
            
            // Set user-friendly error message
            const errorMessage = err instanceof Error ? err.message : "Admin login failed";
            
            if (errorMessage.includes('500')) {
                setError("Server error. Please try again later.");
            } else if (errorMessage.includes('401')) {
                setError("Invalid email or password.");
            } else if (errorMessage.includes('403')) {
                setError("Access denied. Admin privileges required.");
            } else if (errorMessage.includes('Network')) {
                setError("Network error. Please check your connection.");
            } else {
                setError(errorMessage);
            }
            
        } finally {
            setIsLoading(false);
        }
    };

    // Handle forgot password
    const handleForgotPassword = () => {
        console.log('🔑 Forgot password clicked');
        router.push('/admin/forgot-password');
    };

    // Handle user login redirect
    const handleUserLogin = () => {
        console.log('👤 User login clicked');
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            
            <div className="relative w-full max-w-md">
                {/* Admin Logo/Branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-2xl mb-4 transform hover:scale-105 transition-transform">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-gray-300 text-sm">Secure access to event management system</p>
                </div>

                {/* Login Form */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                    {/* Error Display */}
                    {error && (
                        <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-start space-x-3 animate-pulse">
                            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Authentication Error</p>
                                <p className="text-xs mt-1">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Blocked Message */}
                    {isBlocked && (
                        <div className="mb-6 bg-yellow-500/20 border border-yellow-500/50 text-yellow-200 px-4 py-3 rounded-lg flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Account Temporarily Blocked</p>
                                <p className="text-xs mt-1">Too many failed attempts. Please wait 30 seconds.</p>
                            </div>
                        </div>
                    )}

                    {/* Login Attempts Counter */}
                    {loginAttempts > 0 && loginAttempts < 3 && (
                        <div className="mb-4 text-center">
                            <p className="text-xs text-yellow-300">
                                Failed attempts: {loginAttempts}/3
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-200 mb-2">
                                Admin Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="admin-email"
                                    type="email"
                                    {...register("email")}
                                    placeholder="admin@yourcompany.com"
                                    className={`block w-full pl-10 pr-3 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                                        errors.email 
                                            ? "border-red-500 focus:ring-red-500" 
                                            : "border-white/20"
                                    }`}
                                    disabled={isLoading || isBlocked}
                                    autoComplete="email"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-400 flex items-center">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="admin-password" className="block text-sm font-medium text-gray-200">
                                    Admin Password
                                </label>
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                                    disabled={isLoading || isBlocked}
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="admin-password"
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    placeholder="Enter admin password"
                                    className={`block w-full pl-10 pr-12 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                                        errors.password 
                                            ? "border-red-500 focus:ring-red-500" 
                                            : "border-white/20"
                                    }`}
                                    disabled={isLoading || isBlocked}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    disabled={isLoading || isBlocked}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-400 flex items-center">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || isBlocked || !watchedEmail || !watchedPassword}
                            className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Authenticating...
                                </>
                            ) : isBlocked ? (
                                <>
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    Account Blocked
                                </>
                            ) : (
                                "Access Admin Panel"
                            )}
                        </button>
                    </form>

                    {/* Security Notice */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <Shield className="w-4 h-4" />
                            <span>This is a secure admin portal. Unauthorized access is prohibited.</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 space-y-4">
                    <p className="text-gray-400 text-sm">
                        Not an admin?{' '}
                        <button
                            onClick={handleUserLogin}
                            className="text-purple-400 hover:text-purple-300 font-medium transition-colors underline"
                        >
                            User Login
                        </button>
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                        <span>© 2024 Event Management System</span>
                        <span>•</span>
                        <span>Version 1.0.0</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

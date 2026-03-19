"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield, Mail, Lock, AlertCircle, Loader2, Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import { login } from "@/services/authServices";

const adminLoginSchema = z.object({
    email: z.string().email("Please enter a valid admin email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
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
        formState: { errors },
        watch,
    } = useForm<AdminLoginFormValues>({
        resolver: zodResolver(adminLoginSchema),
        mode: "onChange",
    });

    const watchedEmail = watch("email");
    const watchedPassword = watch("password");

    useEffect(() => {
        if (loginAttempts >= 3) {
            setIsBlocked(true);
            const timer = setTimeout(() => {
                setIsBlocked(false);
                setLoginAttempts(0);
            }, 30000);
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
            console.log('🔴 Admin login attempt:', { email: data.email });
            
            const response = await login(data.email, data.password);
            
            console.log('✅ API Response received:', response);
            
            if (response.user.role !== 'ADMIN' && response.user.role !== 'admin') {
                throw new Error("Access denied. Admin privileges required.");
            }
            
            console.log('🔴 Storing tokens in localStorage...');
            
            // Store tokens
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('isAdmin', 'true');
            localStorage.setItem('loginTime', new Date().toISOString());
            
            console.log('🔴 Storing tokens in cookies...');
            
            // Store in cookies for middleware
            document.cookie = `accessToken=${response.accessToken}; path=/; max-age=86400`;
            document.cookie = `user=${encodeURIComponent(JSON.stringify(response.user))}; path=/; max-age=86400`;
            
            console.log('🔴 Tokens stored, checking localStorage...');
            console.log('accessToken:', localStorage.getItem('accessToken'));
            console.log('user:', localStorage.getItem('user'));
            console.log('isAdmin:', localStorage.getItem('isAdmin'));
            
            setLoginAttempts(0);
            
            console.log('🔴 Redirecting to /admin in 500ms...');
            
            setTimeout(() => {
                console.log('🔴 Now redirecting...');
                window.location.href = '/admin';
            }, 500);
            
        } catch (err) {
            console.error('❌ Admin login failed:', err);
            setError(err instanceof Error ? err.message : "Admin login failed");
            setLoginAttempts(prev => prev + 1);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="relative w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-2xl mb-4">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-gray-300 text-sm">Secure access to event management system</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                    {error && (
                        <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Authentication Error</p>
                                <p className="text-xs mt-1">{error}</p>
                            </div>
                        </div>
                    )}

                    {isBlocked && (
                        <div className="mb-6 bg-yellow-500/20 border border-yellow-500/50 text-yellow-200 px-4 py-3 rounded-lg flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Account Temporarily Blocked</p>
                                <p className="text-xs mt-1">Too many failed attempts. Please wait 30 seconds.</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                                    placeholder="admin@eventmanager.com"
                                    className={`block w-full pl-10 pr-3 py-3 bg-white/10 border rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                        errors.email ? "border-red-500" : "border-white/20"
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

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="admin-password" className="block text-sm font-medium text-gray-200">
                                    Admin Password
                                </label>
                                <Link
                                    href="/admin/forgot-password"
                                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="admin-password"
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    placeholder="Admin123!"
                                    className={`block w-full pl-10 pr-12 py-3 bg-white/10 border rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                        errors.password ? "border-red-500" : "border-white/20"
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

                        <button
                            type="submit"
                            disabled={isLoading || isBlocked || !watchedEmail || !watchedPassword}
                            className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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

                    <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <Shield className="w-4 h-4" />
                            <span>This is a secure admin portal. Unauthorized access is prohibited.</span>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-gray-400 text-sm">
                        Not an admin?{' '}
                        <Link
                            href="/login"
                            className="text-purple-400 hover:text-purple-300 font-medium transition-colors underline"
                        >
                            User Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

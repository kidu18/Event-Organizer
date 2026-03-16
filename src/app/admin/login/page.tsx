"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield, Mail, Lock, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

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
//test
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AdminLoginFormValues>({
        resolver: zodResolver(adminLoginSchema),
    });

    const onSubmit = async (data: AdminLoginFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
                callbackUrl: "/admin",
            });

            if (result?.error) {
                setError("Invalid admin credentials. Please try again.");
            } else {
                // Verify user has admin role
                const response = await fetch("/api/auth/session");
                const session = await response.json();
                
                if (session?.user?.role === "admin") {
                    router.push("/admin");
                    router.refresh();
                } else {
                    setError("Access denied. Admin privileges required.");
                }
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg mb-4">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">
                        Admin Portal
                    </h2>
                    <p className="mt-2 text-sm text-gray-300">
                        Secure access to event management system
                    </p>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-500/20 border-l-4 border-red-500 p-4 rounded-md flex items-start space-x-3 backdrop-blur">
                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                        <p className="text-sm text-red-300">{error}</p>
                    </div>
                )}

                {/* Login Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                                Admin Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...register("email")}
                                    type="email"
                                    className={`block w-full text-white pl-10 pr-3 py-3 bg-white/10 border ${errors.email ? "border-red-500" : "border-white/20"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur placeholder-gray-400 transition-all`}
                                    placeholder="admin@yourcompany.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                                    Admin Password
                                </label>
                                <Link
                                    href="/admin/forgot-password"
                                    className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    className={`block w-full text-white pl-10 pr-12 py-3 bg-white/10 border ${errors.password ? "border-red-500" : "border-white/20"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur placeholder-gray-400 transition-all`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Access Admin Panel"
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className="text-center mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm text-gray-400">
                        Regular user?{" "}
                        <Link
                            href="/auth/login"
                            className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

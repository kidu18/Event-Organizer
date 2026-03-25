"use client";

import React from "react";

export default function AdminLoginTestPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Admin Login Test</h1>
                <p className="text-gray-600">This is a test page to verify the admin login route works.</p>
                <a href="/admin/login" className="text-blue-500 hover:underline mt-4 block">
                    Go to Admin Login
                </a>
            </div>
        </div>
    );
}

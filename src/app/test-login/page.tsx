"use client";

import React, { useState } from "react";

export default function TestLoginPage() {
    const [email, setEmail] = useState('admin@eventmanager.com');
    const [password, setPassword] = useState('Admin123!');
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const testLogin = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/api/test/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            setResponse(data);
            console.log('Test login response:', data);
        } catch (error) {
            console.error('Test login error:', error);
            setResponse({ error: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-4">Test Login API</h1>
            
            <div className="bg-white p-4 rounded shadow max-w-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                
                <button
                    onClick={testLogin}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? 'Testing...' : 'Test Login'}
                </button>
                
                {response && (
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Response:</h3>
                        <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                            {JSON.stringify(response, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}

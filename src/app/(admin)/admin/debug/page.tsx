"use client";

import React, { useEffect, useState } from "react";

export default function DebugPage() {
    const [debugInfo, setDebugInfo] = useState<any>({});

    useEffect(() => {
        const info = {
            localStorage: {
                accessToken: localStorage.getItem('accessToken'),
                refreshToken: localStorage.getItem('refreshToken'),
                user: localStorage.getItem('user'),
                isAdmin: localStorage.getItem('isAdmin'),
                loginTime: localStorage.getItem('loginTime'),
            },
            cookies: document.cookie,
            sessionStorage: {
                accessToken: sessionStorage.getItem('accessToken'),
                user: sessionStorage.getItem('user'),
            }
        };
        setDebugInfo(info);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-4">Debug Info</h1>
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">LocalStorage:</h2>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(debugInfo.localStorage, null, 2)}
                </pre>
                
                <h2 className="text-lg font-semibold mb-2 mt-4">Cookies:</h2>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {debugInfo.cookies}
                </pre>
                
                <h2 className="text-lg font-semibold mb-2 mt-4">SessionStorage:</h2>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(debugInfo.sessionStorage, null, 2)}
                </pre>
            </div>
            
            <div className="mt-4">
                <a href="/admin/login" className="text-blue-500 hover:underline">
                    Back to Admin Login
                </a>
                <br />
                <a href="/admin" className="text-blue-500 hover:underline">
                    Go to Admin Dashboard
                </a>
            </div>
        </div>
    );
}

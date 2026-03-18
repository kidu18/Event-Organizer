"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Users, Calendar, Settings, LogOut, TrendingUp, Activity, DollarSign, Eye, Edit, Trash2, Plus, Search, Filter, Download, Bell, UserCheck, Clock, CheckCircle, XCircle, AlertTriangle, User } from "lucide-react";
import { getSession, isAdmin, logout } from "@/lib/custom-auth";
import type { User } from "@/lib/custom-auth";

export default function AdminDashboardPage() {
    const router = useRouter();
    const [adminData, setAdminData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    
    const [stats, setStats] = useState({
        totalUsers: 1247,
        totalEvents: 45,
        totalBookings: 3892,
        totalRevenue: 48500,
        recentActivity: [
            { id: 1, type: 'user', message: 'New user registration: john.doe@email.com', time: '2 minutes ago', icon: Users, color: 'text-green-500' },
            { id: 2, type: 'booking', message: 'Event booking: Summer Festival - 5 tickets', time: '15 minutes ago', icon: Calendar, color: 'text-blue-500' },
            { id: 3, type: 'revenue', message: 'Payment received: $250.00', time: '1 hour ago', icon: DollarSign, color: 'text-green-600' },
            { id: 4, type: 'alert', message: 'Server maintenance scheduled', time: '2 hours ago', icon: AlertTriangle, color: 'text-yellow-500' },
            { id: 5, type: 'event', message: 'New event created: Tech Conference 2024', time: '3 hours ago', icon: Calendar, color: 'text-purple-500' }
        ],
        recentUsers: [
            { id: 1, name: 'John Doe', email: 'john.doe@email.com', joined: '2024-03-18', status: 'active' },
            { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', joined: '2024-03-17', status: 'active' },
            { id: 3, name: 'Mike Johnson', email: 'mike.j@email.com', joined: '2024-03-16', status: 'pending' },
            { id: 4, name: 'Sarah Wilson', email: 'sarah.w@email.com', joined: '2024-03-15', status: 'active' },
        ],
        recentEvents: [
            { id: 1, title: 'Summer Music Festival', date: '2024-06-15', attendees: 450, status: 'active', revenue: 22500 },
            { id: 2, title: 'Tech Conference 2024', date: '2024-04-20', attendees: 200, status: 'upcoming', revenue: 10000 },
            { id: 3, title: 'Food & Wine Expo', date: '2024-05-10', attendees: 300, status: 'active', revenue: 15000 },
            { id: 4, title: 'Sports Tournament', date: '2024-07-01', attendees: 500, status: 'planning', revenue: 0 },
        ]
    });

    useEffect(() => {
        const verifyAdminAccess = async () => {
            try {
                console.log('🔴 Admin dashboard: Starting verification...');
                
                const session = await getSession();
                const adminCheck = isAdmin();
                
                console.log('🔴 Admin dashboard: Session:', session);
                console.log('🔴 Admin dashboard: Admin check:', adminCheck);
                
                if (!session || !adminCheck) {
                    console.log('🔒 No admin access, redirecting to login');
                    router.push('/admin/login');
                    return;
                }
                
                setAdminData(session.user);
                console.log('✅ Admin access granted:', session.user);
                
            } catch (error) {
                console.error('❌ Admin verification failed:', error);
                router.push('/admin/login');
            } finally {
                setLoading(false);
            }
        };

        verifyAdminAccess();
    }, [router]);

    const handleLogout = () => {
        console.log('🔴 Admin logging out');
        logout();
        router.push('/admin/login');
    };

    const filteredUsers = stats.recentUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredEvents = stats.recentEvents.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Enhanced Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <Shield className="w-8 h-8 text-purple-600 mr-3" />
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                                    <p className="text-xs text-gray-500">Event Management System</p>
                                </div>
                            </div>
                            
                            {/* Navigation Tabs */}
                            <nav className="hidden md:flex space-x-1">
                                {['overview', 'users', 'events', 'bookings', 'analytics'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            activeTab === tab
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </nav>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {/* Search Bar */}
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            
                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>
                                
                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                        <div className="p-4 border-b border-gray-200">
                                            <h3 className="font-semibold text-gray-900">Notifications</h3>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {stats.recentActivity.map((activity) => (
                                                <div key={activity.id} className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                                                    <div className="flex items-start space-x-3">
                                                        <activity.icon className={`w-4 h-4 ${activity.color} mt-0.5 flex-shrink-0`} />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm text-gray-900 truncate">{activity.message}</p>
                                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* User Menu */}
                            <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-700">
                                    Welcome, <span className="font-medium">{adminData?.firstName || adminData?.name || 'Admin'}</span>
                                </span>
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                                >
                                    <LogOut className="w-4 h-4 mr-1" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Enhanced Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatsCard
                                icon={Users}
                                title="Total Users"
                                value={stats.totalUsers.toLocaleString()}
                                change="+12.5%"
                                changeType="increase"
                                color="blue"
                            />
                            <StatsCard
                                icon={Calendar}
                                title="Total Events"
                                value={stats.totalEvents}
                                change="+8.2%"
                                changeType="increase"
                                color="green"
                            />
                            <StatsCard
                                icon={Activity}
                                title="Total Bookings"
                                value={stats.totalBookings.toLocaleString()}
                                change="+23.1%"
                                changeType="increase"
                                color="purple"
                            />
                            <StatsCard
                                icon={DollarSign}
                                title="Total Revenue"
                                value={`$${stats.totalRevenue.toLocaleString()}`}
                                change="+15.3%"
                                changeType="increase"
                                color="yellow"
                            />
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Trends</h3>
                                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                                    <div className="text-center text-gray-500">
                                        <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                                        <p>Chart visualization coming soon</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
                                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                                    <div className="text-center text-gray-500">
                                        <DollarSign className="w-12 h-12 mx-auto mb-2" />
                                        <p>Revenue chart coming soon</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {stats.recentActivity.map((activity) => (
                                    <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start space-x-3">
                                            <activity.icon className={`w-5 h-5 ${activity.color} mt-0.5 flex-shrink-0`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-900">{activity.message}</p>
                                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="space-y-6">
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium text-gray-900">Users Management</h3>
                                    <div className="flex space-x-2">
                                        <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                            <Filter className="w-4 h-4 mr-2" />
                                            Filter
                                        </button>
                                        <button className="flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add User
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                                            <User className="w-4 h-4 text-gray-600" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                            <div className="text-sm text-gray-500">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        user.status === 'active' 
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.joined}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <button className="text-purple-600 hover:text-purple-900">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button className="text-blue-600 hover:text-blue-900">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button className="text-red-600 hover:text-red-900">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Events Tab */}
                {activeTab === 'events' && (
                    <div className="space-y-6">
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium text-gray-900">Events Management</h3>
                                    <button className="flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Event
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                                {filteredEvents.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                    <div className="bg-white shadow rounded-lg p-8">
                        <div className="text-center">
                            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Bookings Management</h3>
                            <p className="text-gray-500">Booking management interface coming soon...</p>
                        </div>
                    </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                    <div className="bg-white shadow rounded-lg p-8">
                        <div className="text-center">
                            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
                            <p className="text-gray-500">Advanced analytics coming soon...</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

// Enhanced Stats Card Component
interface StatsCardProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    value: string | number;
    change: string;
    changeType: 'increase' | 'decrease';
    color: 'blue' | 'green' | 'purple' | 'yellow';
}

function StatsCard({ icon: Icon, title, value, change, changeType, color }: StatsCardProps) {
    const colorClasses = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        purple: 'bg-purple-500',
        yellow: 'bg-yellow-500'
    };

    const changeColorClass = changeType === 'increase' ? 'text-green-600' : 'text-red-600';

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-5">
                <div className="flex items-center">
                    <div className={`flex-shrink-0 ${colorClasses[color]} rounded-md p-3`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                                <div className={`ml-2 flex items-baseline text-sm font-semibold ${changeColorClass}`}>
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    {change}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Event Card Component
interface EventCardProps {
    event: {
        id: number;
        title: string;
        date: string;
        attendees: number;
        status: string;
        revenue: number;
    };
}

function EventCard({ event }: EventCardProps) {
    const statusColors = {
        active: 'bg-green-100 text-green-800',
        upcoming: 'bg-blue-100 text-blue-800',
        planning: 'bg-yellow-100 text-yellow-800'
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-medium text-gray-900 truncate">{event.title}</h4>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[event.status as keyof typeof statusColors]}`}>
                    {event.status}
                </span>
            </div>
            <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    {event.attendees} attendees
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <DollarSign className="w-4 h-4 mr-2" />
                    ${event.revenue.toLocaleString()}
                </div>
            </div>
            <div className="mt-4 flex space-x-2">
                <button className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                </button>
            </div>
        </div>
    );
}

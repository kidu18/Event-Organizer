# Event Organizer - Project Overview & Documentation

This document provides a comprehensive summary of the development achievements and current state of the **Event-Organizer** project.

## 🚀 Project Overview
**Event-Organizer** is a premium, high-performance web application designed for seamless event discovery, booking, and management. It features a sophisticated administrative dashboard and a "WOW" factor user interface with modern aesthetics.

---

## 🛠️ Tech Stack
*   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
*   **UI/Interface**: React 19, [Tailwind CSS 4](https://tailwindcss.com/)
*   **Typography**: Inter, Outfit (Modern aesthetic)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **State Management**: React Hooks & Context API
*   **Forms & Validation**: React Hook Form, Zod
*   **Authentication**: Custom Auth System (Secure Cookies & Server Actions)
*   **Backend Integration**: Direct REST API integration via services

---

## ✨ Core Features & Achievements

### 1. 🔐 Robust Authentication System
*   **Custom Flow**: Completely custom login and registration system without heavy dependencies.
*   **Secure Session Management**: Token-based authentication using HTTP-only cookies and local storage.
*   **Auto-Refresh**: Implemented JWT refresh token logic to keep users logged in securely.
*   **Auth Hooks**: `useAuth` hook for managing user state globally across the application.
*   **Guides**: Created detailed `AUTHENTICATION_FLOW_GUIDE.md` and `USER_REGISTRATION_GUIDE.md`.

### 2. 🎨 Premium User Experience (UX/UI)
*   **Modern Aesthetics**: 2026-style dark theme with high-contrast neon green accents.
*   **Glassmorphism**: Sophisticated semi-transparent elements for a premium layered feel.
*   **Hero Section**: Stunning landing page with stylized typography and liquid diamond background effects.
*   **Floating Navbar**: Sleek, pill-shaped navigation bar for better accessibility and style.
*   **Animations**: Smooth micro-interactions and page transitions for an "alive" interface.

### 3. 📅 Event Discovery & Management
*   **Event Listings**: Responsive event grid with card components featuring lazy-loaded images and detailed info.
*   **Global Search**: Live, client-side global search across events, users, and bookings.
*   **Live Updates**: Real-time filtering and data display directly from the backend.
*   **Image Handling**: Resolved photo loading issues for consistent visual performance.

### 4. 🛠️ Administrative Dashboard
*   **User Management**: Interface for managing platform users and their roles.
*   **Event Dashboard**: Full CRUD (Create, Read, Update, Delete) cycle for managing upcoming events.
*   **Bookings Management**: Admin view to handle and track all event reservations.
*   **Access Control**: Dedicated `(admin)` route group with layout-level protection.

### 5. 📖 Documentation & Developer Experience
*   **Comprehensive Guides**: Detailed Markdown files for every major flow (Admin Login, Registration, Events).
*   **Architecture Pattern**: Clean separation of concerns (Components, Services, Actions, Hooks).
*   **Type Safety**: Full TypeScript implementation with Zod schemas for robust data validation.

---

## 🏗️ Project Structure
```text
src/
├── app/             # Modern App Router structure
│   ├── (admin)/     # Protected Admin-only routes
│   ├── (user)/      # Public/User-facing routes
│   └── api/         # API Route Handlers
├── components/      # Modular UI components (Admin, Event, Home, UI, Layout)
├── actions/         # Server Actions for form submissions and data mutations
├── services/        # Logic for interacting with external APIs
├── hooks/           # Custom reusable React hooks (useAuth, useSearch)
├── types/           # TypeScript interfaces and type definitions
└── lib/             # Shared utilities and configurations
```

---

## ✅ Recent Progress
1.  **Global Search Implementation**: Added real-time filtering for easier data access.
2.  **UI Redesign**: Overhauled the homepage with a premium neon/dark aesthetic.
3.  **Auth Refactor**: Migrated from a test setup to a robust, service-based auth system.
4.  **Admin Dashboard Completion**: Finished the initial iteration of the management interface.

---
*Last Updated: March 26, 2026*

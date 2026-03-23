/**
 * DEPRECATED: NextAuth type declarations.
 * 
 * This project no longer uses NextAuth for authentication.
 * Authentication is now handled by custom cookie-based auth:
 * - Services: @/services/authServices.ts
 * - Server Actions: @/actions/authActions.ts
 * - Client Hook: @/hooks/useAuth.ts
 * - Provider: @/components/providers/AuthProvider.tsx
 * - Types: @/types/auth.ts
 * 
 * This file is kept to prevent TypeScript errors from any 
 * residual next-auth package references.
 */

export {}

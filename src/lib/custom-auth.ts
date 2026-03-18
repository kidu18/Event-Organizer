// Custom authentication utilities to replace NextAuth

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

export interface Session {
  user: User | null;
  expires: string | null;
}

// Get current session from localStorage
export function getSession(): Promise<Session | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null);
      return;
    }

    try {
      const userStr = localStorage.getItem('user');
      const loginTime = localStorage.getItem('loginTime');
      const isAdmin = localStorage.getItem('isAdmin');

      if (!userStr || !loginTime) {
        resolve(null);
        return;
      }

      const user = JSON.parse(userStr);
      
      // Check if session is expired (24 hours)
      const loginDate = new Date(loginTime);
      const now = new Date();
      const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        // Session expired
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('loginTime');
        resolve(null);
        return;
      }

      resolve({
        user: {
          id: user.id,
          email: user.email,
          name: user.name || user.firstName,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName
        },
        expires: new Date(loginDate.getTime() + 24 * 60 * 60 * 1000).toISOString()
      });

    } catch (error) {
      console.error('Error getting session:', error);
      resolve(null);
    }
  });
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('accessToken');
  const user = localStorage.getItem('user');
  const loginTime = localStorage.getItem('loginTime');
  
  return !!(token && user && loginTime);
}

// Check if user is admin
export function isAdmin(): boolean {
  if (typeof window === 'undefined') return false;
  
  const isAdminFlag = localStorage.getItem('isAdmin') === 'true';
  const userStr = localStorage.getItem('user');
  
  if (!isAdminFlag || !userStr) return false;
  
  try {
    const user = JSON.parse(userStr);
    return user.role === 'ADMIN' || user.role === 'admin';
  } catch {
    return false;
  }
}

// Logout user
export function logout(): void {
  if (typeof window === 'undefined') return;
  
  // Clear localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('loginTime');
  localStorage.removeItem('loginMetadata');
  
  // Clear cookies
  document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
  document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
}

// Get auth token for API calls
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

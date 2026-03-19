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

// Get current session from localStorage or cookies
export function getSession(): Promise<Session | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null);
      return;
    }

    try {
      // First try localStorage
      let userStr = localStorage.getItem('user');
      let loginTime = localStorage.getItem('loginTime');
      let isAdmin = localStorage.getItem('isAdmin');

      // If localStorage is empty, try cookies
      if (!userStr) {
        const userCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('user='));
        
        if (userCookie) {
          userStr = decodeURIComponent(userCookie.split('=')[1]);
          loginTime = new Date().toISOString(); // Use current time for cookie sessions
          isAdmin = 'true'; // Assume admin if accessing admin routes
        }
      }

      if (!userStr || !loginTime) {
        console.log(' No session data found in localStorage or cookies');
        resolve(null);
        return;
      }

      const user = JSON.parse(userStr);
      
      // Check if session is expired (24 hours)
      const loginDate = new Date(loginTime);
      const now = new Date();
      const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        console.log(' Session expired');
        // Clear expired session
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('loginTime');
        
        // Clear cookies too
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        
        resolve(null);
        return;
      }

      console.log(' Session found:', { user: user.email, role: user.role });
      
      resolve({
        user: {
          id: user.id,
          email: user.email,
          name: user.name || user.firstName,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName
        },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });
    } catch (error) {
      console.error(' Session error:', error);
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

// Check if user has admin role
export function isAdmin(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check localStorage first
  const isAdmin = localStorage.getItem('isAdmin');
  if (isAdmin === 'true') return true;
  
  // Check cookies as fallback
  const userCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('user='));
  
  if (userCookie) {
    try {
      const user = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
      return user.role === 'ADMIN' || user.role === 'admin';
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      return false;
    }
  }
  return false;
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

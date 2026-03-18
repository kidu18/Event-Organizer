# 🔐 Backend Test Credentials

## **🎯 Admin Login Credentials**

### **Production Backend URL:**
```
https://event-ticket-production.up.railway.app/api/auth/login
```

### **Test Admin Account:**
```json
{
  "email": "admin@eventmanager.com",
  "password": "Admin123!"
}
```

### **Test User Account:**
```json
{
  "email": "user@example.com", 
  "password": "User123!"
}
```

---

## **🧪 How to Test:**

### **Step 1: Navigate to Admin Login**
```
http://localhost:3000/admin/login
```

### **Step 2: Enter Admin Credentials**
- **Email**: `admin@eventmanager.com`
- **Password**: `Admin123!`

### **Step 3: Submit Form**
- Click "Access Admin Panel"
- Should redirect to `/admin` dashboard

---

## **🔍 Expected Backend Response:**

### **Successful Login (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "admin@eventmanager.com",
    "role": "ADMIN",
    "firstName": "Admin",
    "lastName": "User",
    "createdAt": "2024-03-20T10:00:00Z",
    "updatedAt": "2024-03-20T10:00:00Z"
  }
}
```

### **Error Responses:**

#### **401 Unauthorized:**
```json
{
  "message": "Invalid email or password"
}
```

#### **403 Forbidden:**
```json
{
  "message": "Access denied. Admin privileges required."
}
```

#### **500 Internal Server Error:**
```json
{
  "message": "Internal server error"
}
```

---

## **🛠️ Backend Setup Instructions:**

### **For Your Backend Developer:**

#### **1. Database Setup:**
```sql
-- Create admin user
INSERT INTO users (
  id, email, password_hash, role, first_name, last_name, created_at, updated_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'admin@eventmanager.com',
  '$2b$10$...', -- Hashed password for "Admin123!"
  'ADMIN',
  'Admin',
  'User',
  NOW(),
  NOW()
);
```

#### **2. API Endpoint:**
```javascript
// POST /api/auth/login
{
  "email": "admin@eventmanager.com",
  "password": "Admin123!"
}
```

#### **3. Password Hashing:**
```javascript
// Hash "Admin123!" with bcrypt
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash('Admin123!', 10);
```

---

## **🧪 Alternative: Mock Backend Testing**

If backend is not ready, you can test with the mock endpoint:

### **Mock URL:**
```
http://localhost:3000/api/mock/login
```

### **Mock Response:**
```json
{
  "accessToken": "mock-access-token-12345",
  "refreshToken": "mock-refresh-token-67890", 
  "user": {
    "id": "mock-admin-id",
    "email": "admin@eventmanager.com",
    "role": "ADMIN",
    "firstName": "Admin",
    "lastName": "User",
    "createdAt": "2024-03-20T10:00:00Z",
    "updatedAt": "2024-03-20T10:00:00Z"
  }
}
```

---

## **🔧 Environment Variables:**

### **Add to .env file:**
```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://event-ticket-production.up.railway.app

# Optional: Use mock for testing
# NEXT_PUBLIC_API_URL=http://localhost:3000/api/mock
```

---

## **🎯 Testing Checklist:**

### **✅ Admin Login Flow:**
1. Navigate to `/admin/login`
2. Enter `admin@eventmanager.com` / `Admin123!`
3. Click "Access Admin Panel"
4. Should redirect to `/admin` dashboard
5. Check localStorage for tokens

### **✅ Error Handling:**
1. Try wrong password → Should show error
2. Try wrong email → Should show validation error
3. Try 3 failed attempts → Should block for 30 seconds

### **✅ Token Storage:**
1. After successful login, check browser console
2. Verify localStorage contains:
   - `accessToken`
   - `refreshToken`
   - `user`
   - `isAdmin`

---

## **🚀 Ready to Test!**

Use these credentials to test your admin login system. The frontend is fully configured to handle the backend authentication flow! 🎉

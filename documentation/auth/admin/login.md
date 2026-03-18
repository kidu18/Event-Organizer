# Admin Login

Authenticate an administrative account in the Event Organizer system.

## Action Details
- **Type**: POST
- **Endpoint**: `/api/auth/login`
- **Role**: ADMIN (Access to administrative tools and dashboards)

## Request Body
```json
{
  "email": "admin@example.com",
  "password": "Password123!"
}
```

## Success Response (200 OK)
Returns access and refresh tokens along with user details with role elevated to `ADMIN`.

```json
{
  "accessToken": "eyJhbGciOiJIUzI1Ni...",
  "refreshToken": "eyJhbGciOiJIUzI1Ni...",
  "user": {
    "id": "cmmw1sk5x00mn12o1dz1of4fu",
    "email": "admin@example.com",
    "firstName": "Super",
    "lastName": "Admin",
    "role": "ADMIN",
    "createdAt": "2026-03-18T12:59:11.253Z",
    "updatedAt": "2026-03-18T12:59:11.253Z"
  },
  "expiresIn": 900
}
```

## Implementation Workflow
1.  **Frontend Form**: Shared login form at `/login`.
2.  **Server Action**: `loginAction` in `src/actions/authActions.ts`.
3.  **Token Storage**: Tokens and user info are stored in HTTP-only cookies.
4.  **Redirect Strategy**:
    - **ADMIN**: Redirects to `/admin/dashboard`.
    - Accesses the dashboard via the admin-specific layout.

## Role-Based Access Control
After login, administrative users are granted access to restricted `/admin` routes and specific functionality (Event creation, Booking management, User oversight).
- **ADMIN PANELS**: Can access statistics, charts, and system settings.
- **RESTRICTED**: Regular users can NEVER access these panels.

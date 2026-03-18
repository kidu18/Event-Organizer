# User Login

Authenticate an existing user account in the Event Organizer system.

## Action Details
- **Type**: POST
- **Endpoint**: `/api/auth/login`
- **Role**: USER / ADMIN (Initial authentication for all roles)

## Request Body
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

## Success Response (200 OK)
Returns access and refresh tokens along with user details.

```json
{
  "accessToken": "eyJhbGciOiJIUzI1Ni...",
  "refreshToken": "eyJhbGciOiJIUzI1Ni...",
  "user": {
    "id": "cmmw1sk5x00mn12o1dz1of4fu",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "createdAt": "2026-03-18T12:59:11.253Z",
    "updatedAt": "2026-03-18T12:59:11.253Z"
  },
  "expiresIn": 900
}
```

## Implementation Workflow
1.  **Frontend Form**: Simple login form at `/login`.
2.  **Server Action**: `loginAction` in `src/actions/authActions.ts`.
3.  **Token Storage**: Tokens (accessToken, refreshToken) and user info are securely stored in HTTP-only cookies.
4.  **Redirect Strategy**:
    - **USER**: Redirects to `/user/dashboard`.
    - **ADMIN**: Redirects to `/admin/dashboard`.

## Role-Based Access Control
After login, the system uses the role property in the user profile to determine navigation and restricted area access.
- **RESTRICTED**: Regular users cannot access anything under `/admin` routes.
- **DASHBOARD**: Regular users are directed to the attendee-specific dashboard.

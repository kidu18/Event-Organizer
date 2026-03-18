# Admin Token Refresh

Silently refresh an administrator's access token to maintain administrative access.

## Action Details
- **Type**: POST
- **Endpoint**: `/api/auth/refresh`
- **Role**: ADMIN (Automatic background session extension)

## Request Body
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi..."
}
```

## Success Response (200 OK)
Extends the administrator's session.

```json
{
  "accessToken": "eyJhbGciOiJIUzI1Ni...",
  "refreshToken": "eyJhbGciOiJIUzI1Ni...",
  "user": {
    "role": "ADMIN",
    "updatedAt": "2026-03-18T12:59:11.253Z"
  },
  "expiresIn": 900
}
```

## Implementation Workflow
1.  **Server Action**: `refreshAction` in `src/actions/authActions.ts`.
2.  **Detection**: Usually triggered by an interceptor when a 401 Unauthorized status is received during an administrative API call.
3.  **Cookie Update**: Updates the `accessToken` and `refreshToken` cookies with the new values.

## Role-Based Access Control
The refresh action is crucial for administrators to maintain long-running sessions for monitoring and management without being logged out during critical operations.
1.  **Persistence**: Admins can keep their session active across different devices and browser restarts.
2.  **Security**: Access tokens are short-lived (15 minutes), minimize the potential impact of a compromised token.

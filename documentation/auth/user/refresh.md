# User Token Refresh

Silently refresh a user's access token using a valid refresh token.

## Action Details
- **Type**: POST
- **Endpoint**: `/api/auth/refresh`
- **Role**: USER / ADMIN (Automatic background session extension)

## Request Body
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbW13MXNrNXgwMG1uMTJvMWR6MW9mNGZ1IiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NzM4Mzg5MDYsImV4cCI6MTc3NDQ0MzcwNn0.dinX5jBD4xPuyEKwl9QZjJXYWVsnSHOPCID9NWAa9hc"
}
```

## Success Response (200 OK)
Extends the user's session by generating a new access token and a new refresh token.

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
1.  **Server Action**: `refreshAction` in `src/actions/authActions.ts`.
2.  **Detection**: Usually triggered by an interceptor (like Axios/Fetch interceptor) when a 401 Unauthorized status is received from an API call, or by middleware when the current token is about to expire.
3.  **Cookie Update**: Automatically updates the `accessToken` and `refreshToken` cookies with the new values.
4.  **Session Persistence**: Allows users to stay logged in without manual re-entry of credentials as long as the refresh token is valid (usually for 7 days).

## Error Handling
If the refresh token itself has expired or is invalid:
1.  Returns a 401/403 Error.
2.  System must redirect the user back to the login page.
3.  Any existing auth cookies must be cleared.

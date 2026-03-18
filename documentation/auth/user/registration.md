# User Registration

Register a new user account in the Event Organizer system.

## Action Details
- **Type**: POST
- **Endpoint**: `/api/auth/register`
- **Role**: USER (Publicly accessible for initial signup)

## Request Body
```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

## Success Response (201 Created)
Returns access and refresh tokens along with user details.

```json
{
  "accessToken": "eyJhbGci...",
  "refreshToken": "eyJhbGci...",
  "user": {
    "id": "cmmw1sk5x00mn12o1dz1of4fu",
    "email": "user@example.com",
    "role": "USER",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2026-03-18T12:59:11.253Z",
    "updatedAt": "2026-03-18T12:59:11.253Z"
  }
}
```

## Implementation Workflow
1.  **Frontend Form**: Multi-step registration form at `/register`.
2.  **Server Action**: `registerAction` in `src/actions/authActions.ts`.
3.  **Token Storage**: Tokens are securely stored in HTTP-only cookies.
4.  **Redirection**: Successful registration redirects to the login page or automatically logs the user in if configured.

## Validations
- **Email**: Must be a valid email format.
- **Password**: At least 8 characters, containing uppercase, lowercase, and numbers.
- **Names**: Only letters allowed, minimum 2 characters.

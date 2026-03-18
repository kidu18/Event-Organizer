export type User = {
  id: string
  email: string
  role: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
}

export type AuthResponse = {
  accessToken: string
  refreshToken: string
  user: User
}
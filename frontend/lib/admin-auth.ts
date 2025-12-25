// Simple admin authentication utilities (mock implementation)
// In production, this should use a real authentication system

export type AdminUser = {
  id: string
  email: string
  name: string
  role: "admin" | "superadmin"
}

// Mock admin credentials
const ADMIN_CREDENTIALS = {
  email: "admin@br.com",
  password: "admin123",
}

export function validateAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
}

export function getAdminUser(email: string): AdminUser | null {
  if (email === ADMIN_CREDENTIALS.email) {
    return {
      id: "1",
      email: "admin@br.com",
      name: "Admin User",
      role: "superadmin",
    }
  }
  return null
}

// Client-side auth helpers
export function setAdminSession(user: AdminUser) {
  if (typeof window !== "undefined") {
    localStorage.setItem("admin_user", JSON.stringify(user))
  }
}

export function getAdminSession(): AdminUser | null {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("admin_user")
    return userData ? JSON.parse(userData) : null
  }
  return null
}

export function clearAdminSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_user")
  }
}

// auth.d.ts
declare module '#auth-utils' {
  interface User {
    id: string

  }

  interface UserSession {
    id: string
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {}

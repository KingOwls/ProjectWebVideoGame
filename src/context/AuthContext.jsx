import { createContext, useContext, useMemo, useState } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getSession())

  const value = useMemo(() => ({
    user,
    async login(email, password) {
      const session = await authService.login(email, password)
      setUser(session)
      return session
    },
    async register(data) {
      const session = await authService.register(data)
      setUser(session)
      return session
    },
    logout() {
      authService.logout()
      setUser(null)
    },
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

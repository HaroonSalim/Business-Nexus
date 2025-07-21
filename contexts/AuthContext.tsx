import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '../types'
import { mockUsers } from '../data/mockData'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Omit<User, 'id' | 'joinedDate'>) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would be an API call
    const foundUser = mockUsers.find(u => u.email === email)
    
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem('currentUser', JSON.stringify(foundUser))
      return true
    }
    return false
  }

  const register = async (userData: Omit<User, 'id' | 'joinedDate'>): Promise<boolean> => {
    // Mock registration - in real app, this would be an API call
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString(),
    }
    
    // Add to mock data (in real app, this would be sent to backend)
    mockUsers.push(newUser)
    setUser(newUser)
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 
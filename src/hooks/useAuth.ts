// Custom Hook for Firebase Authentication
// Following modular programming best practices
'use client'

import { useState, useEffect, useCallback } from 'react'
import { AuthService } from '@/services/auth.service'
import type { User, LoginCredentials, SignupCredentials, AuthError } from '@/lib/types/firebase.types'

interface UseAuthReturn {
  user: User | null
  loading: boolean
  error: AuthError | null
  signUp: (credentials: SignupCredentials) => Promise<void>
  signIn: (credentials: LoginCredentials) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (newPassword: string) => Promise<void>
  updateProfile: (updates: { displayName?: string; photoURL?: string }) => Promise<void>
  resendVerificationEmail: () => Promise<void>
}

/**
 * Custom hook for Firebase Authentication
 * Manages auth state and provides auth methods
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AuthError | null>(null)

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChange((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Sign up with email and password
  const signUp = useCallback(async (credentials: SignupCredentials) => {
    try {
      setLoading(true)
      setError(null)
      const user = await AuthService.signUp(credentials)
      setUser(user)
    } catch (err) {
      const error = err as AuthError
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  // Sign in with email and password
  const signIn = useCallback(async (credentials: LoginCredentials) => {
    try {
      setLoading(true)
      setError(null)
      const user = await AuthService.signIn(credentials)
      setUser(user)
    } catch (err) {
      const error = err as AuthError
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  // Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const user = await AuthService.signInWithGoogle()
      setUser(user)
    } catch (err) {
      const error = err as AuthError
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  // Sign out
  const signOut = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      await AuthService.signOut()
      setUser(null)
    } catch (err) {
      const error = err as AuthError
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  // Reset password
  const resetPassword = useCallback(async (email: string) => {
    try {
      setLoading(true)
      setError(null)
      await AuthService.resetPassword(email)
    } catch (err) {
      const error = err as AuthError
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  // Update password
  const updatePassword = useCallback(async (newPassword: string) => {
    try {
      setLoading(true)
      setError(null)
      await AuthService.updateUserPassword(newPassword)
    } catch (err) {
      const error = err as AuthError
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  // Update profile
  const updateProfile = useCallback(
    async (updates: { displayName?: string; photoURL?: string }) => {
      try {
        setLoading(true)
        setError(null)
        await AuthService.updateUserProfile(updates)
        // Update local user state
        if (user) {
          setUser({ ...user, ...updates })
        }
      } catch (err) {
        const error = err as AuthError
        setError(error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [user]
  )

  // Resend verification email
  const resendVerificationEmail = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      await AuthService.resendVerificationEmail()
    } catch (err) {
      const error = err as AuthError
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    resendVerificationEmail,
  }
}

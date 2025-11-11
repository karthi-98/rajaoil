// Authentication Service Layer
// Following modular programming best practices - all auth operations centralized
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  updatePassword,
  deleteUser,
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase/config'
import type {
  User,
  UserProfile,
  LoginCredentials,
  SignupCredentials,
  AuthError,
} from '@/lib/types/firebase.types'

/**
 * Authentication Service Class
 * Handles all Firebase Authentication operations
 */
export class AuthService {
  /**
   * Sign up a new user with email and password
   */
  static async signUp(credentials: SignupCredentials): Promise<User> {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )

      const firebaseUser = userCredential.user

      // Update user profile with display name
      await updateProfile(firebaseUser, {
        displayName: credentials.displayName,
      })

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: credentials.displayName,
        photoURL: firebaseUser.photoURL || undefined,
        phoneNumber: firebaseUser.phoneNumber || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      await setDoc(doc(db, 'users', firebaseUser.uid), {
        ...userProfile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      // Send email verification
      await sendEmailVerification(firebaseUser)

      return this.mapFirebaseUserToUser(firebaseUser)
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Sign in with email and password
   */
  static async signIn(credentials: LoginCredentials): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )

      // Update last login time in Firestore
      await updateDoc(doc(db, 'users', userCredential.user.uid), {
        lastLoginAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      return this.mapFirebaseUserToUser(userCredential.user)
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Sign in with Google
   */
  static async signInWithGoogle(): Promise<User> {
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const firebaseUser = userCredential.user

      // Check if user profile exists, if not create one
      const userDocRef = doc(db, 'users', firebaseUser.uid)
      const userDoc = await getDoc(userDocRef)

      if (!userDoc.exists()) {
        // Create new user profile
        const userProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email!,
          displayName: firebaseUser.displayName || 'User',
          photoURL: firebaseUser.photoURL || undefined,
          phoneNumber: firebaseUser.phoneNumber || undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        await setDoc(userDocRef, {
          ...userProfile,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
      } else {
        // Update last login time
        await updateDoc(userDocRef, {
          lastLoginAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
      }

      return this.mapFirebaseUserToUser(firebaseUser)
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Sign out the current user
   */
  static async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Send password reset email
   */
  static async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Update user password
   */
  static async updateUserPassword(newPassword: string): Promise<void> {
    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error('No user is currently signed in')
      }

      await updatePassword(user, newPassword)
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(updates: {
    displayName?: string
    photoURL?: string
  }): Promise<void> {
    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error('No user is currently signed in')
      }

      // Update Firebase Auth profile
      await updateProfile(user, updates)

      // Update Firestore profile
      await updateDoc(doc(db, 'users', user.uid), {
        ...updates,
        updatedAt: serverTimestamp(),
      })
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Delete user account
   */
  static async deleteAccount(): Promise<void> {
    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error('No user is currently signed in')
      }

      // Delete user document from Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        deleted: true,
        deletedAt: serverTimestamp(),
      })

      // Delete user from Firebase Auth
      await deleteUser(user)
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Get current user
   */
  static getCurrentUser(): FirebaseUser | null {
    return auth.currentUser
  }

  /**
   * Get user profile from Firestore
   */
  static async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))

      if (!userDoc.exists()) {
        return null
      }

      const data = userDoc.data()

      return {
        uid: userDoc.id,
        email: data.email,
        displayName: data.displayName,
        photoURL: data.photoURL,
        phoneNumber: data.phoneNumber,
        address: data.address,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  /**
   * Listen to auth state changes
   */
  static onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        callback(this.mapFirebaseUserToUser(firebaseUser))
      } else {
        callback(null)
      }
    })
  }

  /**
   * Resend email verification
   */
  static async resendVerificationEmail(): Promise<void> {
    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error('No user is currently signed in')
      }

      await sendEmailVerification(user)
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Map Firebase User to our User type
   */
  private static mapFirebaseUserToUser(firebaseUser: FirebaseUser): User {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      phoneNumber: firebaseUser.phoneNumber,
      emailVerified: firebaseUser.emailVerified,
      createdAt: new Date(firebaseUser.metadata.creationTime!),
      updatedAt: new Date(firebaseUser.metadata.lastSignInTime!),
      role: 'customer', // Default role, can be updated based on Firestore data
    }
  }

  /**
   * Handle Firebase Auth errors and convert to friendly messages
   */
  private static handleAuthError(error: unknown): AuthError {
    const errorCode = (error as { code?: string }).code || 'unknown'
    let message = (error as { message?: string }).message || 'An unknown error occurred'

    // Map Firebase error codes to user-friendly messages
    switch (errorCode) {
      case 'auth/email-already-in-use':
        message = 'This email is already registered. Please sign in instead.'
        break
      case 'auth/invalid-email':
        message = 'Invalid email address.'
        break
      case 'auth/operation-not-allowed':
        message = 'Operation not allowed. Please contact support.'
        break
      case 'auth/weak-password':
        message = 'Password is too weak. Please use at least 6 characters.'
        break
      case 'auth/user-disabled':
        message = 'This account has been disabled.'
        break
      case 'auth/user-not-found':
        message = 'No account found with this email.'
        break
      case 'auth/wrong-password':
        message = 'Incorrect password.'
        break
      case 'auth/invalid-credential':
        message = 'Invalid email or password.'
        break
      case 'auth/too-many-requests':
        message = 'Too many failed attempts. Please try again later.'
        break
      case 'auth/network-request-failed':
        message = 'Network error. Please check your connection.'
        break
    }

    return {
      code: errorCode,
      message,
    }
  }
}

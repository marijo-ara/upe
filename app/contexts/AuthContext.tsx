'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export type UserRole = 'buyer' | 'seller' | 'admin';

interface AuthUser extends User {
  role?: UserRole;
}

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string, isSeller: boolean, isAdmin: boolean) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();
        setUser({ ...firebaseUser, role: userData?.role });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await setDoc(doc(db, 'users', result.user.uid), { role: 'buyer' }, { merge: true });
    } catch (error) {
      console.error('Error signing in with Google', error);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  const loginWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await setDoc(doc(db, 'users', result.user.uid), { role: 'buyer' }, { merge: true });
    } catch (error) {
      console.error('Error signing in with Facebook', error);
      setError('Failed to sign in with Facebook. Please try again.');
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in with email and password', error);
      setError('Failed to sign in with email and password. Please check your credentials and try again.');
    }
  };

  const registerWithEmail = async (email: string, password: string, isSeller: boolean, isAdmin: boolean) => {
    try {
      if (isAdmin) {
        const adminQuery = query(collection(db, 'users'), where('role', '==', 'admin'));
        const adminSnapshot = await getDocs(adminQuery);
        if (!adminSnapshot.empty) {
          throw new Error('An admin already exists. Only one admin is allowed.');
        }
      }

      const result = await createUserWithEmailAndPassword(auth, email, password);
      let role: UserRole = 'buyer';
      if (isAdmin) {
        role = 'admin';
      } else if (isSeller) {
        role = 'seller';
      }
      await setDoc(doc(db, 'users', result.user.uid), { role });
    } catch (error) {
      console.error('Error registering with email and password', error);
      setError('Failed to register. ' + (error as Error).message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
      setError('Failed to sign out. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, loginWithGoogle, loginWithFacebook, loginWithEmail, registerWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


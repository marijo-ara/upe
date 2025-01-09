import { initializeApp, getApps, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics } from 'firebase/analytics';

console.log('Firebase API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCBzFOzF0HD7rzYnOKCubNhVRbvGSfsY_o", // Hardcoded for testing
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | undefined;
let auth: Auth;
let db: Firestore;
let analytics: Analytics | undefined;

if (typeof window !== 'undefined') {
  try {
    if (!firebaseConfig.apiKey) {
      throw new Error('Firebase API key is missing. Please check your environment variables.');
    }

    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    
    if (firebaseConfig.measurementId) {
      analytics = getAnalytics(app);
    }

    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

export { app, auth, db, analytics };


import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app;
if (!getApps().length) {
  try {
    console.log(process.env.NEXT_PUBLIC_FIREBASE_APP_ID,'HELLL');
    console.log(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,'HELLL');
    app = initializeApp(firebaseConfig);
    console.log('Firebase inicializado correctamente');
  } catch (error) {
    console.error('Error al inicializar Firebase:', error);
    throw error;
  }
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

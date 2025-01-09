import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import '../styles/globals.css';
import { AuthProvider } from '../app/contexts/AuthContext';
import { app } from '../app/lib/firebase';

function MyApp({ Component, pageProps }: AppProps) {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    if (app) {
      setFirebaseInitialized(true);
    }
  }, []);

  if (!firebaseInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;


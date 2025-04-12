import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const loginGoogle = () => signInWithPopup(auth, provider);
  const loginEmail = () => signInWithEmailAndPassword(auth, 'admin@lokipaws.com', 'password123');
  const logout = () => signOut(auth);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>🐾 Loki Paws</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          {user.email === 'lokipaws.orders@gmail.com' && (
            <div style={{ color: 'green', fontWeight: 'bold' }}>Admin Mode Enabled</div>
          )}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <p>Please log in to continue.</p>
          <button onClick={loginGoogle} style={{ marginRight: 10 }}>Login with Google</button>
          <button onClick={loginEmail}>Login with Email</button>
        </>
      )}
    </div>
  );
}
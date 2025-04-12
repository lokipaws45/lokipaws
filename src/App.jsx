import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import './App.css';
import firebaseConfig from './firebase';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function App() {
  const [user, setUser] = useState(null);

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  return (
    <div>
      <h1>🐾 Loki Paws Admin Panel</h1>
      {user ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <button onClick={login}>Login with Google</button>
      )}
    </div>
  );
}
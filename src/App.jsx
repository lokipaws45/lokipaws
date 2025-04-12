import { useEffect, useState } from "react";
import { auth, provider } from "./firebase";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const loginGoogle = () => signInWithPopup(auth, provider);
  const logout = () => signOut(auth);

  if (!user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Loki Paws 🐾</h1>
        <p>Please log in to manage your store.</p>
        <button onClick={loginGoogle}>Login with Google</button>
      </div>
    );
  }

  const isAdmin = user.email === "lokipaws.orders@gmail.com";

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Loki Paws 🐾</h1>
      <p>Welcome, {user.email}</p>
      {isAdmin ? <AdminPanel /> : <p>You are not an admin.</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
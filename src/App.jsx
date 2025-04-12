import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from './firebase';

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '', price: '', stock: 'In Stock', image: null });
  const [uploading, setUploading] = useState(false);

  const adminEmails = ['lokipaws.orders@gmail.com'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser && adminEmails.includes(currentUser.email)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loginWithEmail = async () => {
    const email = prompt('Enter email');
    const password = prompt('Enter password');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      await createUserWithEmailAndPassword(auth, email, password);
    }
  };

  const logout = () => signOut(auth);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleUpload = async () => {
    setUploading(true);
    const imageRef = ref(storage, `products/${formData.image.name}`);
    await uploadBytes(imageRef, formData.image);
    const url = await getDownloadURL(imageRef);

    const productData = {
      title: formData.title,
      category: formData.category,
      price: formData.price,
      stock: formData.stock,
      imageUrl: url,
    };

    console.log('Product Uploaded:', productData); // Replace with Firestore write if needed
    setUploading(false);
    alert('Product uploaded!');
  };

  if (!user) {
    return (
      <div>
        <h1>🐾 Loki Paws</h1>
        <p>Please log in to manage your store.</p>
        <button onClick={loginWithGoogle}>Login with Google</button>
        <button onClick={loginWithEmail}>Login with Email</button>
      </div>
    );
  }

  return (
    <div>
      <h1>🐾 Loki Paws</h1>
      <p>Welcome, {user.email}</p>
      {isAdmin && (
        <div>
          <h2>Add New Product</h2>
          <input name="title" placeholder="Title" onChange={handleChange} />
          <input name="category" placeholder="Category" onChange={handleChange} />
          <input name="price" placeholder="Price" onChange={handleChange} />
          <select name="stock" onChange={handleChange}>
            <option>In Stock</option>
            <option>Out of Stock</option>
          </select>
          <input name="image" type="file" onChange={handleChange} />
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload Product'}
          </button>
        </div>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

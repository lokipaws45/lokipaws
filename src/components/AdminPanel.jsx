import { useState } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function AdminPanel() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: true,
  });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrl = "";
      if (image) {
        const storageRef = ref(storage, `products/${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "products"), {
        ...product,
        price: parseFloat(product.price),
        imageUrl,
        stock: product.stock === "true" || product.stock === true,
        createdAt: new Date()
      });

      setMessage("✅ Product added successfully!");
      setProduct({ name: "", category: "", price: "", stock: true });
      setImage(null);
    } catch (err) {
      setMessage("❌ Error adding product.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={product.name} onChange={handleChange} required /><br />
        <input name="category" placeholder="Category" value={product.category} onChange={handleChange} required /><br />
        <input name="price" type="number" placeholder="Price (MUR)" value={product.price} onChange={handleChange} required /><br />
        <select name="stock" value={product.stock} onChange={handleChange}>
          <option value={true}>In Stock</option>
          <option value={false}>Out of Stock</option>
        </select><br />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} /><br />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Add Product"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
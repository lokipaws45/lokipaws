import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('lokiProducts');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    title: '',
    category: '',
    price: '',
    quantity: '',
    status: 'In Stock',
    image: ''
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addProduct = () => {
    if (form.title && form.category && form.price && form.quantity && form.image) {
      const updated = [...products, form];
      setProducts(updated);
      localStorage.setItem('lokiProducts', JSON.stringify(updated));
      setForm({ title: '', category: '', price: '', quantity: '', status: 'In Stock', image: '' });
    }
  };

  const clearProducts = () => {
    localStorage.removeItem('lokiProducts');
    setProducts([]);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate('/')}>Back</button>
      <h2>Add Product</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} /><br />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} /><br />
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} /><br />
      <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} /><br />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>In Stock</option>
        <option>Out of Stock</option>
      </select><br />
      <input name="image" type="file" accept="image/*" onChange={handleChange} /><br /><br />
      <button onClick={addProduct}>Add Product</button>
      <button onClick={clearProducts} style={{ marginLeft: '1rem' }}>Clear All</button>

      <h2 style={{ marginTop: '2rem' }}>Current Products</h2>
      {products.map((p, i) => (
        <div key={i} style={{
          border: '1px solid #ccc',
          borderRadius: '10px',
          marginBottom: '1rem',
          padding: '1rem',
          background: '#fdfdfd'
        }}>
          <b>{p.title}</b><br />
          {p.category} — {p.price} — Qty: {p.quantity}<br />
          <img src={p.image} alt="" style={{ width: '100px', marginTop: '0.5rem', borderRadius: '8px' }} />
        </div>
      ))}
    </div>
  );
}

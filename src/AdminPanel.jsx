
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
    status: 'In Stock'
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    if (form.title && form.category && form.price) {
      const updated = [...products, form];
      setProducts(updated);
      localStorage.setItem('lokiProducts', JSON.stringify(updated));
      setForm({ title: '', category: '', price: '', status: 'In Stock' });
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
      <input name="price" placeholder="Price (e.g. MUR 900)" value={form.price} onChange={handleChange} /><br />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>In Stock</option>
        <option>Out of Stock</option>
      </select><br /><br />
      <button onClick={addProduct}>Add</button>
      <button onClick={clearProducts} style={{ marginLeft: '1rem' }}>Clear All</button>

      <h2 style={{ marginTop: '2rem' }}>Current Products</h2>
      {products.map((p, i) => (
        <div key={i} style={{ border: '1px solid #aaa', padding: '1rem', marginBottom: '1rem' }}>
          <b>{p.title}</b><br />
          {p.category}<br />
          {p.price}<br />
          {p.status}
        </div>
      ))}
    </div>
  );
}

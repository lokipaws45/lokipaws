import { useState } from 'react';
import productsData from '../products.json';

export default function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(productsData);
  const [form, setForm] = useState({ title: '', category: '', price: '', stock: 'In Stock', image: '' });

  const handleLogin = () => {
    const email = prompt('Email');
    const password = prompt('Password');
    if (email === 'admin@lokipaws.com' && password === 'meow123') {
      setUser({ email });
    } else {
      alert('Invalid credentials');
    }
  };

  const handleAdd = () => {
    const newProduct = { ...form, id: products.length + 1 };
    setProducts([...products, newProduct]);
    setForm({ title: '', category: '', price: '', stock: 'In Stock', image: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🐾 Loki Paws</h1>
      {!user ? (
        <button onClick={handleLogin}>Admin Login</button>
      ) : (
        <>
          <p>Welcome, {user.email}</p>
          <h2>Add New Product</h2>
          <input name='title' placeholder='Title' value={form.title} onChange={handleChange} /><br />
          <input name='category' placeholder='Category' value={form.category} onChange={handleChange} /><br />
          <input name='price' placeholder='Price' value={form.price} onChange={handleChange} /><br />
          <select name='stock' value={form.stock} onChange={handleChange}>
            <option>In Stock</option>
            <option>Out of Stock</option>
          </select><br />
          <input name='image' placeholder='Image URL' value={form.image} onChange={handleChange} /><br />
          <button onClick={handleAdd}>Add Product</button>
        </>
      )}
      <h2>Available Products</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {products.map(prod => (
          <div key={prod.id} style={{ border: '1px solid #ccc', padding: '10px', width: '150px' }}>
            <img src={prod.image} alt='' width='100%' />
            <h4>{prod.title}</h4>
            <p>{prod.category}</p>
            <p>MUR {prod.price}</p>
            <p>{prod.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

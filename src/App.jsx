import { Link } from 'react-router-dom';

export default function App() {
  const products = JSON.parse(localStorage.getItem('lokiProducts') || '[]');
  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem' }}>🐾 Loki Paws</h1>
        <Link to="/login"><button style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}>Admin Login</button></Link>
      </header>
      <h2 style={{ marginTop: '2rem' }}>Available Products</h2>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        {products.map((p, i) => (
          <div key={i} style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '1rem',
            width: '220px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}>
            <img src={p.image} alt={p.title} style={{ width: '100%', borderRadius: '8px' }} />
            <h3 style={{ marginTop: '0.5rem' }}>{p.title}</h3>
            <p>{p.category}</p>
            <p>MUR {p.price}</p>
            <p>Qty: {p.quantity}</p>
            <p style={{ color: p.status === 'In Stock' ? 'green' : 'red' }}>{p.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

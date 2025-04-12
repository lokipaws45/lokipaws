
import { Link } from 'react-router-dom';

export default function App() {
  const products = JSON.parse(localStorage.getItem('lokiProducts') || '[]');

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🐾 Loki Paws</h1>
      <Link to="/login"><button>Admin Login</button></Link>
      <h2>Available Products</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {products.map((p, i) => (
          <div key={i} style={{ border: '1px solid gray', padding: '1rem', width: 200 }}>
            <b>{p.title}</b><br />
            {p.category}<br />
            {p.price}<br />
            {p.status}
          </div>
        ))}
      </div>
    </div>
  );
}


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'admin@lokipaws.com' && pass === 'meow123') {
      navigate('/admin');
    } else {
      alert('Wrong credentials');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

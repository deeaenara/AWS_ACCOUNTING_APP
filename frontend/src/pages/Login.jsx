import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/auth/login', { email, password });
    login(res.data.user);
    const role = res.data.user.role;
    nav(role === 'super_admin' ? '/admin' : '/client');
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="mb-2 block w-full border p-2" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="mb-4 block w-full border p-2" />
        <button className="bg-primary text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}

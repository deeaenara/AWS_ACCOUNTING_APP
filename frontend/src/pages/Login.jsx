import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, { email, password });
    login(res.data.user);
    nav(res.data.user.role === 'super_admin' ? '/admin' : '/client');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow-lg bg-white rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" className="w-full p-2 border" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" className="w-full p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button className="bg-primary text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute role="super_admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/client" element={
            <ProtectedRoute role="client">
              <ClientDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

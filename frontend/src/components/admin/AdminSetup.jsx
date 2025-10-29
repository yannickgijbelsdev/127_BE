import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Mail, Lock } from 'lucide-react';

const AdminSetup = ({ onSetupComplete }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Wachtwoorden komen niet overeen');
      return;
    }

    if (formData.password.length < 8) {
      setError('Wachtwoord moet minimaal 8 karakters zijn');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/setup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || 'Setup mislukt');
        setLoading(false);
        return;
      }

      // Auto login after setup
      const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        localStorage.setItem('admin_token', loginData.access_token);
        localStorage.setItem('admin_user', JSON.stringify(loginData.user));
        window.dispatchEvent(new Event('auth-change'));
        onSetupComplete();
        navigate('/localhost/dashboard');
      }
    } catch (err) {
      setError('Er is iets misgegaan. Probeer opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#202124] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-[#8ab4f8] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#e8eaed]">Admin Setup</h1>
          <p className="text-[#9aa0a6] mt-2">Maak je eerste admin account aan</p>
        </div>

        <div className="bg-[#303134] rounded-lg p-8 border border-[#5f6368]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#9aa0a6] mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Gebruikersnaam
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="w-full bg-[#202124] text-[#e8eaed] px-4 py-3 rounded-lg border border-[#5f6368] focus:border-[#8ab4f8] focus:outline-none"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#9aa0a6] mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-[#202124] text-[#e8eaed] px-4 py-3 rounded-lg border border-[#5f6368] focus:border-[#8ab4f8] focus:outline-none"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#9aa0a6] mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Wachtwoord
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength="8"
                className="w-full bg-[#202124] text-[#e8eaed] px-4 py-3 rounded-lg border border-[#5f6368] focus:border-[#8ab4f8] focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#9aa0a6] mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Bevestig Wachtwoord
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                minLength="8"
                className="w-full bg-[#202124] text-[#e8eaed] px-4 py-3 rounded-lg border border-[#5f6368] focus:border-[#8ab4f8] focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#8ab4f8] hover:bg-[#aac8f9] text-[#202124] rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Account aanmaken...' : 'Admin Account Aanmaken'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;

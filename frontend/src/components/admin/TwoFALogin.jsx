import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock } from 'lucide-react';

const TwoFALogin = () => {
  const [email, setEmail] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const navigate = useNavigate();
  const codeInputRef = useRef(null);

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/2fa-setup-status`);
      const data = await response.json();
      
      if (!data.is_configured) {
        // Not configured, redirect to setup
        navigate('/admin/2fa-setup');
      } else {
        setAdminEmail(data.admin_email);
      }
    } catch (error) {
      console.error('Error checking setup status:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/2fa-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          totp_code: totpCode
        })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.access_token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        navigate('/localhost');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed');
        setTotpCode('');
        codeInputRef.current?.focus();
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#202124] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400">Gebruik je authenticator app</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#303134] rounded-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={adminEmail || "admin@127.be"}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#202124] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              {adminEmail && (
                <p className="text-xs text-gray-500 mt-1">
                  Configureerd email: {adminEmail}
                </p>
              )}
            </div>

            {/* TOTP Code Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                6-Cijferige Code
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={codeInputRef}
                  type="text"
                  value={totpCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setTotpCode(value);
                  }}
                  placeholder="123456"
                  required
                  maxLength={6}
                  className="w-full pl-10 pr-4 py-3 bg-[#202124] border border-gray-600 rounded-lg text-white text-center text-2xl tracking-widest font-mono placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Open je authenticator app en voer de code in
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || totpCode.length !== 6}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium text-white transition-colors"
            >
              {loading ? 'Inloggen...' : 'Inloggen'}
            </button>
          </form>

          {/* Setup Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/admin/2fa-setup')}
              className="text-sm text-gray-400 hover:text-gray-300 underline"
            >
              2FA opnieuw instellen
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Code verandert elke 30 seconden</p>
          <p className="mt-1">Zorg dat je telefoon de juiste tijd heeft</p>
        </div>
      </div>
    </div>
  );
};

export default TwoFALogin;

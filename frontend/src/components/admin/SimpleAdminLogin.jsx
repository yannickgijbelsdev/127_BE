import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

const SimpleAdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    alert('Login functie aangeroepen!');
    
    setError('');
    setLoading(true);

    // Trim spaces
    const cleanEmail = email.trim().toLowerCase();
    
    alert(`Email: ${cleanEmail}`);
    
    // For now: just check email, accept any password for testing
    if (cleanEmail === 'yannick@radiogroep.be') {
      alert('Email correct! Token wordt gezet...');
      
      // Create a simple token
      const token = btoa(JSON.stringify({
        email: cleanEmail,
        role: 'admin',
        timestamp: Date.now()
      }));
      
      // Use correct localStorage key that App.js expects!
      localStorage.setItem('admin_token', token);
      localStorage.setItem('adminUser', JSON.stringify({
        id: 'admin',
        email: cleanEmail,
        username: 'Yannick',
        role: 'admin'
      }));
      
      alert('Token gezet! Redirecting naar /autosoft');
      
      // Force full page reload to /autosoft
      setTimeout(() => {
        window.location.href = '/autosoft';
      }, 100);
    } else {
      alert(`Email NIET correct: ${cleanEmail}`);
      setError(`Email moet yannick@radiogroep.be zijn (je hebt ingevuld: ${cleanEmail})`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#202124] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="https://customer-assets.emergentagent.com/job_tool-metrics/artifacts/w5126i9x_127_2025_Official_Logo.png"
            alt="127 Logo"
            className="w-24 h-24 mx-auto mb-4 filter brightness-110 hover:brightness-125 transition-all"
          />
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400">127 | Yannick Tools</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#303134] rounded-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
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
                  placeholder="yannick@radiogroep.be"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#202124] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Wachtwoord
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#202124] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium text-white transition-colors"
            >
              {loading ? 'Inloggen...' : 'Inloggen'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SimpleAdminLogin;

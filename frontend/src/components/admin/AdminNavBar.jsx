import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';

const AdminNavBar = () => {
  const [user, setUser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on mount and when storage changes
    const checkAuth = () => {
      const userData = localStorage.getItem('admin_user');
      const token = localStorage.getItem('admin_token');
      
      if (userData && token) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsVisible(true);
        } catch (err) {
          console.error('Failed to parse user data:', err);
          setIsVisible(false);
        }
      } else {
        setUser(null);
        setIsVisible(false);
      }
    };

    checkAuth();

    // Listen for storage changes (for multi-tab sync)
    window.addEventListener('storage', checkAuth);
    
    // Custom event for same-tab updates
    window.addEventListener('auth-change', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setUser(null);
    // Force reload to update app state
    window.location.href = '/localhost';
  };

  const handleDashboard = () => {
    navigate('/localhost/dashboard');
  };

  const getInitials = (username) => {
    if (!username) return 'AD';
    return username.substring(0, 2).toUpperCase();
  };

  // Don't render if not logged in
  if (!user || !isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-[100]">
      <div className="flex items-center gap-3 bg-[#303134] px-4 py-3 rounded-lg border-2 border-[#8ab4f8] shadow-2xl backdrop-blur-sm">
        <div className="w-10 h-10 bg-[#8ab4f8] rounded-full flex items-center justify-center text-[#202124] font-bold text-sm">
          {getInitials(user.username)}
        </div>
        <span className="text-[#e8eaed] font-semibold text-sm">{user.username}</span>
        
        <button
          onClick={handleDashboard}
          className="p-2 bg-[#5f6368] hover:bg-[#7a8086] rounded-lg transition-colors ml-2"
          title="Dashboard"
        >
          <Settings className="w-5 h-5 text-[#e8eaed]" />
        </button>
        
        <button
          onClick={handleLogout}
          className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          title="Uitloggen"
        >
          <LogOut className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default AdminNavBar;

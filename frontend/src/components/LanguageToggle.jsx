import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = ({ hideOnFullscreen = false }) => {
  const { language, toggleLanguage } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (hideOnFullscreen) {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.addEventListener('mozfullscreenchange', handleFullscreenChange);
      document.addEventListener('msfullscreenchange', handleFullscreenChange);

      return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
        document.removeEventListener('msfullscreenchange', handleFullscreenChange);
      };
    }
  }, [hideOnFullscreen]);

  // Hide if fullscreen is active
  if (hideOnFullscreen && isFullscreen) {
    return null;
  }

  return (
    <div className="fixed top-8 right-8 z-50">
      <button
        onClick={toggleLanguage}
        className="px-4 py-2 rounded-full font-medium transition-all text-sm"
        style={{
          background: 'rgba(150, 180, 255, 0.25)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(150, 180, 255, 0.15)',
          color: '#cfe1ff'
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(150, 180, 255, 0.35)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(150, 180, 255, 0.25)'}
      >
        {language === 'nl' ? 'English' : 'Nederlands'}
      </button>
    </div>
  );
};

export default LanguageToggle;

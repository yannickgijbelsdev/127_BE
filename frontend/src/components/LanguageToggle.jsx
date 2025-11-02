import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

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

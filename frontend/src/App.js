import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PixelTest from './components/PixelTest';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dpd" replace />} />
          <Route path="/dpd" element={<PixelTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
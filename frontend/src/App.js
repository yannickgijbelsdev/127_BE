import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PixelTest from './components/PixelTest';
import PrinterTest from './components/PrinterTest';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dpd" element={<PixelTest />} />
          <Route path="/printer" element={<PrinterTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
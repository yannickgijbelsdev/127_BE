import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PixelTest from './components/PixelTest';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PixelTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import LeafletMap from './components/LeafletMap';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live" element={<LeafletMap />} />
        <Route path="/collection" />
        <Route path="/advInfo" />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;

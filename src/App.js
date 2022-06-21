import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LeafletMap from './components/LeafletMap';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LeafletMap />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;

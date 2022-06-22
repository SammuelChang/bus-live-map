import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import Header from './components/Header';
import Home from './pages/Home';
// import Sidebar from './components/Sidebar';
import Live from './pages/Live';
import Collection from './pages/Collection';
import LeafletMap from './components/LeafletMap';
import LiveRoute from './pages/LiveRoute';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live" element={<Live />} />
        <Route path="/live/route" element={<LiveRoute />} />
        <Route path="/live/city" element={<LeafletMap />} />
        <Route path="/live/accessibility" element={<LeafletMap />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/advInfo" />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;

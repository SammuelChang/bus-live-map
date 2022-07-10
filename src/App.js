import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ParallaxProvider } from 'react-scroll-parallax';
import { lightTheme, darkTheme } from './theme';
import GlobalStyle from './globalStyles';
import Header from './components/Header';
import Home from './pages/Home';
import Live from './pages/Live';
import Collection from './pages/Collection';
import LiveRoute from './pages/LiveRoute';
import LiveCity from './pages/LiveCity';
import LiveNearbyPath from './pages/LiveNearbyPath';
import NoMatch from './pages/NoMatch';
// import InBusTrack from './pages/InBusTrack';

function App() {
  const [theme, setTheme] = useState('light');
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      setIsDark(true);
    } else {
      setTheme('light');
      setIsDark(false);
    }
  };

  return (
    <Router>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <ParallaxProvider>
          <GlobalStyle />
          <Header toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/live" element={<Live />} />
            <Route path="/live/route" element={<LiveRoute isDark={isDark} />} />
            <Route path="/live/city" element={<LiveCity isDark={isDark} />} />
            <Route path="/live/nearbyPath" element={<LiveNearbyPath isDark={isDark} />} />
            <Route path="/collection" element={<Collection />} />
            {/* <Route path="/in-bus-track" element={<InBusTrack />} /> */}
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </ParallaxProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

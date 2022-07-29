import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ParallaxProvider } from 'react-scroll-parallax';
import { lightTheme, darkTheme } from './theme';
import GlobalStyle from './globalStyles';
import Header from './components/Header';
import Home from './pages/Home';
import Collection from './pages/Collection';
import LiveRoute from './pages/LiveRoute';
import LiveCity from './pages/LiveCity';
import LiveNearbyPath from './pages/LiveNearbyPath';
import NoMatch from './pages/NoMatch';
import InBusTrack from './pages/InBusTrack';
import api from './utils/api';
import TokenContext from './components/Context';

function App() {
  const [theme, setTheme] = useState('light');
  const [isDark, setIsDark] = useState(false);

  const tokenCheck = useCallback(() => {
    const tokenChecking = async () => {
      const localToken = JSON.parse(localStorage.getItem('stopToken'));
      if (localToken && new Date().getTime() < localToken.expireDateMs) {
        return localToken.token;
      }

      const token = await api.getToken();
      const expireDateMs = new Date().getTime() + 86000000;
      const tokenObj = { token, expireDateMs };
      localStorage.setItem('stopToken', JSON.stringify(tokenObj));
      return tokenObj.token;
    };

    return tokenChecking();
  }, []);

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
      <TokenContext.Provider value={tokenCheck}>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <ParallaxProvider>
            <GlobalStyle />
            <Header toggleTheme={toggleTheme} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/live/route" element={<LiveRoute isDark={isDark} />} />
              <Route path="/live/city" element={<LiveCity isDark={isDark} />} />
              <Route path="/live/nearbyPath" element={<LiveNearbyPath isDark={isDark} />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/in-bus-track" element={<InBusTrack />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </ParallaxProvider>
        </ThemeProvider>
      </TokenContext.Provider>
    </Router>
  );
}

export default App;

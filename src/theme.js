import menuImg from './images/menu.png';
import menuDarkImg from './images/menu-dark.png';
import busLight from './images/bus-light.png';
import busDark from './images/bus-dark.png';
import mapScreenLight from './images/map-feature-light.png';
import mapScreenDark from './images/map-feature-dark.png';
import sun from './images/sun.png';
import moon from './images/moon.png';
import search from './images/search.png';
import searchDark from './images/search-dark.png';
import heartLight from './images/heart-light.png';
import heartDark from './images/heart-dark.png';
import nearbyBusLight from './images/nearby-bus-light.png';
import nearbyBusDark from './images/nearby-bus-dark.png';
import nearbyStopLight from './images/nearby-stop-light.png';
import nearbyStopDark from './images/nearby-stop-dark.png';

export const lightTheme = {
  text: 'light',
  icon: busLight,
  mapScreen: mapScreenLight,
  fontWeight: 'normal',
  menu: menuImg,
  background: 'white',
  headerColor: '#878484', // 淺灰
  headerHoverColor: 'black',
  color: 'black',
  themeToggleIcon: moon,
  themeToggleBg: '#363537', // 淺灰
  themeToggleSz: '20px 20px',
  border: 'gray',
  search,
  heart: heartLight,
  nearbyBus: nearbyBusLight,
  nearbyStop: nearbyStopLight,
};

export const darkTheme = {
  text: 'dark',
  icon: busDark,
  mapScreen: mapScreenDark,
  fontWeight: 'bold',
  menu: menuDarkImg,
  background: '#363537', // 淺黑
  headerColor: 'white',
  headerHoverColor: 'white',
  color: 'white',
  themeToggleIcon: sun,
  themeToggleBg: 'white',
  themeToggleSz: '30px 30px',
  border: 'white',
  search: searchDark,
  heart: heartDark,
  nearbyBus: nearbyBusDark,
  nearbyStop: nearbyStopDark,
};

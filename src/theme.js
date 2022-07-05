import menuImg from './images/menu.png';
import menuDarkImg from './images/menu-dark.png';
import busLight from './images/bus-light.png';
import busDark from './images/bus-dark.png';
// import arrowLight from './images/arrow-light.png';
// import arrowDark from './images/arrow-dark.png';
import mapScreenLight from './images/map-feature-light.png';
import mapScreenDark from './images/map-feature-dark.png';
import sun from './images/sun.png';
import moon from './images/moon.png';

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
};

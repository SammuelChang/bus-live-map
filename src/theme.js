import menuImg from './images/menu.png';
import menuDarkImg from './images/menu-dark.png';
import busLight from './images/bus-light.png';
import busDark from './images/bus-dark.png';
import arrowLight from './images/arrow-light.png';
import arrowDark from './images/arrow-dark.png';
import mapScreenLight from './images/map-feature-light.png';
import mapScreenDark from './images/map-feature-dark.png';

export const lightTheme = {
  text: 'light',
  icon: busLight,
  arrow: arrowLight,
  mapScreen: mapScreenLight,
  fontWeight: 'normal',
  menu: menuImg,
  background: 'white',
  headerColor: '#878484', // 淺灰
  headerHoverColor: 'black',
  color: 'black',
  toggleBorder: '#878484', // 淺灰
  toggleBackground: 'linear-gradient(180deg, white, white 49%, white 49%, #878484 51%, #878484)',
  map: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  mapOpacity: '0.7',
};

export const darkTheme = {
  text: 'dark',
  icon: busDark,
  arrow: arrowDark,
  mapScreen: mapScreenDark,
  fontWeight: 'bold',
  menu: menuDarkImg,
  background: '#363537', // 淺黑
  headerColor: 'white',
  headerHoverColor: 'white',
  color: 'white',
  toggleBorder: 'white',
  toggleBackground: 'linear-gradient(0deg, white, white 49%, white 49%, #878484 51%, #878484)',
  map: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
  mapOpacity: '1',
};

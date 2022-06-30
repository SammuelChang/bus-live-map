import menuImg from './images/menu.png';
import menuDarkImg from './images/menu-dark.png';

export const lightTheme = {
  text: 'light',
  fontWeight: 'normal',
  menu: menuImg,
  background: '#FFF',
  headerColor: '#878484',
  headerHoverColor: '#000',
  color: 'black',
  toggleBorder: '#878484',
  toggleBackground: 'linear-gradient(180deg, #fff, #fff 49%, white 49%, #878484 51%, #878484)',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
  map: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  mapOpacity: '0.7',
};

export const darkTheme = {
  text: 'dark',
  fontWeight: 'bold',
  menu: menuDarkImg,
  background: '#363537',
  headerColor: '#fff',
  headerHoverColor: '#fff',
  color: '#fff',
  toggleBorder: '#fff',
  toggleBackground: 'linear-gradient(0deg, #fff, #fff 49%, white 49%, #878484 51%, #878484)',
  gradient: 'linear-gradient(#091236, #1E215D)',
  map: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
  mapOpacity: '1',
};

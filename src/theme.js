import menuImg from './images/menu.png';
import menuDarkImg from './images/menu-dark.png';

export const lightTheme = {
  text: 'light',
  menu: menuImg,
  background: '#FFF',
  color: '#878484',
  hoverColor: 'black',
  toggleBorder: '#878484',
  toggleBackground: 'linear-gradient(180deg, #fff, #fff 49%, white 49%, #878484 51%, #878484)',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
};

export const darkTheme = {
  text: 'dark',
  menu: menuDarkImg,
  background: '#363537',
  color: '#fff',
  hoverColor: '#fff',
  toggleBorder: '#fff',
  toggleBackground: 'linear-gradient(0deg, #fff, #fff 49%, white 49%, #878484 51%, #878484)',
  gradient: 'linear-gradient(#091236, #1E215D)',
};

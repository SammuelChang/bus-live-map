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
import featureRouteLight from './images/featureRouteLight.png';
import featureRouteDark from './images/featureRouteDark.png';
import featureCollectionLight from './images/featureCollectionLight.png';
import featureCollectionDark from './images/featureCollectionDark.png';
import featureCityLight from './images/featureCityLight.png';
import featureCityDark from './images/featureCityDark.png';
import featureNearbyLight from './images/featureNearbyLight.png';
import featureNearbyDark from './images/featureNearbyDark.png';
import backTopLight from './images/backTopLight.png';
import backTopDark from './images/backTopDark.png';
import dropDownLight from './images/dropDownLight.png';
import dropDownDark from './images/dropDownDark.png';

export const lightTheme = {
  main: 'white',
  primary: 'black',
  secondary: '#878484', // 淺灰
  third: '#bcb8b1',
  text: 'light',
  icon: busLight,
  mapScreen: mapScreenLight,
  fontWeight: 'normal',
  menu: menuImg,
  background: 'white',
  adjBackground: '#edede9',
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
  featureRoute: featureRouteLight,
  featureCollection: featureCollectionLight,
  featureCity: featureCityLight,
  featureNearby: featureNearbyLight,
  backToTop: backTopLight,
  dropDown: dropDownLight,
};

export const darkTheme = {
  main: 'black',
  primary: 'white',
  secondary: '#363537', // 淺黑
  third: '#6c757d',
  text: 'dark',
  icon: busDark,
  mapScreen: mapScreenDark,
  fontWeight: 'bold',
  menu: menuDarkImg,
  adjBackground: '#495057',
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
  featureRoute: featureRouteDark,
  featureCollection: featureCollectionDark,
  featureCity: featureCityDark,
  featureNearby: featureNearbyDark,
  backToTop: backTopDark,
  dropDown: dropDownDark,
};

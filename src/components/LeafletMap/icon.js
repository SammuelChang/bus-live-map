import L from 'leaflet';

export const icon = {
  arrowIcon: L.icon({
    iconUrl: 'https://www.svgrepo.com/show/97377/right-arrow-in-circular-button.svg',
    iconSize: [20, 20],
    shadowSize: [0, 0],
    iconAnchor: [12.5, 12.5],
  }),
  bus: L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/MTS_Bus_icon.svg',
    iconRetinaUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/MTS_Bus_icon.svg',
    iconSize: [25, 25],
    shadowSize: [0, 0],
    iconAnchor: [12.5, 12.5],
  }),
  stationIcon: L.icon({
    iconUrl: 'https://www.svgrepo.com/show/312735/orange-circle.svg',
    iconSize: [10, 10],
    shadowSize: [0, 0],
    iconAnchor: [5, 5],
  }),

  stationIcon2: L.icon({
    iconUrl: 'https://www.svgrepo.com/show/312735/orange-circle.svg',
    iconSize: [20, 20],
    shadowSize: [0, 0],
    iconAnchor: [10, 10],
  }),
};

export default icon;

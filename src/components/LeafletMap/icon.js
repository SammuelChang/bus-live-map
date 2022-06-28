import L from 'leaflet';
import busMarker from '../../images/bus-marker.png';
import busStopNormal from '../../images/bus-stop-empty.png';
import busStopRed from '../../images/bus-stop-red.png';

export const icon = {
  bus: L.icon({
    iconUrl: busMarker,
    iconRetinaUrl: busMarker,
    iconSize: [25, 25],
    shadowSize: [0, 0],
    iconAnchor: [12.5, 12.5],
  }),
  busStopNormal4x: L.icon({
    iconUrl: busStopNormal,
    iconRetinaUrl: busStopNormal,
    iconSize: [60, 60],
    shadowSize: [0, 0],
    // iconAnchor: [0, 50],
  }),
  busStopRed4x: L.icon({
    iconUrl: busStopRed,
    iconRetinaUrl: busStopRed,
    iconSize: [60, 60],
    shadowSize: [0, 0],
    // iconAnchor: [60, 60],
  }),
  busStopNormal2x: L.icon({
    iconUrl: busStopNormal,
    iconRetinaUrl: busStopNormal,
    iconSize: [40, 40],
    shadowSize: [0, 0],
    // iconAnchor: [10, 30],
  }),
  busStopRed2x: L.icon({
    iconUrl: busStopRed,
    iconRetinaUrl: busStopRed,
    iconSize: [40, 40],
    shadowSize: [0, 0],
    // iconAnchor: [10, 30],
  }),
  stationIcon: L.icon({
    iconUrl: busStopNormal,
    iconSize: [20, 20],
    shadowSize: [0, 0],
    iconAnchor: [10, 20],
  }),

  stationIcon2: L.icon({
    iconUrl: busStopNormal,
    iconSize: [30, 30],
    shadowSize: [0, 0],
    iconAnchor: [15, 30],
  }),
};

export default icon;

import L from 'leaflet';
// import busMarker from '../../images/bus-marker.png';
import bus from '../../images/bus.png';
import busStopNormal from '../../images/bus-stop-empty.png';
import busStopRed from '../../images/bus-stop-red.png';

export const icon = {
  bus: L.icon({
    iconUrl: bus,
    iconRetinaUrl: bus,
    iconSize: [40, 40],
    shadowSize: [0, 0],
    iconAnchor: [20, 40],
  }),
  busStopNormal4x: L.icon({
    iconUrl: busStopNormal,
    iconRetinaUrl: busStopNormal,
    iconSize: [20, 30],
    shadowSize: [0, 0],
    // iconAnchor: [0, 50],
  }),
  busStopRed4x: L.icon({
    iconUrl: busStopRed,
    iconRetinaUrl: busStopRed,
    iconSize: [20, 30],
    shadowSize: [0, 0],
    // iconAnchor: [60, 60],
  }),
  busStopNormal2x: L.icon({
    iconUrl: busStopNormal,
    iconRetinaUrl: busStopNormal,
    iconSize: [15, 20],
    shadowSize: [0, 0],
    // iconAnchor: [10, 30],
  }),
  busStopRed2x: L.icon({
    iconUrl: busStopRed,
    iconRetinaUrl: busStopRed,
    iconSize: [15, 20],
    shadowSize: [0, 0],
    // iconAnchor: [10, 30],
  }),
};

export default icon;

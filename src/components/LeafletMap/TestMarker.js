import PropTypes from 'prop-types';
import {
  Marker, Tooltip,
} from 'react-leaflet';
import { icon } from './icon';

export default function TestMarker({ testInterval }) {
  const marker1Path = [
    { key: 'marker1-point1', position: [25.049637, 121.525986] },
    { key: 'marker1-point2', position: [25.042661, 121.529571] },
    { key: 'marker1-point3', position: [25.041804, 121.535370] },
    { key: 'marker1-point4', position: [25.041501, 121.540014] },
    { key: 'marker1-point5', position: [25.041298, 121.543249] },
    { key: 'marker1-point6', position: [25.041374, 121.546986] },
    { key: 'marker1-point7', position: [25.041804, 121.550222] },
    { key: 'marker1-point8', position: [25.041185, 121.553527] },
    { key: 'marker1-point9', position: [25.041185, 121.556874] },
    { key: 'marker1-point10', position: [25.041008, 121.561253] },
  ];

  return (
    <Marker
      key={marker1Path[testInterval].key}
      position={marker1Path[testInterval].position}
      icon={icon.bus}
    >
      <Tooltip permanent offset={[10, 0]}>
        UI測試使用
      </Tooltip>
    </Marker>
  );
}

TestMarker.propTypes = {
  testInterval: PropTypes.number.isRequired,
};

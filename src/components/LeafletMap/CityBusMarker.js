import { Tooltip, Circle } from 'react-leaflet';
import valueRecode from './valueRecode';

export default function BusMarker({ tdxBus }) {
  const redOptions = { color: '#e63946', fillColor: '#e63946' };
  const greenOptions = { color: '#2a9d8f', fillColor: '#2a9d8f' };
  const yellowOptions = { color: '#e9c46a', fillColor: '#e9c46a' };
  const grayOptions = { color: '#8d99ae', fillColor: '#8d99ae' };

  function dotSet(item) {
    if (item.BusStatus !== 0) {
      return grayOptions;
    }
    if (item.Speed > 40) {
      return redOptions;
    }
    if (item.Speed === 0) {
      return yellowOptions;
    }
    if (item.Speed >= 0) {
      return greenOptions;
    }
    return null;
  }

  return tdxBus.map((i) => (
    <Circle
      key={`${i.PlateNumb}`}
      center={[i.BusPosition.PositionLat, i.BusPosition.PositionLon]}
      pathOptions={dotSet(i)}
      fillOpacity={1}
      weight={5}
      radius={50}
      zIndexOffset={100}
    >
      <Tooltip>
        <h1 style={{ textAlign: 'center' }}>{i.RouteName.Zh_tw}</h1>
        時速：
        {i.Speed}
        <br />
        車況：
        {valueRecode('BusStatus', i.BusStatus)}
      </Tooltip>
    </Circle>
  ));
}

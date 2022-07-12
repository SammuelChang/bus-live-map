import { Marker, Tooltip } from 'react-leaflet';
import { icon } from './icon';
import valueRecode from './valueRecode';

export default function BusMarker({ tdxBus, direction }) {
  return tdxBus
    .filter((f) => f.Direction === direction)
    .map((i) => (
      <Marker
        icon={icon.bus}
        key={`${i.PlateNumb}`}
        position={[i.BusPosition.PositionLat, i.BusPosition.PositionLon]}
        zIndexOffset={100}
      >
        <Tooltip>
          <h1 style={{ textAlign: 'center' }}>{i.RouteName.Zh_tw}</h1>
          <p style={{ textAlign: 'center' }}>{i.PlateNumb}</p>
          時速：
          {i.Speed}
          <br />
          車況：
          {valueRecode('BusStatus', i.BusStatus)}
        </Tooltip>
      </Marker>
    ));
}

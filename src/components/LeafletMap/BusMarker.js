import {
  Marker, Tooltip,
} from 'react-leaflet';
import { icon } from './icon';
import valueRecode from './valueRecode';

export default function BusMarker({ tdxRealTime }) {
  return (
    tdxRealTime.map((i) => (
      <Marker
        icon={icon.bus}
        key={`${i.PlateNumb}-${i.UpdateTime}`}
        position={[i.BusPosition.PositionLat, i.BusPosition.PositionLon]}
        zIndexOffset={1000000}
      >
        <Tooltip>
          <h1 style={{ textAlign: 'center' }}>
            {i.RouteName.Zh_tw}
          </h1>
          <h4 style={{ textAlign: 'center' }}>
            {
              i.Direction === 0
                ? i.SubRouteName.Zh_tw.substring(i.SubRouteName.Zh_tw.search('往'), i.SubRouteName.Zh_tw.length)
                : `往${i.SubRouteName.Zh_tw.substring(0, i.SubRouteName.Zh_tw.search('往')).replace(i.RouteName.Zh_tw, '')}`
              }

          </h4>
          路線：
          {i.SubRouteName.Zh_tw
            .replace(i.RouteName.Zh_tw, '')
            .replace('往', ' - ')}
          <br />
          時速：
          {i.Speed}
          <br />
          車況：
          {valueRecode('BusStatus', i.BusStatus)}
        </Tooltip>
      </Marker>
    ))
  );
}

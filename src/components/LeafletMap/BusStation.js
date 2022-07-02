import { Marker, Tooltip } from 'react-leaflet';
import { icon } from './icon';

function iconSelector(zoom, estimate) {
  if (zoom >= 15 && estimate <= 120) {
    return icon.busStopRed4x;
  }
  if (zoom < 15 && estimate <= 120) {
    return icon.busStopRed2x;
  }
  if (zoom >= 15) {
    return icon.busStopNormal4x;
  }
  if (zoom < 15) {
    return icon.busStopNormal2x;
  }
  return icon.busStopNormal2x;
}

export default function BusStation({ mergeStation, direction, zoomLevel }) {
  return Object.values(mergeStation)
    .filter((f) => f.Direction === direction)
    .map((stop) => (
      <Marker
        key={`${stop.RouteUID}-${stop.SubRouteUID}-${stop.StopUID}-${stop.Direction}}`}
        position={[stop.StopPosition.PositionLat, stop.StopPosition.PositionLon]}
        // icon={zoomLevel >= 15 ? icon.stationIcon2 : icon.stationIcon}
        icon={iconSelector(zoomLevel, stop.EstimateTime)}
        zIndexOffset={0}
      >
        <Tooltip key={`${stop.StopUID}-${stop.RouteUID}-${stop.EstimateTime}`}>
          <div
            style={{
              textAlign: 'center',
              padding: '0',
              margin: '0',
              background: stop.EstimateTime < 60 ? '#f28482' : 'none',
            }}
          >
            <h3>{stop.StopName.Zh_tw}</h3>
            {stop.EstimateTime < 60 && <p>進站中</p>}
            {stop.EstimateTime >= 60 && stop.EstimateTime < 120 && <p>將到站</p>}
            {stop.EstimateTime >= 120 && <p>{`約${Math.floor(stop.EstimateTime / 60)}分後抵達`}</p>}
            {stop.EstimateTime === null && <p>null</p>}
          </div>
        </Tooltip>
      </Marker>
    ));
}

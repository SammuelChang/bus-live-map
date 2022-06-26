import { Marker, Tooltip } from 'react-leaflet';
import { icon } from './icon';

export default function BusStation({ mergeStation, zoomLevel }) {
  return Object.values(mergeStation).map((stop) => (
    <Marker
      key={`${stop.RouteUID}-${stop.SubRouteUID}-${stop.StopUID}-${stop.Direction}}`}
      position={[stop.StopPosition.PositionLat, stop.StopPosition.PositionLon]}
      icon={zoomLevel >= 15 ? icon.stationIcon2 : icon.stationIcon}
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
          {stop.EstimateTime < 30 && <p>來不及了</p>}
          {stop.EstimateTime >= 30 && stop.EstimateTime < 60 && <p>即將抵達</p>}
          {stop.EstimateTime >= 60 && <p>{`約${Math.floor(stop.EstimateTime / 60)}分後抵達`}</p>}
          {stop.EstimateTime === null && <p>null</p>}
        </div>
      </Tooltip>
    </Marker>
  ));
}

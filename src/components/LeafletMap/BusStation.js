import {
  Marker, Tooltip,
} from 'react-leaflet';
import { icon } from './icon';

export default function BusStation({ tdxRouteStation, tdxRouteStationTime, zoomLevel }) {
  return (
    tdxRouteStation.map((route) => (
      route.Stops.map((stop) => (
        <Marker
          key={`${route.RouteUID}-${route.SubRouteUID}-${stop.StopName.Zh_tw}}`}
          position={[stop.StopPosition.PositionLat, stop.StopPosition.PositionLon]}
          icon={zoomLevel >= 15 ? icon.stationIcon2 : icon.stationIcon}
        >
          {tdxRouteStationTime.map((i) => (
            i.StopUID === stop.StopUID && i.RouteUID === route.RouteUID
            && (
            <Tooltip key={`${i.StopUID}-${i.RouteUID}-${i.EstimateTime}`}>
              <div style={{
                textAlign: 'center',
                padding: '0',
                margin: '0',
                background: i.EstimateTime < 60 ? '#f28482' : 'none',
              }}
              >
                <h3>{stop.StopName.Zh_tw}</h3>
                {i.EstimateTime < 60 && <p>即將抵達</p>}
                {i.EstimateTime >= 60 && <p>{`約${Math.floor(i.EstimateTime / 60)}分後抵達`}</p>}
                {i.EstimateTime === null && <p>null</p>}
              </div>
            </Tooltip>
            )
          ))}
        </Marker>
      )))));
}

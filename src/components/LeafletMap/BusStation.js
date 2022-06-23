import { Marker, Tooltip } from 'react-leaflet';
import { icon } from './icon';

export default function BusStation({ mergeStation, zoomLevel }) {
  console.log('BusStation Component');

  // const stopMap = {};
  // tdxRouteStation[0].Stops.forEach((stop) => {
  //   stopMap[stop.StopUID] = stop;
  //   stopMap[stop.StopUID].RouteUID = stop.RouteUID;
  // });

  // const routeMerge = tdxRouteStation.reduce((acc, cur) => {
  //   const newAcc = { ...acc };
  //   cur.Stops.forEach((stop) => {
  //     if (stop in newAcc) return;
  //     newAcc[stop.StopUID] = stop;
  //     newAcc[stop.StopUID].RouteUID = cur.RouteUID;
  //     newAcc[stop.StopUID].SubRouteUID = cur.SubRouteUID;
  //     newAcc[stop.StopUID].Direction = cur.Direction;
  //   });
  //   return newAcc;
  // }, {});

  // tdxRouteStationTime.forEach((time) => {
  //   if (routeMerge[time.StopUID]) {
  //     routeMerge[time.StopUID].EstimateTime = time.EstimateTime;
  //   }
  // });

  // useEffect(() => {
  // console.log(Object.values(routeMerge).length);
  // console.log(tdxRouteStation);
  // console.log(routeMerge);
  // }, [routeMerge.length]);

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

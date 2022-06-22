import {
  Popup, GeoJSON,
} from 'react-leaflet';

export default function BusShape({ tdxShape }) {
  return (
    tdxShape.map((i) => (
      <GeoJSON
        key={`${i.RouteUID}_${i.SubRouteUID}_${Date.now()}`}
        data={i.Geojson}
        style={{ color: '#6c757d' }}
      >
        <Popup>
          <h1>{i.RouteName.Zh_tw}</h1>
        </Popup>
      </GeoJSON>
    ))
  );
}

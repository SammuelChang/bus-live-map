import { useState } from 'react';
import { parse } from 'wellknown';
import {
  MapContainer, TileLayer, Marker, Popup, GeoJSON,
} from 'react-leaflet';
import L from 'leaflet';
import api from '../../utils/api';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap() {
  const [location] = useState([25.049637, 121.525986]);
  const [zoom] = useState(13);
  const [tdxShape, setTdxShape] = useState([]);

  async function getShapeFn() {
    const t = await api.getToken();
    const s = await api.getShpae('Taipei', t);
    const n = s.map((obj) => ({ ...obj, Geojson: parse(obj.Geometry) }));
    setTdxShape(n);
  }

  // delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/MTS_Bus_icon.svg',
    iconRetinaUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/MTS_Bus_icon.svg',
    shadowSize: [0, 0],
  });

  return (
    <MapContainer center={location} zoom={zoom} scrollWheelZoom style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
      <button
        type="button"
        onClick={() => getShapeFn()}
        style={{
          width: '100vw', height: '50px', background: 'red', color: 'black', fontSize: '2rem', opacity: 1,
        }}
      >
        getShapeFn
      </button>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        opacity="0.5"
      />
      {tdxShape
      && tdxShape.map((i) => (
        <GeoJSON
          key={`${i.RouteUID}_${i.SubRouteUID}` || 'nothingNow'}
          data={i.Geojson}
        />
      ))}
      <Marker position={[25.049637, 121.525986]}>
        <Popup>
          抱歉佔一下位置
          <br />
          {' '}
          我怕晚點忘記怎麼寫
        </Popup>
      </Marker>
    </MapContainer>
  );
}

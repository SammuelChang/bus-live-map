/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */
import { useState } from 'react';
import { parse } from 'wellknown';
import {
  MapContainer, TileLayer, Marker, Popup, GeoJSON,
} from 'react-leaflet';
import api from '../../utils/api';
import 'leaflet/dist/leaflet.css';

const L = require('leaflet');

export default function LeafletMap() {
  const [zoom] = useState(13);
  const [tdxShape, setTdxShape] = useState([]);
  const [convertShape, setConvertShape] = useState([]);

  function setRoute() {
    api.getToken()
      .then((token) => api.getShpae('Taipei', token))
      .then((r) => { setTdxShape(r); });
  }

  function reformatGeometry() {
    const newtdxShape = tdxShape.map((obj) => ({ ...obj, Geojson: parse(obj.Geometry) }));
    setConvertShape(newtdxShape);
  }

  async function fetchOnce() {
    await setRoute();
    await reformatGeometry();
    console.log(convertShape.map((i) => i));
    console.log(convertShape.map((i) => i.Geojson));
  }

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/MTS_Bus_icon.svg',
    iconRetinaUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/MTS_Bus_icon.svg',
    shadowSize: [0, 0],
  });

  return (
    <MapContainer center={[25.049637, 121.525986]} zoom={zoom} scrollWheelZoom style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
      <button
        type="button"
        onClick={() => fetchOnce()}
        style={{
          width: '100vw', height: '50px', background: 'red', color: 'black', fontSize: '2rem',
        }}
      >
        get data
      </button>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        opacity="0.5"
      />
      {convertShape
      && convertShape.map((i) => (
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

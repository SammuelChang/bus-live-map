/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { parse } from 'wellknown';
import {
  MapContainer, TileLayer, Marker, Popup, Tooltip, GeoJSON,
} from 'react-leaflet';
import L from 'leaflet';
import ReactLeafletDriftMarker from 'react-leaflet-drift-marker';
import api from '../../utils/api';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap() {
  const [location] = useState([25.049637, 121.525986]);
  const [zoom] = useState(13);
  const [tdxShape, setTdxShape] = useState([]);
  const [tdxRealTime, setTdxRealTime] = useState([]);
  const [timer, setTimer] = useState(5);

  async function getShapeFn() {
    const t = await api.getToken();
    const s = await api.getShpae('Taipei', t);
    const n = s.map((obj) => ({ ...obj, Geojson: parse(obj.Geometry) }));
    setTdxShape(n);
  }

  async function getBusFn() {
    const t = await api.getToken();
    const s = await api.getRealTimeByFrequency('Taipei', t);
    setTdxRealTime(s);
    console.log(s[0].UpdateTime);
    console.log(s.find((i) => i.RouteName.Zh_tw === '652') || s[0]);
  }

  function countDownHandler() {
    const interval = setInterval(() => {
      setTimer((t) => (t === 0 ? 5 : t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }

  function valueRecode(column, value) {
    switch (true) {
      case ((column === 'BusStatus') && (value === 0)): return '正常';
      case ((column === 'BusStatus') && (value === 1)): return '車禍';
      case ((column === 'BusStatus') && (value === 2)): return '故障';
      case ((column === 'BusStatus') && (value === 3)): return '塞車';
      case ((column === 'BusStatus') && (value === 4)): return '緊急求援';
      case ((column === 'BusStatus') && (value === 5)): return '加油';
      case ((column === 'BusStatus') && (value === 98)): return '偏移路線';
      case ((column === 'BusStatus') && (value === 99)): return '非營運狀態';
      case ((column === 'BusStatus') && (value === 100)): return '客滿';
      case ((column === 'BusStatus') && (value === 101)): return '包車出租';
      case ((column === 'BusStatus') && (value === 255)): return '未知';
      case ((column === 'Direction') && (value === 0)): return '去程';
      case ((column === 'Direction') && (value === 1)): return '返程';
      case ((column === 'Direction') && (value === 2)): return '迴圈';
      default: return 'error';
    }
  }

  useEffect(() => {
    if (timer === 0) {
      getBusFn();
    }
  }, [timer]);

  L.Icon.Default.mergeOptions({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/MTS_Bus_icon.svg',
    iconRetinaUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/MTS_Bus_icon.svg',
    // shadowUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Simpleicons_Places_map-marker-6.svg',
    iconSize: [25, 25],
    shadowSize: [0, 0],
    // iconAnchor: [20, 20],
    // shadowAnchor: [-7.5, -7.5],
    // popupAnchor: [-3, -76],
  });

  return (
    <MapContainer center={location} zoom={zoom} scrollWheelZoom style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
      <button
        type="button"
        onClick={() => getShapeFn()}
        style={{
          width: '50vw', height: '50px', background: 'red', color: 'black', fontSize: '2rem', opacity: 1,
        }}
      >
        getShapeFn
      </button>
      <button
        type="button"
        onClick={() => countDownHandler()}
        style={{
          width: '50vw', height: '50px', background: 'blue', color: 'black', fontSize: '2rem', opacity: 1,
        }}
      >
        getPositionFn(
        {timer}
        )
      </button>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        opacity="0.5"
      />
      {tdxShape[0]
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
      {tdxRealTime[0]
      && tdxRealTime.map((i) => (
        <ReactLeafletDriftMarker
          key={`${i.PlateNumb}-${i.UpdateTime}`}
          position={[i.BusPosition.PositionLat, i.BusPosition.PositionLon]}
        >
          <Tooltip>
            <h1 style={{ textAlign: 'center' }}>{i.RouteName.Zh_tw}</h1>
            <br />
            附屬路線：
            {i.SubRouteName.Zh_tw}
            <br />
            行駛方向：
            {valueRecode('Direction', i.Direction)}
            <br />
            行駛速度：
            {i.Speed}
            <br />
            車輛狀態：
            {valueRecode('BusStatus', i.BusStatus)}
            <br />
            方位角：
            {i.Azimuth}
          </Tooltip>
        </ReactLeafletDriftMarker>
      ))}
    </MapContainer>
  );
}

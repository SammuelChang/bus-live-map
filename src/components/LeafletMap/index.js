/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { parse } from 'wellknown';
import {
  MapContainer, TileLayer, Marker, Popup, Tooltip, GeoJSON, useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import api from '../../utils/api';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap() {
  const [location] = useState([25.049637, 121.525986]);
  const [zoomLevel, setZoomLevel] = useState(13);
  const [tdxShape, setTdxShape] = useState([]);
  const [tdxRealTime, setTdxRealTime] = useState([]);
  const [tdxStation, setTdxStation] = useState([]);
  const [timer, setTimer] = useState(5);
  const [testInterval, setTestInterval] = useState(0);

  function ZoomListener() {
    const mapEvents = useMapEvents({
      zoomend: () => {
        setZoomLevel(mapEvents.getZoom());
      },
    });
    console.log(zoomLevel);
    return null;
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

  async function getAllShapeFn() {
    const t = await api.getToken();
    const s = await api.getAllShpae('Taipei', t);
    const n = s.map((obj) => ({ ...obj, Geojson: parse(obj.Geometry) }));
    setTdxShape(n);
  }

  async function getAllBusFn() {
    const t = await api.getToken();
    const s = await api.getAllRealTimeByFrequency('Taipei', t);
    setTdxRealTime(s);
  }

  async function getAllStationFn() {
    const t = await api.getToken();
    const s = await api.getAllStation('Taipei', t);
    setTdxStation(s);
  }

  // async function getSingleBusFn() {
  //   const t = await api.getToken();
  //   const s = await api.getSingleRealTimeByFrequency('Taipei', '307', t);
  //   setTdxRealTime(s);
  // }

  function countDownHandler() {
    const interval = setInterval(() => {
      setTimer((t) => (t === 0 ? 5 : t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }

  useEffect(() => {
    if (timer === 0) {
      getAllBusFn();
    }
  }, [timer]);

  L.Icon.Default.mergeOptions({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/MTS_Bus_icon.svg',
    iconRetinaUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/MTS_Bus_icon.svg',
    // shadowUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Simpleicons_Places_map-marker-6.svg',
    iconSize: [25, 25],
    shadowSize: [0, 0],
    iconAnchor: [12.5, 12.5],
    // shadowAnchor: [-7.5, -7.5],
    // popupAnchor: [-3, -76],
  });

  const stationIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Circle-icons-dev.svg',
    iconSize: [20, 20], // size of the icon
    shadowSize: [0, 0], // size of the shadow
    iconAnchor: [12.5, 12.5],
  });

  const marker1Path = [
    { key: 'marker1-point1', position: [25.049637, 121.525986] },
    { key: 'marker1-point2', position: [25.042661, 121.529571] },
    { key: 'marker1-point3', position: [25.041804, 121.535370] },
    { key: 'marker1-point4', position: [25.041501, 121.540014] },
    { key: 'marker1-point5', position: [25.041298, 121.543249] },
    { key: 'marker1-point6', position: [25.041374, 121.546986] },
    { key: 'marker1-point7', position: [25.041804, 121.550222] },
    { key: 'marker1-point8', position: [25.041185, 121.553527] },
    { key: 'marker1-point9', position: [25.041185, 121.556874] },
    { key: 'marker1-point10', position: [25.041008, 121.561253] },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTestInterval((t) => (t >= 9 ? 0 : t + 1));
    }, 5000);
    return () => clearInterval(intervalId);
  }, [testInterval]);

  function StationComponent() {
    const station = tdxStation.map((i) => ({
      StationUID: i.StationUID,
      PositionLat: i.StationPosition.PositionLat,
      PositionLon: i.StationPosition.PositionLon,
      StationName: i.StationName.Zh_tw,
      Route: i.Stops.map((s) => (s.RouteName)).sort((a, b) => b - a),
    }));

    return (station.map((i) => (
      <Marker
        key={i.StationUID}
        position={[i.PositionLat, i.PositionLon]}
        icon={stationIcon}
      >
        <Popup>
          <h1 style={{ textAlign: 'center' }}>{i.StationName}</h1>
          <br />
          <div style={{
            display: 'flex', flexWrap: 'wrap', height: '200px', flexDirection: 'column', flexBasis: '20px', justifyContent: 'flex-start', alignItems: 'flex-start',
          }}
          >
            {i.Route.map((bus) => <div key={`${i.StationUID}-${bus.Zh_tw}`}>{bus.Zh_tw}</div>)}
          </div>
        </Popup>
        <Tooltip>
          <h5 style={{
            textAlign: 'center', height: '10px', padding: '0', margin: '0', background: 'none',
          }}
          >
            {i.StationName}
          </h5>
        </Tooltip>
      </Marker>
    )));
  }

  return (
    <MapContainer
      center={location}
      zoom={zoomLevel}
      scrollWheelZoom
      style={{ height: 'calc(100vh - 100px)', width: '100%' }}
    >
      <button
        type="button"
        onClick={() => getAllShapeFn()}
        style={{
          width: '33.3vw', height: '50px', background: 'red', color: 'black', fontSize: '2rem', opacity: 1,
        }}
      >
        getAllShapeFn
      </button>
      <button
        type="button"
        onClick={() => countDownHandler()}
        style={{
          width: '33.3vw', height: '50px', background: 'blue', color: 'white', fontSize: '2rem', opacity: 1,
        }}
      >
        getPositionFn(
        {timer}
        )
      </button>
      <button
        type="button"
        onClick={() => getAllStationFn()}
        style={{
          width: '33.3vw', height: '50px', background: 'black', color: 'white', fontSize: '2rem', opacity: 1,
        }}
      >
        getStationFn
      </button>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        opacity="0.5"
      />
      {tdxShape[0] !== undefined
      && tdxShape.map((i) => (
        <GeoJSON
          key={`${i.RouteUID}_${i.SubRouteUID}` || 'nothingNow'}
          data={i.Geojson}
        />
      ))}
      <Marker
        key={marker1Path[testInterval].key}
        position={marker1Path[testInterval].position}
      >
        <Popup>
          抱歉佔一下位置
          <br />
          {' '}
          我怕晚點忘記怎麼寫
        </Popup>
      </Marker>
      {tdxRealTime !== undefined
      && tdxRealTime.map((i) => (
        <Marker
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
        </Marker>
      ))}
      {tdxStation !== undefined
      && <StationComponent />}
      <ZoomListener />
    </MapContainer>
  );
}

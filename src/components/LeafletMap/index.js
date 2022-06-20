/* eslint-disable no-unused-vars */
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
  const [tdxRouteStation, setTdxRouteStation] = useState([]);
  const [tdxRouteStationTime, setTdxRouteStationTime] = useState([]);
  const [bus] = useState(307);
  const [timer, setTimer] = useState(5);
  const [testInterval, setTestInterval] = useState(0);

  function ZoomListener() {
    const mapEvents = useMapEvents({
      zoomend: () => {
        setZoomLevel(mapEvents.getZoom());
      },
    });
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
    if (tdxShape.length) { return; }
    const token = await api.getToken();
    const shape = await api.getAllShpae('Taipei', token, bus);
    const geoShape = shape.map((obj) => ({ ...obj, Geojson: parse(obj.Geometry) }));
    setTdxShape(geoShape);
  }

  async function getAllBusFn() {
    const token = await api.getToken();
    const busWithTime = await api.getAllRealTimeByFrequency('Taipei', token, bus);
    setTdxRealTime(busWithTime);
  }

  async function getRouteStation() {
    const token = await api.getToken();
    const routeWithTime = await api.getAllStationEstimatedTimeOfArrival('Taipei', token, bus);
    setTdxRouteStationTime(routeWithTime);

    if (tdxRouteStation.length) { return; }
    const route = await api.getAllStationStopOfRoute('Taipei', token, bus);
    setTdxRouteStation(route);
  }

  function countDownHandler() {
    const interval = setInterval(() => {
      setTimer((t) => (t === 0 ? 5 : t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }

  useEffect(() => {
    if (timer === 0) {
      getAllBusFn();
      getRouteStation();
    }
  }, [timer]);

  L.Icon.Default.mergeOptions({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/MTS_Bus_icon.svg',
    iconRetinaUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/MTS_Bus_icon.svg',
    iconSize: [25, 25],
    shadowSize: [0, 0],
    iconAnchor: [12.5, 12.5],
  });

  const arrowIcon = L.icon({
    iconUrl: 'https://www.svgrepo.com/show/97377/right-arrow-in-circular-button.svg',
    iconSize: [20, 20],
    shadowSize: [0, 0],
    iconAnchor: [12.5, 12.5],
  });

  const stationIcon = L.icon({
    iconUrl: 'https://www.svgrepo.com/show/312735/orange-circle.svg',
    iconSize: [10, 10],
    shadowSize: [0, 0],
    iconAnchor: [5, 5],
  });

  const stationIcon2 = L.icon({
    iconUrl: 'https://www.svgrepo.com/show/312735/orange-circle.svg',
    iconSize: [20, 20],
    shadowSize: [0, 0],
    iconAnchor: [10, 10],
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
    return (
      tdxRouteStation.map((route) => (
        route.Stops.map((stop) => (
          <Marker
            key={`${route.RouteUID}-${route.SubRouteUID}-${stop.StopName.Zh_tw}}`}
            position={[stop.StopPosition.PositionLat, stop.StopPosition.PositionLon]}
            icon={zoomLevel >= 15 ? stationIcon2 : stationIcon}
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

  return (
    <>
      <div>
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
            width: '66.6vw', height: '50px', background: 'blue', color: 'white', fontSize: '2rem', opacity: 1,
          }}
        >
          getBus&StationFn(
          {timer}
          )
        </button>
      </div>
      <MapContainer
        center={location}
        zoom={zoomLevel}
        scrollWheelZoom
        style={{ height: 'calc(100vh - 100px - 50px)', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          opacity={0.7}
        />
        {tdxShape[0] !== undefined
        && tdxShape.map((i) => (
          <GeoJSON
            key={`${i.RouteUID}_${i.SubRouteUID}` || 'nothingNow'}
            data={i.Geojson}
            style={{ color: '#6c757d' }}
          >
            <Popup>
              <h1>{i.RouteName.Zh_tw}</h1>
            </Popup>
          </GeoJSON>
        ))}
        <Marker
          key={marker1Path[testInterval].key}
          position={marker1Path[testInterval].position}
          icon={arrowIcon}
        >
          <Popup>
            抱歉佔一下位置
            <br />
            我怕晚點忘記怎麼寫
          </Popup>
        </Marker>
        {tdxRealTime !== undefined
      && tdxRealTime.map((i) => (
        <Marker
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
      ))}
        {tdxRouteStation !== undefined
      && <StationComponent />}
        <ZoomListener />
      </MapContainer>
    </>
  );
}

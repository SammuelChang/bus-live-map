/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { parse } from 'wellknown';
import {
  MapContainer, TileLayer, useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import BusStation from './BusStation';
import BusMarker from './BusMarker';
import Shape from './BusShape';
import TestMarker from './TestMarker';
import TestButton from './TestButton';
import api from '../../utils/api';

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTestInterval((t) => (t >= 9 ? 0 : t + 1));
    }, 5000);
    return () => clearInterval(intervalId);
  }, [testInterval]);

  return (
    <>
      <TestButton
        getAllShapeFn={() => getAllShapeFn()}
        countDownHandler={() => countDownHandler()}
        timer={timer}
      />
      <MapContainer
        center={location}
        zoom={zoomLevel}
        scrollWheelZoom
        style={{ height: 'calc(100vh - 100px - 50px)', width: '100%' }}
      >
        {tdxShape.length && <Shape tdxShape={tdxShape} />}
        {tdxRealTime !== undefined && <BusMarker tdxRealTime={tdxRealTime} />}
        {tdxRouteStation !== undefined && <BusStation tdxRouteStation={tdxRouteStation} tdxRouteStationTime={tdxRouteStationTime} zoomLevel={zoomLevel} />}
        <TestMarker testInterval={testInterval} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          opacity={0.7}
        />
        <ZoomListener />
      </MapContainer>
    </>
  );
}

/* eslint-disable no-unused-vars */
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
  const [tdxNearby, setTdxNearby] = useState([]);
  const [userPattern, setUserPattern] = useState('');
  const [timer, setTimer] = useState(10);
  const [testInterval, setTestInterval] = useState(0);

  function ZoomListener() {
    const mapEvents = useMapEvents({
      zoomend: () => {
        setZoomLevel(mapEvents.getZoom());
      },
    });
    return null;
  }

  async function getShapeFn(token, bus) {
    if (tdxShape.length) { return; }
    const shape = await api.getAllShape('Taipei', token, bus);
    const geoShape = shape.map((obj) => ({ ...obj, Geojson: parse(obj.Geometry) }));
    setTdxShape(geoShape);
  }

  async function getBusFn(token, bus = '') {
    const busWithTime = await api.getAllRealTimeByFrequency('Taipei', token, bus);
    setTdxRealTime(busWithTime);
  }

  async function getRouteStation(token, bus = '') {
    const routeWithTime = await api.getAllStationEstimatedTimeOfArrival('Taipei', token, bus);
    setTdxRouteStationTime(routeWithTime);
  }

  async function getRouteStationTime(token, bus = '') {
    if (tdxRouteStation.length) { return; }
    const route = await api.getAllStationStopOfRoute('Taipei', token, bus);
    setTdxRouteStation(route);
  }

  function countDownHandler() {
    const interval = setInterval(() => {
      setTimer((t) => (t === 0 ? 10 : t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }

  async function assignRouteHandler(bus) {
    setUserPattern('assignRoute');
    countDownHandler();
    const token = await api.getToken();
    getShapeFn(token, bus);
    getBusFn(token, bus);
    getRouteStation(token, bus);
    getRouteStationTime(token, bus);
  }

  async function allBusHandler() {
    setUserPattern('allBus');
    countDownHandler();
    const token = await api.getToken();
    getBusFn(token);
  }

  async function getNearby(lon = 121.483497, lat = 25.062249) {
    const token = await api.getToken();
    const nearbyStops = await api.getNearbyStops('Taipei', token, lon, lat);
    const query = nearbyStops.features.map((i) => `Stops/any(d:d/StationID eq '${i.properties.model.StationID}')`).join(' or ');
    const nearby = await api.getAllStationStopOfRoute('Taipei', token, '', query);
    nearby.forEach((e) => {
      console.log(e.RouteName.Zh_tw);
    });
    // setTdxNearby(nearbyStops.features);
  }

  useEffect(() => {
    if (timer === 0) {
      if (userPattern === 'assignRoute') {
        assignRouteHandler();
      }

      if (userPattern === 'allBus') {
        allBusHandler();
      }
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
        assignRouteHandler={() => assignRouteHandler(307)}
        allBusHandler={() => allBusHandler()}
        getNearby={() => getNearby()}
        timer={timer}
      />
      <MapContainer
        center={location}
        zoom={zoomLevel}
        scrollWheelZoom
        style={{ height: 'calc(100vh - 100px - 50px)', width: '100%' }}
      >
        {tdxShape.length && <Shape tdxShape={tdxShape} />}
        {tdxRealTime.length && <BusMarker tdxRealTime={tdxRealTime} />}
        {tdxRouteStation.length
          && (
          <BusStation
            tdxRouteStation={tdxRouteStation}
            tdxRouteStationTime={tdxRouteStationTime}
            zoomLevel={zoomLevel}
          />
          )}
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

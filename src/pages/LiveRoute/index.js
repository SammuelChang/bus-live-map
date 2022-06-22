/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { parse } from 'wellknown';
import {
  MapContainer, TileLayer, useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import BusStation from '../../components/LeafletMap/BusStation';
import BusMarker from '../../components/LeafletMap/BusMarker';
import Shape from '../../components/LeafletMap/BusShape';
import TestMarker from '../../components/LeafletMap/TestMarker';
import TestButton from '../../components/LeafletMap/TestButton';
import api from '../../utils/api';
import Sidebar from '../../components/Sidebar';

const Wrapper = styled.div`
    display: flex;
  `;

export default function LeafletMap() {
  const busRef = useRef('');
  const [keyinRoute, setKeyinRoute] = useState('');
  const [location] = useState([25.049637, 121.525986]);
  const [zoomLevel, setZoomLevel] = useState(13);
  const [tdxShape, setTdxShape] = useState([]);
  const [tdxRealTime, setTdxRealTime] = useState([]);
  const [tdxRouteStation, setTdxRouteStation] = useState([]);
  const [tdxRouteStationTime, setTdxRouteStationTime] = useState([]);
  const [routeTimer, setRouteTimer] = useState(1000);
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
    // if (tdxShape.length) { setTdxShape([]); }
    setTdxShape([]);
    const shape = await api.getAllShape('Taipei', token, bus);
    const geoShape = shape.map((obj) => ({ ...obj, Geojson: parse(obj.Geometry) }));
    setTdxShape(geoShape);
  }

  async function getBusFn(token, bus = '') {
    const busWithTime = await api.getAllRealTimeByFrequency('Taipei', token, bus);
    setTdxRealTime(busWithTime);
  }

  async function getRouteStationFn(token, bus = '') {
    const routeWithTime = await api.getAllStationEstimatedTimeOfArrival('Taipei', token, bus);
    setTdxRouteStationTime(routeWithTime);
  }

  async function getRouteStationTimeFn(token, bus = '') {
    if (tdxRouteStation.length) { setTdxRouteStation([]); }
    const route = await api.getAllStationStopOfRoute('Taipei', token, bus);
    setTdxRouteStation(route);
  }

  function countDownHandler() {
    const interval = setInterval(() => {
      setRouteTimer((t) => (t === 0 ? routeTimer : t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }

  async function assignRouteHandler(bus) {
    console.log('call api');
    countDownHandler();
    const token = await api.getToken();
    getShapeFn(token, bus);
    getBusFn(token, bus);
    getRouteStationFn(token, bus);
    getRouteStationTimeFn(token, bus);
  }

  useEffect(() => {
    // if (routeTimer === 1000) {
    assignRouteHandler(keyinRoute || '299');
    console.log(keyinRoute);
    // }
  }, [keyinRoute]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTestInterval((t) => (t >= 9 ? 0 : t + 1));
    }, 5000);
    return () => clearInterval(intervalId);
  }, [testInterval]);

  useEffect(() => {
    if (busRef.current?.value.length <= 1) { return; }
    setKeyinRoute(busRef.current?.value);
  }, [busRef.current?.value]);

  return (
    <Wrapper>
      <Sidebar busRef={busRef} />
      <MapContainer
        center={location}
        zoom={zoomLevel}
        minZoom={12}
        maxZoom={16}
        scrollWheelZoom
        style={{ height: 'calc(100vh - 120px)', width: '100%' }}
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
    </Wrapper>
  );
}

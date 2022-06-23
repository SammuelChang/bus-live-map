/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import {
  useEffect, useState, useRef, memo,
} from 'react';
import styled from 'styled-components';
import { parse } from 'wellknown';
import {
  MapContainer, TileLayer, useMapEvents, FeatureGroup,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import BusStation from '../../components/LeafletMap/BusStation';
import BusMarker from '../../components/LeafletMap/BusMarker';
import Shape from '../../components/LeafletMap/BusShape';
import TestMarker from '../../components/LeafletMap/TestMarker';
import api from '../../utils/api';
import Sidebar from '../../components/Sidebar';

const Wrapper = styled.div`
  display: flex;
`;

const MemoMapContainer = memo(MapContainer);

export default function LeafletMap() {
  console.log('LeafletMap Component');

  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState(null);
  const [bounds, setBounds] = useState(null);
  const featureGroupRef = useRef();
  const [location] = useState([25.049637, 121.525986]);
  const [zoomLevel, setZoomLevel] = useState(13);
  const [tdxShape, setTdxShape] = useState([]);
  const [tdxRealTime, setTdxRealTime] = useState([]);
  const [tdxRouteStation, setTdxRouteStation] = useState([]);
  const [tdxRouteStationTime, setTdxRouteStationTime] = useState([]);
  const [mergeStation, setMergeStation] = useState([]);
  const [routeTimer, setRouteTimer] = useState(10);
  const [testInterval, setTestInterval] = useState(0);

  useEffect(() => {
    if (featureGroupRef.current) {
      featureGroupRef.current.clearLayers();
    }
  }, []);

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
    // setTdxShape([]);
    const shape = await api.getAllShape('Taipei', token, bus);
    const geoShape = await shape
      .map((obj) => ({ ...obj, Geojson: parse(obj.Geometry) }))
      .filter((a) => a.RouteName.Zh_tw === bus);
    return geoShape;
  }

  async function getBusFn(token, bus = '') {
    const busWithTime = await api.getAllRealTimeByFrequency('Taipei', token, bus);
    const filterBusWithTime = await busWithTime.filter((a) => a.RouteName.Zh_tw === bus);
    return filterBusWithTime;
  }

  async function getRouteStationTimeFn(token, bus = '') {
    const routeWithTime = await api.getAllStationEstimatedTimeOfArrival('Taipei', token, bus);
    const filterRouteWithTime = await routeWithTime.filter((a) => a.RouteName.Zh_tw === bus);
    return filterRouteWithTime;
  }

  async function getRouteStationFn(token, bus = '') {
    const route = await api.getAllStationStopOfRoute('Taipei', token, bus);
    const filterRoute = route.filter((a) => a.RouteName.Zh_tw === bus);
    return filterRoute;
  }

  function mergeStationHandler(s, t) {
    console.log('mergeStationHandler');

    const routeMerge = s.reduce((acc, cur) => {
      // const newAcc = { ...acc };
      cur.Stops.forEach((stop) => {
        if (stop in acc) return;
        acc[stop.StopUID] = stop;
        acc[stop.StopUID].RouteUID = cur.RouteUID;
        acc[stop.StopUID].SubRouteUID = cur.SubRouteUID;
        acc[stop.StopUID].Direction = cur.Direction;
        acc[stop.StopUID].StopSequence = stop.StopSequence;
      });
      return acc;
    }, {});

    t.forEach((time) => {
      if (routeMerge[time.StopUID]) {
        routeMerge[time.StopUID].EstimateTime = time.EstimateTime;
      }
    });

    // console.log('routeMerge', routeMerge);
    // console.log(s);
    // const first = Object.values(routeMerge)[0].StopPosition;
    // const last = Object.values(routeMerge)[Object.values(routeMerge).length].StopPosition;
    // setBounds([first.PositionLat, middle.PositionLon]);
    setMergeStation(routeMerge);
    return routeMerge;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (routeTimer === 0) {
        setRouteTimer(10);
      } else {
        setRouteTimer((t) => t - 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (map) {
      map.flyTo(bounds);
    }
  }, [bounds]);

  function removeLayer() {
    if (map && !loading) {
      featureGroupRef.current?.clearLayers();
      console.log('clearLayers');
    }
  }

  async function assignRouteHandler(bus) {
    if (loading) {
      return;
    }
    removeLayer();
    setLoading(true);
    // countDownHandler();
    const token = await api.getToken();
    const shapeData = await getShapeFn(token, bus);
    setTdxShape(shapeData);
    const busData = await getBusFn(token, bus);
    setTdxRealTime(busData);
    const routeData = await getRouteStationFn(token, bus);
    setTdxRouteStation(routeData);
    const routeTimeData = await getRouteStationTimeFn(token, bus); // cosnt var = await get()
    setTdxRouteStationTime(routeTimeData);

    const data = mergeStationHandler(routeData, routeTimeData);
    console.log(data);
    setLoading(false);
  }

  function searchRoute(route) {
    assignRouteHandler(route || '299');
  }

  // useEffect(() => {
  //   if (routeTimerRef === 1000) {
  //     assignRouteHandler(busRef.current?.value || '299');
  //   }
  // }, [routeTimerRef.current]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setTestInterval((t) => (t >= 9 ? 0 : t + 1));
  //   }, 5000);
  //   return () => clearInterval(intervalId);
  // }, [testInterval]);

  return (
    <Wrapper>
      <Sidebar searchRoute={searchRoute} />
      <MemoMapContainer
        center={location}
        zoom={zoomLevel}
        minZoom={12}
        maxZoom={16}
        scrollWheelZoom
        style={{ height: 'calc(100vh - 120px)', width: '100%' }}
        ref={setMap}
      >
        <FeatureGroup ref={featureGroupRef}>
          {tdxShape.length && <Shape tdxShape={tdxShape} />}
          {tdxRealTime.length && <BusMarker tdxRealTime={tdxRealTime} />}
          {tdxRouteStation.length && (
            <BusStation mergeStation={mergeStation} zoomLevel={zoomLevel} />
          )}
        </FeatureGroup>
        <TestMarker testInterval={testInterval} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          opacity={0.7}
        />
        <ZoomListener />
      </MemoMapContainer>
    </Wrapper>
  );
}

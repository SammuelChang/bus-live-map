import {
  useEffect, useState, useRef, memo,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { parse } from 'wellknown';
import {
  MapContainer, TileLayer, useMapEvents, FeatureGroup, useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import BusStation from '../../components/LeafletMap/BusStation';
import BusMarker from '../../components/LeafletMap/BusMarker';
import BusShape from '../../components/LeafletMap/BusShape';
import Sidebar from '../../components/Sidebar';
import api from '../../utils/api';
import RouteSearch from '../../components/Sidebar/RouteSearch';
// import LoadingEffect from '../../components/LoadingEffect';

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const MemoMapContainer = memo(MapContainer);
const StyledMemoMapContainer = styled(MemoMapContainer)`
  visibility: ${(props) => (props.loading ? 'hidden' : 'visible')};
  animation: blur-in 0.4s linear both;
  @keyframes blur-in {
    0% {
      filter: blur(12px);
      opacity: 0;
    }
    100% {
      filter: blur(0);
      opacity: 1;
    }
  }
`;

export default function LiveRoute({ isDark }) {
  const lightMap = `https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${process.env.REACT_APP_STADIA_API_KEY}`;
  const darkMap = `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${process.env.REACT_APP_STADIA_API_KEY}`;
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);
  const featureGroupRef = useRef();
  const [location] = useState([25.049637, 121.525986]);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [tdxShape, setTdxShape] = useState([]);
  const [tdxBus, setTdxBus] = useState([]);
  const [tdxBusInfo, setTdxBusInfo] = useState([]);
  const [mergeStation, setMergeStation] = useState([]);
  const [routeTimer, setRouteTimer] = useState(10);
  const [displayBus, setDisplayBus] = useState('');
  const [direction, setDirection] = useState(0);
  const [bunds, setBunds] = useState([]);
  const preBusInfo = useRef(null);
  const [wrongInput, setWrongInput] = useState(false);

  function SetBoundsComponent() {
    if (bunds.length && preBusInfo.current[0]?.RouteName.Zh_tw !== tdxBusInfo[0]?.RouteName.Zh_tw) {
      const map = useMap();
      map.fitBounds(bunds);
      map.setView(map.getCenter(), 10);
    }
    return null;
  }

  function ZoomListener() {
    const mapEvents = useMapEvents({
      zoomend: () => {
        setZoomLevel(mapEvents.getZoom());
      },
    });
    return null;
  }

  async function getInfoFn(token, bus) {
    const info = await api.getRouteInfo('Taipei', token, bus);
    const filterInfo = await info.filter((a) => a.RouteName.Zh_tw === bus);
    return filterInfo;
  }

  async function getShapeFn(token, bus) {
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

  async function getRouteStationFn(token, bus = '') {
    const route = await api.getAllStationStopOfRoute('Taipei', token, bus);
    const filterRoute = route.filter((a) => a.RouteName.Zh_tw === bus);
    return filterRoute;
  }
  async function getRouteStationTimeFn(token, bus = '') {
    const routeWithTime = await api.getAllStationEstimatedTimeOfArrival('Taipei', token, bus);
    const filterRouteWithTime = await routeWithTime.filter((a) => a.RouteName.Zh_tw === bus);
    return filterRouteWithTime;
  }

  function mergeStationHandler(s, t, i) {
    const routeInfo = s.flatMap((route) => i.flatMap((info) => ({
      ...route,
      DepartureStopNameZh: info.DepartureStopNameZh,
      DestinationStopNameZh: info.DestinationStopNameZh,
    })));

    const routeMerge = routeInfo.reduce((acc, cur) => {
      cur.Stops.forEach((stop) => {
        if (stop in acc) return;
        acc[stop.StopUID] = stop;
        acc[stop.StopUID].RouteUID = cur.RouteUID;
        acc[stop.StopUID].SubRouteUID = cur.SubRouteUID;
        acc[stop.StopUID].Direction = cur.Direction;
        acc[stop.StopUID].DepartureStopNameZh = cur.DepartureStopNameZh;
        acc[stop.StopUID].DestinationStopNameZh = cur.DestinationStopNameZh;
        acc[stop.StopUID].StopSequence = stop.StopSequence;
      });
      return acc;
    }, {});

    t.forEach((time) => {
      if (routeMerge[time.StopUID]) {
        routeMerge[time.StopUID].EstimateTime = time.EstimateTime;
        routeMerge[time.StopUID].UpdateTime = time.UpdateTime;
      }
    });

    return routeMerge;
  }

  async function assignRouteHandler(bus) {
    if (loading) {
      return;
    }
    setLoading(true);
    const token = await api.getToken();
    const info = await getInfoFn(token, bus);

    setTdxBusInfo(info);

    if (!info.length) {
      setLoading(false);
      setWrongInput(true);
      setTdxShape([]);
      setTdxBus([]);
      setMergeStation([]);
      featureGroupRef.current?.clearLayers();
      return;
    }

    const shapeData = await getShapeFn(token, bus);
    setTdxShape(shapeData);

    const busData = await getBusFn(token, bus);
    setTdxBus(busData);

    const routeData = await getRouteStationFn(token, bus);
    const routeTimeData = await getRouteStationTimeFn(token, bus);
    const data = await mergeStationHandler(routeData, routeTimeData, info);
    setMergeStation(data);

    const resultRoute = [];
    Object.values(data).forEach((i) => {
      resultRoute.push([i.StopPosition.PositionLat, i.StopPosition.PositionLon]);
    });
    setBunds(resultRoute);

    setLoading(false);
    setWrongInput(false);
  }

  function searchRoute(route) {
    assignRouteHandler(route);
  }

  useEffect(() => {
    // 初次渲染時設定計時器
    const interval = setInterval(() => {
      setRouteTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 根據計時狀況與是否輸入路線，重置計時器並呼叫api
    if (routeTimer < 0) {
      setRouteTimer(10);
    }
    if (displayBus.length > 0 && routeTimer === 10) {
      assignRouteHandler(displayBus);
    }
  }, [routeTimer, displayBus]);

  useEffect(() => {
    setRouteTimer(10);
  }, [displayBus]);

  useEffect(() => {
    preBusInfo.current = tdxBusInfo;
  }, [tdxBusInfo]);

  return (
    <Wrapper>
      <Sidebar>
        <RouteSearch
          displayBus={displayBus}
          setDisplayBus={setDisplayBus}
          searchRoute={() => searchRoute}
          mergeStation={Object.values(mergeStation)}
          direction={direction}
          setDirection={setDirection}
          wrongInput={wrongInput}
          loading={loading}
        />
      </Sidebar>
      <StyledMemoMapContainer
        center={mapRef.current ? null : location}
        zoom={mapRef.current ? null : zoomLevel}
        bounds={mapRef.current ? bunds : null}
        minZoom={12}
        maxZoom={15}
        scrollWheelZoom
        style={{ height: 'calc(100vh - 120px)', width: '100%' }}
        ref={mapRef}
        loading={loading}
      >
        <FeatureGroup ref={featureGroupRef}>
          {tdxShape && <BusShape tdxShape={tdxShape} direction={direction} />}
          {tdxBus && <BusMarker tdxBus={tdxBus} direction={direction} />}
          {mergeStation && zoomLevel >= 14 && (
            <BusStation mergeStation={mergeStation} zoomLevel={zoomLevel} direction={direction} />
          )}
        </FeatureGroup>
        {!isDark && (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={lightMap}
          />
        )}
        {isDark && (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={darkMap}
          />
        )}
        <ZoomListener />
        <SetBoundsComponent />
      </StyledMemoMapContainer>
      {/* {loading && <LoadingEffect />} */}
    </Wrapper>
  );
}

LiveRoute.propTypes = {
  isDark: PropTypes.bool.isRequired,
};

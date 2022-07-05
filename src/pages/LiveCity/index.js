/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import {
  useEffect, useState, useRef, memo,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { parse } from 'wellknown';
import {
  MapContainer, TileLayer, useMapEvents, FeatureGroup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import BusStation from '../../components/LeafletMap/BusStation';
import BusMarker from '../../components/LeafletMap/BusMarker';
import BusShape from '../../components/LeafletMap/BusShape';
import Sidebar from '../../components/Sidebar';
import api from '../../utils/api';
import CityBusState from '../../components/Sidebar/CityBusStats';
import LoadingEffect from '../../components/LoadingEffect';

const Wrapper = styled.div`
  display: flex;
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

export default function LiveCityLeafletMap({ isDark }) {
  const lightMap = `https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${process.env.REACT_APP_STADIA_API_KEY}`;
  const darkMap = `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${process.env.REACT_APP_STADIA_API_KEY}`;
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState(null);
  const featureGroupRef = useRef();
  const [location] = useState([25.049637, 121.525986]);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [tdxBus, setTdxBus] = useState([]);
  const [routeTimer, setRouteTimer] = useState(10);

  async function getBusFn(token, bus = '') {
    const busWithTime = await api.getAllRealTimeByFrequency('Taipei', token, bus);
    return busWithTime;
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (routeTimer === 0) {
  //       setRouteTimer(10);
  //     } else {
  //       setRouteTimer((t) => t - 1);
  //     }
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  function removeLayer() {
    featureGroupRef.current?.clearLayers();
  }

  async function assignRouteHandler(bus) {
    if (loading) {
      return;
    }
    console.log('call api');

    // removeLayer();
    setLoading(true);

    const token = await api.getToken();
    const busData = await getBusFn(token, bus);
    console.log(busData);
    setTdxBus(busData);
    setLoading(false);
  }

  // useEffect(() => {
  //   assignRouteHandler();
  // }, []);

  useEffect(() => {
    // 初次渲染時設定計時器
    const interval = setInterval(() => {
      setRouteTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(routeTimer);
    // 根據計時狀況，重置計時器並呼叫api
    if (routeTimer === 0) {
      setRouteTimer(10);
    }

    if (routeTimer === 10) {
      assignRouteHandler();
    }
  }, [routeTimer]);

  const allBus = true;

  return (
    <Wrapper>
      <Sidebar>
        <CityBusState tdxBus={tdxBus} />
      </Sidebar>
      <StyledMemoMapContainer
        center={location}
        zoom={zoomLevel}
        minZoom={11}
        maxZoom={16}
        scrollWheelZoom
        style={{ height: 'calc(100vh - 120px)', width: '100%' }}
        ref={setMap}
      >
        <FeatureGroup ref={featureGroupRef}>
          {tdxBus && <BusMarker tdxBus={tdxBus} allBus={allBus} />}
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
      </StyledMemoMapContainer>
      {loading && <LoadingEffect />}
    </Wrapper>
  );
}

LiveCityLeafletMap.propTypes = {
  isDark: PropTypes.bool.isRequired,
};

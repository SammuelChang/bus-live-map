/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import {
  memo, useState, useRef, useEffect,
} from 'react';
import {
  TileLayer, FeatureGroup, MapContainer, useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MemoMapContainer = memo(MapContainer);
const Wrapper = styled.div`
  ${'' /* margin: 30px 100px; */}
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export default function AdvInfo() {
  const [map, setMap] = useState(null);
  const featureGroupRef = useRef();
  const [location] = useState([25.049637, 121.525986]);
  const [zoomLevel, setZoomLevel] = useState(12);

  return (
    <Wrapper>
      <MemoMapContainer
        center={location}
        zoom={zoomLevel}
        // minZoom={11}
        // maxZoom={16}
        scrollWheelZoom
        style={{ height: 'calc(100vh - 120px)', width: '100%' }}
        ref={setMap}
      >
        <FeatureGroup ref={featureGroupRef} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          opacity={0.7}
        />
      </MemoMapContainer>
    </Wrapper>
  );
}

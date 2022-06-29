/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import {
  useState, useRef, memo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  FeatureGroup,
  Marker,
  Circle,
  Tooltip,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { parse } from 'wellknown';
import styled from 'styled-components';
import L from 'leaflet';
import api from '../../utils/api';
import Sidebar from '../../components/Sidebar';
import BusShape from '../../components/LeafletMap/BusShape';
import NearbyPath from '../../components/Sidebar/NearbyPath';

const Wrapper = styled.div`
  display: flex;
`;
const MemoMapContainer = memo(MapContainer);

function AddMarkerToClick({ markers, setMarkers }) {
  const circleOption = { color: 'gray', fillColor: 'gray' };
  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng;
      setMarkers([newMarker]);
    },
  });

  return (
    <>
      {markers.map((marker) => (
        <Circle
          key={`${marker}_${Date.now()}`}
          center={marker}
          pathOptions={circleOption}
          fillOpacity={0.3}
          weight={3}
          radius={500}
          zIndexOffset={100}
        >
          <Popup>
            <strong>點選位置：</strong>
            <br />
            {` [ ${marker.lat}, ${marker.lng} ]`}
          </Popup>
        </Circle>
      ))}
    </>
  );
}

AddMarkerToClick.propTypes = {
  markers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setMarkers: PropTypes.func.isRequired,
};

function BusStop({ nearby }) {
  const circleOption = { color: '#e63946', fillColor: '#e63946' };

  return (
    <>
      {nearby.map((stop) => (
        <Circle
          key={`${stop.properties.model.StopUID}_${Date.now()}`}
          center={[stop.geometry.coordinates[1], stop.geometry.coordinates[0]]}
          pathOptions={circleOption}
          fillOpacity={1}
          weight={5}
          radius={10}
          zIndexOffset={10000}
        >
          <Tooltip>{stop.properties.model.StopName}</Tooltip>
        </Circle>
      ))}
    </>
  );
}

BusStop.propTypes = {
  nearby: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default function LiveNearbyPath() {
  const featureGroupRef = useRef();
  const [location] = useState([25.049637, 121.525986]);
  const [markers, setMarkers] = useState([]);
  const [nearby, setNearby] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [tdxShape, setTdxShape] = useState([]);

  async function getNearby(lon, lat) {
    // token -> 指定位置周遭站牌 -> 行經站牌路線 -> 路線線形
    const token = await api.getToken();
    const result = await api.getNearbyStops('Taipei', token, lon, lat);
    setNearby(result.features ?? []);

    if ((await Object.keys(result).length) !== 0) {
      const stationFilter = result.features
        .reduce((acc, cur) => {
          acc.push(cur.properties.model.StationID);
          return [...new Set(acc)];
        }, [])
        .map((i) => ` or Stops/any(d:d/StationID eq '${i}')`)
        .join('')
        .replace('or Stops', 'Stops');

      const routeData = await api.getAllStationStopOfRoute('Taipei', token, '', stationFilter);
      setRoutes(routeData);

      const routeSets = routeData
        .reduce((acc, cur) => {
          acc.push(cur.RouteUID);
          return [...new Set(acc)];
        }, [])
        .map((i) => `or RouteUID eq '${i}'`)
        .join('')
        .replace('or RouteUID', 'RouteUID');
      const shapeData = await api.getAllShape('Taipei', token, '', routeSets);
      const geoShapeData = shapeData.map((obj) => ({
        ...obj,
        Geojson: { ...parse(obj.Geometry), properties: { RouteName: obj.RouteName.Zh_tw } },
      }));
      setTdxShape(geoShapeData);
    }
  }

  function removeLayer() {
    featureGroupRef.current?.clearLayers();
  }

  useEffect(() => {
    if (markers.length) {
      removeLayer();
      setNearby([]);
      setRoutes([]);
      setTdxShape([]);
      getNearby(markers[0].lng, markers[0].lat);
    }
  }, [markers]);

  return (
    <Wrapper>
      <Sidebar>
        <NearbyPath nearby={nearby} routes={routes} markers={markers} />
      </Sidebar>
      <MemoMapContainer
        center={location}
        minZoom={11}
        maxZoom={16}
        zoom={12}
        style={{ height: 'calc(100vh - 120px)', width: '100%' }}
      >
        <FeatureGroup ref={featureGroupRef}>
          <AddMarkerToClick markers={markers} setMarkers={setMarkers} />
          {tdxShape !== undefined && <BusShape tdxShape={tdxShape} />}
          {nearby !== undefined && <BusStop nearby={nearby} />}
        </FeatureGroup>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          opacity={0.9}
        />
      </MemoMapContainer>
    </Wrapper>
  );
}

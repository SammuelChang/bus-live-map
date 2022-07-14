import {
  useState, useRef, memo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  FeatureGroup,
  Circle,
  Tooltip,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { parse } from 'wellknown';
import styled from 'styled-components';
// import Modal from 'react-modal';
import Swal from 'sweetalert2';
import api from '../../utils/api';
import Sidebar from '../../components/Sidebar';
import BusShape from '../../components/LeafletMap/BusShape';
import NearbyPath from '../../components/Sidebar/NearbyPath';
import './index.css';
import LoadingEffect from '../../components/LoadingEffect';

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const UserMemo = styled.div`
  width: 250px;
  height: 60px;
  background: white;
  z-index: 100;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 5px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15px;
  user-select: none;
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
// Modal.setAppElement('#root');

function AddMarkerToClick({
  markers, setMarkers, getCurrentPoi, setGetCurrentPoi,
}) {
  const circleOption = { color: 'gray', fillColor: 'gray' };
  const circleOptionCurrent = { color: '#e9c46a', fillColor: '#e9c46a' };

  useMapEvents({
    click(e) {
      const newMarker = e.latlng;
      setMarkers([newMarker]);
      setGetCurrentPoi(false);
    },
  });

  return (
    <>
      {markers.map((marker) => (
        <Circle
          key={`${marker}_${Date.now()}`}
          center={marker}
          pathOptions={getCurrentPoi ? circleOptionCurrent : circleOption}
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
  getCurrentPoi: PropTypes.bool.isRequired,
  setGetCurrentPoi: PropTypes.func.isRequired,
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

export default function LiveNearbyPath({ isDark }) {
  const lightMap = `https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${process.env.REACT_APP_STADIA_API_KEY}`;
  const darkMap = `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${process.env.REACT_APP_STADIA_API_KEY}`;
  const [loading, setLoading] = useState(true);
  const featureGroupRef = useRef();
  const [location] = useState([25.049637, 121.525986]);
  const [markers, setMarkers] = useState([]);
  const [nearby, setNearby] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [tdxShape, setTdxShape] = useState([]);
  // const [isOpen, setIsOpen] = useState(true);
  const [getCurrentPoi, setGetCurrentPoi] = useState(false);

  async function getNearby(lon, lat) {
    setLoading(true);
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
      setLoading(false);
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

  function successLocate(position) {
    setMarkers([{ lat: position.coords.latitude, lng: position.coords.longitude }]);
    setGetCurrentPoi(true);
  }

  function failedLocate() {
    setMarkers([
      {
        lat: location[0],
        lng: location[1],
      },
    ]);
    setGetCurrentPoi(false);
    setLoading(false);
  }

  function locatePosition() {
    navigator.geolocation.getCurrentPosition(successLocate, failedLocate);
  }

  useEffect(() => {
    locatePosition();
  }, []);

  useEffect(() => {
    if (!getCurrentPoi) return;
    Swal.fire({
      title: '已自動偵測您現在位置',
      showConfirmButton: false,
      timer: 1500,
    });
  }, [getCurrentPoi]);

  return (
    <Wrapper>
      {/* {getCurrentPoi && (
        <Modal
          closeTimeoutMS={500}
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="modal"
          style={{
            content: {
              textAlign: 'center',
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              transition: '.5s',
              width: '90%',
              maxHeight: '600px',
              overflow: 'auto',
              padding: '40px',
              maxWidth: '500px',
              borderRadius: '10px',
              boxShadow: '0px 0px 15px 1px gray',
            },
            overlay: {
              zIndex: '1000',
              top: '120px',
            },
          }}
        >
          <div>已自動定位您所在位置，三秒後自動關閉視窗</div>
        </Modal>
      )} */}
      <Sidebar>
        <NearbyPath nearby={nearby} routes={routes} markers={markers} />
      </Sidebar>
      <UserMemo>
        點擊地圖任意位置
        <br />
        查看500公尺內行經公車路線
      </UserMemo>
      <StyledMemoMapContainer
        center={location}
        minZoom={11}
        maxZoom={16}
        zoom={12}
        style={{ height: 'calc(100vh - 120px)', width: '100%' }}
      >
        <FeatureGroup ref={featureGroupRef}>
          <AddMarkerToClick
            markers={markers}
            setMarkers={setMarkers}
            getCurrentPoi={getCurrentPoi}
            setGetCurrentPoi={setGetCurrentPoi}
          />
          {tdxShape !== undefined && <BusShape tdxShape={tdxShape} nearby={nearby} />}
          {nearby !== undefined && <BusStop nearby={nearby} />}
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

LiveNearbyPath.propTypes = {
  isDark: PropTypes.bool.isRequired,
};

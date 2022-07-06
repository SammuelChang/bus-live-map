import styled from 'styled-components';
import PropTypes from 'prop-types';
import location from '../../images/location.png';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  min-width: 300px;
  @media (max-width: 780px) {
    display: none;
  }
`;

const Position = styled.div`
  min-height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: default;
`;

const PositionIcon = styled.div`
  padding-right: 10px;
  background: url(${location}) no-repeat center center;
  background-size: contain;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translateY(-50%);
`;
const PositionText = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  font-size: 0.8rem;
`;

const Result = styled.div`
  display: flex;
  overflow: scroll;
  overflow-x: auto;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
`;

const Stops = styled.div`
  width: 130%;
  font-size: 1rem;
  margin-right: 10px;
`;

const Route = styled.div`
  width: 100%;
  font-size: 1rem;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
`;

const BusIcon = styled.div`
  background: url(${({ theme }) => theme.nearbyBus}) no-repeat center center;
  background-size: contain;
  width: 25px;
  height: 25px;
`;

const StopIcon = styled.div`
  margin-left: 135px;
  background: url(${({ theme }) => theme.nearbyStop}) no-repeat center center;
  background-size: contain;
  width: 25px;
  height: 25px;
`;

export default function NearbyPath({ nearby = [], routes = [], markers }) {
  const formatNearby = nearby
    ? nearby
      .reduce((acc, cur) => {
        acc.push(cur.properties.model.StopName);
        return [...new Set(acc)];
      }, [])
      .sort()
    : [];

  const formatRoutes = routes
    ? routes
      .reduce((acc, cur) => {
        acc.push(cur.RouteName.Zh_tw);
        return [...new Set(acc)];
      }, [])
      .sort()
    : [];

  return (
    <Wrapper>
      <Position title="點選位置">
        <PositionIcon />
        <PositionText>
          {markers.length === 0 && <h2>偵測中</h2>}
          {markers.length ? markers[0].lng : ''}
          <br />
          {markers.length ? markers[0].lat : ''}
        </PositionText>
      </Position>
      <IconContainer>
        <BusIcon />
        <StopIcon />
      </IconContainer>
      <Result>
        <Stops>
          {formatNearby.length
            ? formatNearby.map((stop) => <div key={stop}>{stop}</div>)
            : '查無站牌'}
        </Stops>
        <Route>
          {' '}
          {formatRoutes.length
            ? formatRoutes.map((route) => <div key={route}>{route}</div>)
            : '查無路線'}
        </Route>
      </Result>
    </Wrapper>
  );
}

NearbyPath.propTypes = {
  nearby: PropTypes.oneOfType([PropTypes.array]).isRequired,
  routes: PropTypes.oneOfType([PropTypes.array]).isRequired,
  markers: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

const Position = styled.div`
  min-height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
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
  width: 100%;
  font-size: 0.7rem;
  margin-right: 10px;
`;

const Route = styled.div`
  width: 100%;
  font-size: 0.7rem;
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
      <Position>
        {markers.length ? '指定位置' : '在地圖上點擊任一處'}
        <br />
        {markers.length ? markers[0].lng : ''}
        <br />
        {markers.length ? markers[0].lat : ''}
      </Position>
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

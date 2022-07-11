import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
// import location from '../../images/location.png';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  min-width: 300px;
  user-select: none;
  @media (max-width: 780px) {
    display: none;
  }
`;

const Result = styled.div`
  display: flex;
  overflow: scroll;
  overflow-x: auto;
  margin-bottom: 10px;

  ${
  '' /* &::-webkit-scrollbar-track {
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
  } */
}
`;

const Stops = styled.div`
  width: 130%;
  font-size: 1rem;
  margin-right: 10px;
  > * {
    height: 20px;
    margin-bottom: 10px;
  }
`;

const Route = styled.div`
  width: 100%;
  font-size: 1rem;
  > * {
    height: 20px;
    margin-bottom: 10px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 30px 0;
`;

const BusIcon = styled.div`
  background: url(${({ theme }) => theme.nearbyBus}) no-repeat center center;
  background-size: contain;
  margin-left: 140px;
  width: 20px;
  height: 20px;
`;

const StopIcon = styled.div`
  background: url(${({ theme }) => theme.nearbyStop}) no-repeat center center;
  background-size: contain;
  width: 25px;
  height: 25px;
`;

export default function NearbyPath({ nearby = [], routes = [] }) {
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
      <IconContainer>
        <StopIcon title="行經站牌" />
        <BusIcon title="行經路線" />
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
  // markers: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

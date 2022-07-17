import { useState } from 'react';
import styled, { css } from 'styled-components/macro';
import PropTypes from 'prop-types';
import busMove from '../../images/bus_move.png';
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
const CityContainer = styled.div`
  width: 200px;
  margin: 50px 0 30px 20px;
  display: flex;
  justify-content: space-between;
  position: relative;
`;
const CityOption = styled.button`
  padding: none;
  background: none;
  border: none;
  width: 50px;
  height: 20px;
  margin: 0 5px;
  display: flex;
  align-items: flex-end;
  justify-content: ${(props) => props.textAlign};
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  position: relative;
  color: gray;

  ${(props) => props.current
    && css`
      color: ${({ theme }) => theme.headerHoverColor};
    `}

  &:hover {
    color: ${({ theme }) => theme.color};
  }
`;

const BusMove = styled.div`
  background: url(${busMove});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 30px;
  height: 15px;
  position: absolute;
  bottom: 3px;
  left: 55px;
  ${(props) => props.moveDirection === 'moveForward'
    && css`
      animation: moveForward 1s linear both;
    `};

  ${(props) => props.moveDirection === 'moveBack'
    && css`
      animation: moveBack 1s linear both;
    `};

  @keyframes moveForward {
    0% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(60px);
    }
  }
  @keyframes moveBack {
    0% {
      transform: translateX(60px);
    }
    100% {
      transform: translateX(0px);
    }
  }
`;

const Result = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  margin-bottom: 10px;
  margin-left: 20px;

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
  width: 100%;
  font-size: 1rem;
  margin-bottom: 20px;
  > * {
    height: 20px;
    width: 100%;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 2.5px;
  }
`;

const Route = styled.div`
  width: 100%;
  font-size: 1rem;
  > * {
    height: 20px;
    width: 100%;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 1.5px;
  }
`;

// const IconContainer = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: flex-end;
//   padding: 30px 0;
// `;

const Banner = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0;
`;

const Status = styled.div`
  margin-left: 10px;
`;

const BusIcon = styled.div`
  background: url(${({ theme }) => theme.nearbyBus}) no-repeat center center;
  background-size: contain;
  width: 20px;
  height: 20px;
  position: relative;
`;

const StopIcon = styled.div`
  background: url(${({ theme }) => theme.nearbyStop}) no-repeat center center;
  background-size: contain;
  width: 20px;
  height: 20px;
  position: relative;
  z-index: 1;
  ${
  '' /*
  &::after {
    content: '行經站牌';
    width: 50px;
    height: 25px;
    position: absolute;
    left: 30px;
    top: 0;
    background: red;
    white-space: nowrap;
  } */
}
`;

export default function NearbyPath({
  nearby = [], routes = [], setOnRunCity, onRunCity, loading,
}) {
  const [moveDirection, setMoveDirection] = useState('');
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
      <CityContainer>
        <BusMove moveDirection={moveDirection} />
        <CityOption
          textAlign="flex-start"
          onClick={() => {
            setOnRunCity('Taipei');
            setMoveDirection('moveBack');
          }}
          onRunCity={onRunCity === 'Taipei'}
          current={onRunCity === 'Taipei'}
        >
          台北市
        </CityOption>
        <CityOption
          textAlign="flex-end"
          onClick={() => {
            setOnRunCity('NewTaipei');
            setMoveDirection('moveForward');
          }}
          onRunCity={onRunCity === 'NewTaipei'}
          current={onRunCity === 'NewTaipei'}
        >
          新北市
        </CityOption>
      </CityContainer>
      <Result>
        <Stops>
          <Banner>
            <StopIcon title="行經站牌" />
            <Status>
              {!loading && formatNearby.length === 0 && '查無路線'}
              {loading && '載入中'}
            </Status>
          </Banner>
          {!loading
            && formatNearby.length > 0
            && formatNearby.map((stop) => <div key={stop}>{stop}</div>)}
        </Stops>
        <Route>
          <Banner>
            <BusIcon title="行經路線" />
            <Status>
              {!loading && formatNearby.length === 0 && '查無路線'}
              {loading && '載入中'}
            </Status>
          </Banner>
          {!loading
            && formatRoutes.length > 0
            && formatRoutes.map((route) => <div key={route}>{route}</div>)}
        </Route>
      </Result>
    </Wrapper>
  );
}

NearbyPath.propTypes = {
  nearby: PropTypes.oneOfType([PropTypes.array]).isRequired,
  routes: PropTypes.oneOfType([PropTypes.array]).isRequired,
  // markers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setOnRunCity: PropTypes.func.isRequired,
  onRunCity: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

import { useState } from 'react';
import styled, { css } from 'styled-components/macro';
import PropTypes from 'prop-types';
import busMove from '../../images/bus_move.png';

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
  margin: 20px 20px 10px;
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

const BusInfo = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  margin-bottom: 10px;
  margin-left: 20px;
`;

const Block = styled.div`
  width: 200px;
  font-size: 1rem;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.adjBackground};
  border-radius: 10px;
  padding: 10px;
  color: ${({ theme }) => theme.primary};

  > * {
    height: 20px;
    width: 100%;
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 2.5px;
  }
`;

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

  const cityOptions = [
    {
      textAlign: 'flex-start',
      cityCode: 'Taipei',
      cityName: '台北市',
      direction: 'moveBack',
    },
    {
      textAlign: 'flex-end',
      cityCode: 'NewTaipei',
      cityName: '新北市',
      direction: 'moveForward',
    },
  ];

  function cityAlter(city, direction) {
    setOnRunCity(city);
    setMoveDirection(direction);
  }

  return (
    <Wrapper>
      <CityContainer>
        <BusMove moveDirection={moveDirection} />
        {cityOptions.map((i) => (
          <CityOption
            key={i.cityCode}
            textAlign={i.textAlign}
            onClick={() => {
              cityAlter(i.cityCode, i.direction);
            }}
            current={onRunCity === i.cityCode}
          >
            {i.cityName}
          </CityOption>
        ))}
      </CityContainer>
      <BusInfo>
        <Block>
          <Banner>
            <StopIcon title="行經站牌" />
            <Status>
              {!loading && formatNearby.length === 0 && '查無路線'}
              {loading && '載入中'}
            </Status>
          </Banner>
          {!loading && formatNearby?.map((stop) => <div key={stop}>{stop}</div>)}
        </Block>
        <Block>
          <Banner>
            <BusIcon title="行經路線" />
            <Status>
              {!loading && formatNearby.length === 0 && '查無路線'}
              {loading && '載入中'}
            </Status>
          </Banner>
          {!loading && formatRoutes?.map((route) => <div key={route}>{route}</div>)}
        </Block>
      </BusInfo>
    </Wrapper>
  );
}

NearbyPath.propTypes = {
  nearby: PropTypes.oneOfType([PropTypes.array]).isRequired,
  routes: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setOnRunCity: PropTypes.func.isRequired,
  onRunCity: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

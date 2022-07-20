import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ProgressBar from './ProgressBar';
import busMove from '../../images/bus_move.png';

const Wrapper = styled.div`
  height: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  @media (max-width: 780px) {
    width: 100vw;
  }
`;

const CityContainer = styled.div`
  width: 200px;
  margin-top: 20px;
  margin-bottom: 10px;
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

const BusStatus = styled.div`
  height: 100px;
  width: 200px;
  border-radius: 5px;
  background: ${(props) => props.bg};
  color: ${(props) => props.clr || 'black'};
  margin: 5px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  padding: 5px 0;
  > * {
    margin-bottom: 2px;
  }
`;

const Status = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  font-size: ${(props) => props.sz};
`;

const Count = styled.div`
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

const Explain = styled.span`
  font-size: 0.5rem;
`;

const ProgressAdjust = styled.div`
  width: 90%;
  position: absolute;
  bottom: 0;
`;

export default function CityBusState({
  tdxBus, loading, setOnRunCity, onRunCity,
}) {
  const [moveDirection, setMoveDirection] = useState('');
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
  const busStatics = [
    {
      status: '飆速中',
      count: tdxBus.filter((x) => x.Speed > 40).length,
      explain: '時速大於40數量',
      bg: '#e63946',
      clr: 'white',
    },
    {
      status: '移動中',
      count: tdxBus.filter((x) => x.Speed > 0).length,
      explain: '時速大於0數量',
      bg: '#2a9d8f',
    },
    {
      status: '未移動',
      count: tdxBus.filter((x) => x.Speed === 0).length,
      explain: '時速等於0數量',
      bg: '#e9c46a',
    },
    {
      status: '其他非營運狀態',
      count: tdxBus.filter((x) => x.BusStatus !== 0).length,
      explain: '出租、緊急事件或非營運中數量',
      bg: '#8d99ae',
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
      {busStatics
        && busStatics.map((i) => (
          <BusStatus bg={i.bg} clr={i.clr}>
            <Status>{i.status}</Status>
            <Count>{i.count}</Count>
            <Explain>{i.explain}</Explain>
          </BusStatus>
        ))}
      <ProgressAdjust>
        <ProgressBar loading={loading} data={tdxBus} />
      </ProgressAdjust>
    </Wrapper>
  );
}

CityBusState.propTypes = {
  tdxBus: PropTypes.oneOfType([PropTypes.array]).isRequired,
  loading: PropTypes.bool.isRequired,
  setOnRunCity: PropTypes.func.isRequired,
  onRunCity: PropTypes.string.isRequired,
};

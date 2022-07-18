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

const ProgressAdjust = styled.div`
  width: 90%;
  position: absolute;
  bottom: 0;
`;
export default function CityBusState({
  tdxBus, loading, setOnRunCity, onRunCity,
}) {
  const [moveDirection, setMoveDirection] = useState('');

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
      <BusStatus bg="#e63946" clr="white">
        <Status>飆速中</Status>
        <Count>{tdxBus.filter((x) => x.Speed > 40).length}</Count>
        <span style={{ fontSize: '0.5rem' }}>時速大於40數量</span>
      </BusStatus>
      <BusStatus bg="#2a9d8f">
        <Status>移動中</Status>
        <Count>{tdxBus.filter((x) => x.Speed > 0).length}</Count>
        <span style={{ fontSize: '0.5rem' }}>時速大於0數量</span>
      </BusStatus>
      <BusStatus bg="#e9c46a">
        <Status>未移動</Status>
        <Count>{tdxBus.filter((x) => x.Speed === 0).length}</Count>
        <span style={{ fontSize: '0.5rem' }}>時速等於0數量</span>
      </BusStatus>
      <BusStatus bg="#8d99ae">
        <Status>其他非營運狀態</Status>
        <Count>{tdxBus.filter((x) => x.BusStatus !== 0).length}</Count>
        <span style={{ fontSize: '0.5rem' }}>出租、緊急事件或非營運中數量</span>
      </BusStatus>
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

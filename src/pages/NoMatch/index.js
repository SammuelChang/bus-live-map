import styled from 'styled-components';
import busMove from '../../images/bus_move.png';
import brick from '../../images/bricks.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px);
  width: 100vw;
  overflow: hidden;
`;

const Text = styled.div`
  font-size: 10rem;
  font-weight: bold;
  width: 100%;
  text-align: center;
  margin-bottom: -200px;
  z-index: 100;
  color: #363537;
`;

const BusContainer = styled.div`
  display: flex;
  margin-top: 100px;
  border-bottom: 3px solid lightgray;
`;

const MovingBus = styled.div`
  background: url(${busMove});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
  height: 200px;
  width: 200px;
  margin-right: 10px;
  animation: shake-horizontal 2s linear infinite;
  @keyframes shake-horizontal {
    0%,
    100% {
      transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70% {
      transform: translateX(-10px);
    }
    20%,
    40%,
    60% {
      transform: translateX(10px);
    }
    80% {
      transform: translateX(8px);
    }
    90% {
      transform: translateX(-8px);
    }
  }
`;

const Brick = styled.div`
  background: url(${brick});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
  height: 200px;
  width: 200px;
`;

export default function NoMatch() {
  return (
    <Wrapper>
      <Text>404</Text>
      <BusContainer>
        <MovingBus />
        <Brick />
      </BusContainer>
    </Wrapper>
  );
}

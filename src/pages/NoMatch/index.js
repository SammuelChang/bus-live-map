import styled from 'styled-components';
import busMove from '../../images/bus_move.png';
import brick from '../../images/bricks.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px);
  width: 100vw;
  overflow: hidden;
  position: relative;
`;

const Text = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  text-transform: uppercase;
  font-size: 20rem;
  font-weight: 700;
  color: black;
  opacity: 0.8;
  -webkit-text-stroke: 0.3px black;
  text-shadow: 1px 1px 1px #919191, 1px 2px 1px #919191, 1px 3px 1px #919191, 1px 4px 1px #919191,
    1px 5px 1px #919191, 1px 6px 1px #919191, 1px 7px 1px #919191, 1px 8px 1px #919191,
    1px 9px 1px #919191, 1px 10px 1px #919191, 1px 18px 6px rgba(16, 16, 16, 0.4),
    1px 22px 10px rgba(16, 16, 16, 0.2), 1px 25px 35px rgba(16, 16, 16, 0.2),
    1px 30px 60px rgba(16, 16, 16, 0.4);
  @media (max-width: 780px) {
    font-size: 15rem;
  }
`;

const BusContainer = styled.div`
  display: flex;
  border-bottom: 3px solid lightgray;
  position: absolute;
  bottom: 0;
`;

const MovingBus = styled.div`
  background: url(${busMove});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
  height: 200px;
  width: 200px;

  @media (max-width: 780px) {
    height: 150px;
    width: 150px;
  }

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

  @media (max-width: 780px) {
    height: 150px;
    width: 150px;
  }
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

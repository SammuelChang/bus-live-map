import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  height: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 780px) {
    width: 100vw;
  }
`;

const Circle = styled.div`
  height: 100px;
  width: 200px;
  border-radius: 5px;
  background: ${(props) => props.bg};
  color: ${(props) => props.clr || 'black'};
  margin: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Status = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  font-size: ${(props) => props.sz};
`;

const Count = styled.div`
  font-size: 1.1rem;
`;

// eslint-disable-next-line no-unused-vars
export default function CityBusState({ tdxBus }) {
  return (
    <Wrapper>
      <Circle bg="#e63946" clr="white">
        <Status>飆速中</Status>
        <Count>{tdxBus.filter((x) => x.Speed > 40).length}</Count>
      </Circle>
      <Circle bg="#2a9d8f">
        <Status>移動中</Status>
        <Count>{tdxBus.filter((x) => x.Speed > 0).length}</Count>
      </Circle>
      <Circle bg="#e9c46a">
        <Status>未移動</Status>
        <Count>{tdxBus.filter((x) => x.Speed === 0).length}</Count>
      </Circle>
      <Circle bg="#8d99ae">
        <Status>其他非營運狀態</Status>
        <Count>{tdxBus.filter((x) => x.BusStatus !== 0).length}</Count>
      </Circle>
    </Wrapper>
  );
}

CityBusState.propTypes = {
  tdxBus: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

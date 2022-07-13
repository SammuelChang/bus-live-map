import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

const Wrapper = styled.div`
  height: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 780px) {
    width: 100vw;
  }
`;

const BusStatus = styled.div`
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
  user-select: none;
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
`;

const ProgressAdjust = styled.div`
  width: 90%;
  position: absolute;
  bottom: 0;
`;
export default function CityBusState({ tdxBus, loading }) {
  return (
    <Wrapper>
      <BusStatus bg="#e63946" clr="white">
        <Status>飆速中</Status>
        <Count>{tdxBus.filter((x) => x.Speed > 40).length}</Count>
        <br />
        <span style={{ fontSize: '0.5rem' }}>時速大於40數量</span>
      </BusStatus>
      <BusStatus bg="#2a9d8f">
        <Status>移動中</Status>
        <Count>{tdxBus.filter((x) => x.Speed > 0).length}</Count>
        <br />
        <span style={{ fontSize: '0.5rem' }}>時速大於0數量</span>
      </BusStatus>
      <BusStatus bg="#e9c46a">
        <Status>未移動</Status>
        <Count>{tdxBus.filter((x) => x.Speed === 0).length}</Count>
        <br />
        <span style={{ fontSize: '0.5rem' }}>時速等於0數量</span>
      </BusStatus>
      <BusStatus bg="#8d99ae">
        <Status>其他非營運狀態</Status>
        <Count>{tdxBus.filter((x) => x.BusStatus !== 0).length}</Count>
        <br />
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
};

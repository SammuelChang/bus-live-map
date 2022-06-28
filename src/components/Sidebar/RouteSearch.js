import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin: 0 5px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
`;

const SearchContainer = styled.div`
  min-height: 100px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  margin-right: 10px;
  cursor: pointer;
`;

const SearchText = styled.input`
  background: none;
  border: none;
  width: 100%;
  height: 50%;
  max-height: 100px;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 10px;
  resize: none;
  border: none;
  overflow: hidden;
  outline: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// const RealTimeTable = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
// `;

const Direction = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  & * {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Depart = styled.div`
  background: #ccd5ae;
`;

const Destination = styled.div`
  background: #e9c46a;
`;

const Stops = styled.div`
  margin: 10px 0;
  width: 100%;
  height: calc(100% - 140px);
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

const Stop = styled.div`
  display: flex;
  height: 30px;
  & * {
    display: flex;
    align-items: center;
  }
`;
const StopName = styled.div`
  text-align: left;
  width: 60%;
  white-space: nowrap;
  font-size: 0.7rem;
  font-weight: bold;
`;

const StopTime = styled.div`
  width: 30%;
  white-space: nowrap;
  font-size: 0.7rem;
  padding-left: ${(props) => (props.coming ? '0' : '2px')};
  color: ${(props) => (props.coming ? '#e63946' : 'black')};
  font-weight: ${(props) => (props.coming ? 'bold' : 'normal')};
`;

// const StopLine = styled.div`
//   width: 10%;
//   ${'' /* border-left: 1px solid black; */}
//   ${
//   '' /* &:after {
//     display: flex;
//     align-items: center;
//     content: '♡';
//     margin-left: -7px;
//     color: ${(props) => (props.coming ? '#e63946' : 'black')};
//     z-index: 20;
//   } */
// }
// `;

const Collect = styled.button`
  width: 20px;
  background: none;
  border: none;
  text-align: center;
  display: flex;
  justify-content: center;
`;

// eslint-disable-next-line no-unused-vars
export default function RouteSearch({
  displayBus,
  setDisplayBus,
  searchRoute,
  mergeStation,
  direction,
  setDirection,
}) {
  const busRef = useRef('');
  const [collectList, setCollectList] = useState(
    JSON.parse(localStorage.getItem('stopCollect')) || [],
  );

  useEffect(() => {
    setDisplayBus(displayBus);
  }, [busRef.current.value]);

  function clickHandler(RouteUID, StopUID) {
    const collectListIndex = collectList.findIndex(
      (c) => c.RouteUID === RouteUID && c.StopUID === StopUID && c.direction === direction,
    );

    if (collectListIndex === -1) {
      const collect = [
        ...collectList,
        {
          RouteUID,
          StopUID,
          direction,
          favorite: false,
          category: 'default',
        },
      ];
      setCollectList(collect);
      localStorage.setItem('stopCollect', JSON.stringify(collect));
    } else if (collectListIndex > -1) {
      const collect = collectList.filter((_, index) => index !== collectListIndex);
      setCollectList(collect);
      localStorage.setItem('stopCollect', JSON.stringify(collect));
    }
  }

  return (
    <Wrapper>
      <SearchContainer>
        <SearchText placeholder={displayBus ? `${displayBus}` : '請輸入路線'} ref={busRef} />
        <SearchButton
          onClick={() => {
            searchRoute(busRef.current.value);
            setDisplayBus(busRef.current.value);
          }}
        >
          🔍
        </SearchButton>
      </SearchContainer>
      {/* <RealTimeTable> */}
      <Direction>
        <Depart onClick={() => setDirection(0)}>
          往
          {mergeStation.length ? mergeStation[0].DestinationStopNameZh : '終點站'}
        </Depart>
        <Destination onClick={() => setDirection(1)}>
          往
          {mergeStation.length ? mergeStation[0].DepartureStopNameZh : '起點站'}
        </Destination>
      </Direction>
      <Stops>
        {mergeStation
          .filter((i) => i.Direction === direction)
          .map((stop) => (
            <Stop key={stop.StopUID}>
              <StopName>{stop.StopName.Zh_tw}</StopName>
              <StopTime coming={stop.EstimateTime < 60}>
                {stop.EstimateTime == null && '未發車'}
                {stop.EstimateTime < 60 && '即將進站'}
                {stop.EstimateTime >= 60 && Math.floor(stop.EstimateTime / 60)}
              </StopTime>
              {/* <StopLine coming={stop.EstimateTime < 60} /> */}
              <Collect onClick={() => clickHandler(stop.RouteUID, stop.StopUID)}>
                {collectList.find(
                  (c) => c.RouteUID === stop.RouteUID
                    && c.StopUID === stop.StopUID
                    && c.direction === direction,
                )
                  ? '❤️'
                  : '♡'}
              </Collect>
            </Stop>
          ))}
      </Stops>
      {/* </RealTimeTable> */}
    </Wrapper>
  );
}

RouteSearch.propTypes = {
  displayBus: PropTypes.string.isRequired,
  setDisplayBus: PropTypes.func.isRequired,
  searchRoute: PropTypes.func.isRequired,
  mergeStation: PropTypes.oneOfType([PropTypes.array]).isRequired,
  direction: PropTypes.number.isRequired,
  setDirection: PropTypes.func.isRequired,
};

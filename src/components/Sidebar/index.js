import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyleLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const Wrapper = styled.div`
  height: calc(100vh - 120px);
  background: #ebebe6;
  width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border: 0.5px solid gray;
`;

const SideNav = styled.div`
  background: #ebebe6;
  height: 100%;
  width: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 5px;
  overflow: hidden;
  border-right: 1px solid black;
`;

const Feature = styled.div`
  border-radius: 5px;
  text-align: center;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SideContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0 5px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: auto;
`;

const SearchContainer = styled.div`
  min-height: 100px;
  display: flex;
  align-items: center;
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

const RealTimeTable = styled.div`
  width: 100%;
`;

const Direction = styled.div`
  display: flex;
  justify-content: space-around;

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

const StopLine = styled.div`
  width: 10%;
  border-left: 1px solid black;
  &:after {
    display: flex;
    align-items: center;
    content: '🌍';
    height: 10px;
    width: 10px;
    margin-left: -10px;
  }
`;

// eslint-disable-next-line no-unused-vars
export default function Sidebar({ searchRoute, mergeStation }) {
  const busRef = useRef('');
  const [bus, setBus] = useState('');
  const [direction, setDirection] = useState(0);
  // console.log(mergeStation);

  useEffect(() => {
    setBus(bus);
  }, [busRef.current.value]);

  return (
    <Wrapper>
      <SideNav>
        <StyleLink to="/live/route">
          <Feature>路線查詢</Feature>
        </StyleLink>
        <StyleLink to="/live/city">
          <Feature>全城動態</Feature>
        </StyleLink>
        <StyleLink to="/live/accessibility">
          <Feature>最遠路徑</Feature>
        </StyleLink>
      </SideNav>
      <SideContent>
        <SearchContainer>
          <SearchText placeholder={bus || '請輸入路線'} ref={busRef} />
          <SearchButton
            onClick={() => {
              searchRoute(busRef.current.value);
              setBus(busRef.current.value);
            }}
          >
            🔍
          </SearchButton>
        </SearchContainer>
        <RealTimeTable>
          <Direction>
            <Depart onClick={() => setDirection(0)}>
              往
              {mergeStation.length ? mergeStation[0].DestinationStopNameZh : '終點站'}
              <span> ♡</span>
            </Depart>
            <Destination onClick={() => setDirection(1)}>
              往
              {mergeStation.length ? mergeStation[0].DepartureStopNameZh : '起點站'}
              <span> ♡</span>
            </Destination>
          </Direction>
          <Stops>
            {mergeStation
              .filter((i) => i.Direction === direction)
              .map((stop) => (
                <Stop key={stop.StopUID}>
                  <StopName>{stop.StopName.Zh_tw}</StopName>
                  <StopTime coming={stop.EstimateTime < 60}>
                    {!stop.EstimateTime && '未發車'}
                    {stop.EstimateTime < 60 && '即將進站'}
                    {stop.EstimateTime >= 60 && Math.floor(stop.EstimateTime / 60)}
                  </StopTime>
                  <StopLine />
                </Stop>
              ))}
          </Stops>
        </RealTimeTable>
      </SideContent>
    </Wrapper>
  );
}

Sidebar.propTypes = {
  searchRoute: PropTypes.func.isRequired,
  mergeStation: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

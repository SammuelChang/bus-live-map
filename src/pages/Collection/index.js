import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 30px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const InfoCard = styled.div`
  padding-top: 10px;
  height: 300px;
  width: 300px;
  min-width: 300px;
  background: #e3d5ca;
  border-radius: 50px;
  margin: 15px;
`;

const BusName = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const StopName = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 10px;
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Direction = styled.div`
  font-size: 1.2rem;
  text-align: center;
`;

export default function Collection() {
  return (
    <Wrapper>
      {Array(3).fill('').map(() => (
        <InfoCard>
          <BusName>307</BusName>
          <StopName>大馬路站</StopName>
          <TimeContainer>
            <Direction>往你家</Direction>
            <Direction>往天堂</Direction>
          </TimeContainer>
        </InfoCard>
      ))}
    </Wrapper>
  );
}

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import api from '../../utils/api';

const Wrapper = styled.div`
  height: 100%;
  margin: 30px 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const NoDataWarn = styled.div`
  padding-top: 10px;
  height: 300px;
  width: 300px;
  border-radius: 50%;
  background: #ef476f;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 15px;
  font-size: 1.5rem;
  font-weight: bold;

  animation: wobble-horizontal-bottom 1s linear both;

  @keyframes wobble-horizontal-bottom {
    0%,
    100% {
      transform: translateX(0);
      transform-origin: 50% 50%;
    }
    15% {
      transform: translateX(-30px) rotate(-6deg);
    }
    30% {
      transform: translateX(15px) rotate(6deg);
    }
    45% {
      transform: translateX(-15px) rotate(-3.6deg);
    }
    60% {
      transform: translateX(9px) rotate(2.4deg);
    }
    75% {
      transform: translateX(-6px) rotate(-1.2deg);
    }
  }
`;

const InfoCard = styled.div`
  padding-top: 10px;
  height: 200px;
  min-width: 300px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  border-radius: 50px;
  margin: 15px;
  background: ${(props) => (props.coming ? '#ef476f' : '#84a98c')};
  color: ${(props) => (props.coming ? 'white' : 'black')};

  animation-duration: 10s;
  animation-delay: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: ${(props) => (props.coming ? 'shake-horizontal' : '')};

  @keyframes shake-horizontal {
    0%,
    20% {
      transform: translateX(0);
    }
    2%,
    6%,
    10%,
    14% {
      transform: translateX(-5px);
    }
    4%,
    8%,
    12% {
      transform: translateX(5px);
    }
    16% {
      transform: translateX(4px);
    }
    18% {
      transform: translateX(-4px);
    }
  }
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

const Direction = styled.div`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 10px;
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;

export default function Collection() {
  const [collectList] = useState(JSON.parse(localStorage.getItem('stopCollect')) || []);
  const [stops, setStops] = useState([]);
  const [routeTimer, setRouteTimer] = useState(10);
  const comingThreshold = 120;

  const stopFilter = collectList
    .map(
      (i) => ` or (RouteUID eq '${i.RouteUID}' 
      and StopUID eq '${i.StopUID}' 
      and Direction eq '${i.direction}')`,
    )
    .join('')
    .replace('or (RouteUID', '(RouteUID');

  const routeFilter = collectList
    .map((i) => ` or (RouteUID eq '${i.RouteUID}')`)
    .join('')
    .replace('or (RouteUID', '(RouteUID');

  async function getStops() {
    if (collectList.length === 0) {
      return;
    }
    const token = await api.getToken();
    const stopsWithTime = await api.getAllStationEstimatedTimeOfArrival(
      'Taipei',
      token,
      '',
      stopFilter,
    );

    const busInfo = await api.getRouteInfo('Taipei', token, '', routeFilter);
    const stopsWithTimeInfo = stopsWithTime.map((i) => ({
      ...i,
      DestinationStopNameZh: busInfo.find((info) => info.RouteUID === i.RouteUID)
        .DestinationStopNameZh,
      DepartureStopNameZh: busInfo.find((info) => info.RouteUID === i.RouteUID).DepartureStopNameZh,
    }));

    stopsWithTimeInfo.sort((a, b) => a.RouteName.Zh_tw - b.RouteName.Zh_tw);
    setStops(stopsWithTimeInfo);
  }

  useEffect(() => {
    getStops();
  }, []);

  useEffect(() => {
    // 初次渲染時設定計時器
    const interval = setInterval(() => {
      setRouteTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 根據計時狀況，重置計時器並呼叫api
    if (routeTimer === 0) {
      setRouteTimer(10);
    }

    if (routeTimer === 10) {
      getStops();
    }
  }, [routeTimer]);

  return (
    <Wrapper>
      {collectList.length === 0 && <NoDataWarn>目前尚未收藏</NoDataWarn>}
      {stops.map((stop) => (
        <InfoCard
          key={`${stop.RouteUID}_${stop.StopUID}_${stop.Direction}_${stop.EstimateTime}`}
          coming={stop.EstimateTime < comingThreshold}
        >
          <BusName>{stop.RouteName.Zh_tw}</BusName>
          <StopName>{stop.StopName.Zh_tw}</StopName>
          <Direction>
            往
            {stop.Direction === 0 && stop.DestinationStopNameZh}
            {stop.Direction === 1 && stop.DepartureStopNameZh}
          </Direction>
          <TimeContainer>
            {stop.EstimateTime < comingThreshold && '即將抵達'}
            {stop.EstimateTime >= comingThreshold && `${Math.floor(stop.EstimateTime / 60)}分`}
            {stop.EstimateTime === undefined && '未發車'}
          </TimeContainer>
        </InfoCard>
      ))}
    </Wrapper>
  );
}

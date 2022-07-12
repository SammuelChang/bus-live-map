import styled from 'styled-components/macro';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import busStop from '../../images/bus-stop-empty.png';
import trash from '../../images/trash.png';
import LoadingEffect from '../../components/LoadingEffect';

const StyleLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.background};
  height: 100%;
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const NoDataWarn = styled.div`
  text-align: center;
  padding-top: 35px;
  padding-left: 20px;
  height: 300px;
  width: 300px;
  background: url(${busStop}) no-repeat center;
  color: white;
  border: 1px solid
  margin: 15px;
  font-size: 1.5rem;
  font-weight: bold;
  animation: rotate-vertical-center 2s;
  @keyframes rotate-vertical-center {
    0% {
      transform: rotateY(180deg);
    }
    100% {
      transform: rotateY(0);
    }
  }
  & > span{
    font-size: 1.3rem;
  }

`;

const InfoCard = styled.div`
  height: 250px;
  width: 200px;
  border: 1px solid ${({ theme }) => theme.border};
  margin: 20px;

  @media (max-width: 780px) {
    margin: 10px;
  }

  & > * {
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eef0f0;
  }
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

const BusStop = styled.div`
  height: 20%;
  width: 100%;
  font-size: 1.2rem;
  font-weight: bold;
  background: ${(props) => (props.coming ? '#e63946' : '#1299ce')};
  color: white;
`;

const BusRoute = styled.div`
  height: 40%;
  width: 100%;
  justify-content: space-around;
`;

const BusName = styled.div`
  width: 40%;
  padding-left: 10px;
`;

const BusDirection = styled.div`
  width: 60%;
  font-size: 1rem;
  height: 100%;
  display: flex;
  align-items: center;

  & > span:first-child {
    font-size: 1.5rem;
    padding-right: 10px;
    &::after {
      content: ' ';
    }
  }
  & > span:last-child {
    font-size: 1rem;
    &::after {
      content: ' ';
    }
  }
`;

const BusTime = styled.div`
  height: 30%;
  font-weight: ${(props) => (props.coming ? 'bold' : 'normal')};
  color: ${(props) => (props.coming ? '#e63946' : 'black')};
`;

const Function = styled.div`
  height: 10%;
  justify-content: flex-end;
`;

const Remove = styled.div`
  justify-content: flex-end;
  cursor: pointer;

  &::after {
    content: url(${trash});
    background-position: center top;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;

export default function Collection() {
  const [loading, setLoading] = useState(false);
  const [collectList, setCollectList] = useState(
    JSON.parse(localStorage.getItem('stopCollect')) || [],
  );
  const [stops, setStops] = useState([]);
  const [routeTimer, setRouteTimer] = useState(10);
  const comingThreshold = 120;

  function removeFn(r, s, d) {
    const newCollectList = collectList.filter(
      (i) => i.RouteUID !== r || i.StopUID !== s || i.direction !== d,
    );
    localStorage.setItem('stopCollect', JSON.stringify(newCollectList));
    setCollectList(newCollectList);
  }

  // function favoriteFn(r, s, d) {
  //   const newCollectList = collectList;
  //   const targetIndex = collectList.findIndex(
  //     (i) => i.RouteUID !== r || i.StopUID !== s || i.direction !== d,
  //   );
  //   newCollectList[targetIndex].favorite = !newCollectList[targetIndex].favorite;
  //   setCollectList(newCollectList);
  //   localStorage.setItem('stopCollect', JSON.stringify(newCollectList));
  // }

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
      setStops([]);
      return;
    }
    setLoading(true);
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
    setLoading(false);
  }

  useEffect(() => {
    getStops();
  }, [collectList]);

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
      {collectList.length === 0 && (
        <NoDataWarn>
          空空如也
          <br />
          <br />
          <StyleLink to="/live/route/">
            <span>點我去收藏</span>
          </StyleLink>
        </NoDataWarn>
      )}
      {collectList.length >= 0
        && stops.map((stop) => (
          <InfoCard
            key={`${stop.RouteUID}_${stop.StopUID}_${stop.Direction}_${stop.EstimateTime}`}
            coming={stop.EstimateTime < comingThreshold}
          >
            <BusStop coming={stop.EstimateTime < comingThreshold}>{stop.StopName.Zh_tw}</BusStop>
            <BusRoute>
              <BusName>{stop.RouteName.Zh_tw}</BusName>
              <BusDirection>
                <span>往</span>
                <span>
                  {stop.Direction === 0 && stop.DestinationStopNameZh}
                  {stop.Direction === 1 && stop.DepartureStopNameZh}
                </span>
              </BusDirection>
            </BusRoute>
            <BusTime coming={stop.EstimateTime < comingThreshold}>
              {' '}
              {stop.EstimateTime < comingThreshold / 2 && '將到站'}
              {stop.EstimateTime > comingThreshold / 2
                && stop.EstimateTime < comingThreshold
                && '將到站'}
              {stop.EstimateTime >= comingThreshold && `${Math.floor(stop.EstimateTime / 60)}分`}
              {stop.EstimateTime === undefined && '未發車'}
            </BusTime>
            <Function>
              <Remove
                type="button"
                onClick={() => removeFn(stop.RouteUID, stop.StopUID, stop.Direction)}
              />
            </Function>
          </InfoCard>
        ))}
      {loading && <LoadingEffect />}
    </Wrapper>
  );
}

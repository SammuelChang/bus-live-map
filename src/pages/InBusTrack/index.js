import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components/macro';
import dropDown from '../../images/dropDown.png';
import api from '../../utils/api';
import search from '../../images/search.png';
import ProgressBar from '../../components/Sidebar/ProgressBar';

const ProgressAdjust = styled.div`
  z-index: 100;
  height: 10px;
  width: 100%;
`;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 100vw;
  margin: 50px 0;
  user-select: none;
  > * {
    color: ${({ theme }) => theme.color};
  }
  @media (max-width: 780px) {
    flex-direction: column;
    align-items: center;
  }
`;

const UserInfo = styled.form`
  width: 250px;
  height: 100%;
  display: flex;
  margin-right: ${(props) => (props.routeData ? '100px' : '0')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 780px) {
    margin: 0 0 50px 0;
  }
`;

const UserInfoBanner = styled.div`
  width: 100%;
  padding: 5px 0;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.main};
  border-radius: 10px;
`;

const Route = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px 5px 15px 0;
  margin: 20px 15px;
  border: none;
  border-bottom: 1px solid black;

  &:focus-within {
    outline: none;
    border-bottom: 2px solid black;
    margin: 20px 15px 19px 15px;
  }

  > * {
    border: none;
    &:focus {
      outline: none;
    }
  }
`;

const RouteInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 1.3rem;
  font-weight: 500;
  padding-left: 15px;
  background: ${({ theme }) => theme.background};
`;

const RouteBtn = styled.button`
  background: url(${search}) no-repeat center center;
  background-size: contain;
  height: 30px;
  width: 30px;
`;

const Select = styled.select`
  width: 100%;
  background: url(${dropDown}) no-repeat 95% 50%;
  background-size: 1rem;
  appearance: none;
  margin: 20px 15px;
  padding: 15px;
  font-size: 1.3rem;
  font-weight: 500;
  border: none;
  border-bottom: 1px solid black;
  color: ${(props) => (props.unChosen ? '#e63946' : `${({ theme }) => theme.color}`)};
  &:focus {
    outline: none;
    border-bottom: 2px solid black;
    margin: 20px 15px 19px 15px;
  }
`;

const Option = styled.option``;

const RouteContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const RouteInfo = styled.div`
  width: 300px;
  color: ${({ theme }) => theme.color};
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    padding-left: 10px;
    font-size: 1rem;
    font-weight: normal;
  }
`;

const RouteInfoBanner = styled.div`
  width: 100%;
  margin-bottom: 15px;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.main};
  border-radius: 10px;
`;

const RouteStatus = styled.div`
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.color};
  font-size: 1rem;
  text-align: center;
  margin: 0px auto 15px;
`;

const RouteBackground = styled.div`
  height: 100%;
  width: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: gray;
    width: 5px;
    height: 100%;
    display: flex;
    justify-content: center;
    z-index: 0;
  }
`;

const Stop = styled.div`
  background: gray;
  background-size: contain;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 2px solid grey;
  position: relative;
  margin: 5px 0 5px 0;

  ${(props) => props.pre
    && css`
      background: white;
    `};

  ${(props) => props.current
    && css`
      background: #e63946;
      border: 4px solid #e63946;
    `};

  ${(props) => props.next
    && css`
      background: white;
      border: 4px solid #e9c46a;
    `};

  ${(props) => props.afterNext
    && css`
      background: white;
      border: 4px solid #2a9d8f;
    `};

  &:nth-last-child(1) {
    margin-bottom: 0px;
    height: 40px;
    width: 40px;
  }

  &::after {
    content: '${(props) => props.name}';
    display: block;
    margin-left: 40px;
    margin-top: -2.5px;
    width: 100px;
    height: 30px;
    white-space: nowrap;
  }

  &:last-child::after {
    margin-left: 50px;
    height: 40px;
    display: flex;
    align-items: center;
  }
`;

export default function InBusTrack() {
  const [bus, setBus] = useState([]);
  const [tdxBuses, setTdxBuses] = useState([]);
  const [stopLists, setStopLists] = useState([]);
  const [stopChoses, setStopChoses] = useState([]);
  const [userOnStop, setUserOnStop] = useState('');
  const [userOffStop, setUserOffStop] = useState('');
  const [userDirection, setUserDirection] = useState('');
  const [userPlate, setUserPlate] = useState('');
  const [userRoute, setUserRoute] = useState([]);
  const [error, setError] = useState(false);
  const [busCurrentStop, setBusCurrentStop] = useState(false);
  const [loading, setLoading] = useState(false);

  function getDirection(list, on, off) {
    // 判斷去程、返程
    if (list && list.length !== 0) {
      const arr1 = list.filter((i) => i.StopName === on && i.Direction === 0);
      const arr2 = list.filter((i) => i.StopName === off && i.Direction === 0);
      if (!arr1[0] || !arr2[0]) {
        // 往返站牌可能不同，當上下車站牌之間無法找到關聯時，提早結束
        setError(true);
        return null;
      }
      const direction = arr1[0].StopSequence < arr2[0].StopSequence ? 0 : 1;
      return direction;
    }
    return null;
  }

  async function changeInfo() {
    if (tdxBuses.length === 0 || stopLists.length === 0 || userOnStop === userOffStop) {
      setError(true);
      return;
    }

    const direction = getDirection(stopLists, userOnStop, userOffStop);
    setUserDirection(direction);

    const stops = Object.values(stopLists).filter((i) => i.Direction === direction);
    const onStop = stops.find((i) => i.StopName === userOnStop)?.StopSequence;
    const offStop = stops.find((i) => i.StopName === userOffStop)?.StopSequence;
    const filterRoute = stopLists.filter(
      (i) => i.Direction === direction && i.StopSequence >= onStop && i.StopSequence <= offStop,
    );
    setUserRoute(filterRoute);

    const busFilter = tdxBuses.find(
      (i) => i.Direction === direction
        && i.StopSequence >= onStop
        && i.StopSequence <= offStop
        && i.PlateNumb === userPlate
        && i.A2EventType >= 0,
    );
    setBusCurrentStop(busFilter !== undefined ? busFilter : undefined);
    setError(false);
  }

  async function getRealtimeData() {
    setLoading(true);

    if (bus.length === 0) {
      // alert('請輸入路線後搜尋');
      return;
    }

    const token = await api.getToken();
    const busWithTime = await api.getAllRealTimeNearStop('Taipei', token, bus);

    if (bus.length > 0 && busWithTime.length === 0) {
      alert('請輸入正確的路線名稱');
      return;
    }
    const filterBusWithTime = await busWithTime.filter((a) => a.RouteName.Zh_tw === bus);
    setTdxBuses(filterBusWithTime);
    setUserPlate(userPlate ?? filterBusWithTime[0].PlateNumb);

    setLoading(false);
  }

  async function getData(e) {
    e.preventDefault();

    const token = await api.getToken();
    await getRealtimeData();

    const route = await api.getAllStationStopOfRoute('Taipei', token, bus);
    const filterRoute = route.filter((a) => a.RouteName.Zh_tw === bus);

    const stops = filterRoute.reduce((acc, cur) => {
      cur.Stops.forEach((stop) => {
        acc[`${stop.StopUID}-${stop.Direction}`] = {};
        acc[`${stop.StopUID}-${stop.Direction}`].StationID = stop.StationID;
        acc[`${stop.StopUID}-${stop.Direction}`].StopUID = stop.StopUID;
        acc[`${stop.StopUID}-${stop.Direction}`].StopName = stop.StopName.Zh_tw;
        acc[`${stop.StopUID}-${stop.Direction}`].StopSequence = stop.StopSequence;
        acc[`${stop.StopUID}-${stop.Direction}`].Direction = cur.Direction;
        acc[`${stop.StopUID}-${stop.Direction}`].SubRouteUID = cur.SubRouteUID;
        acc[`${stop.StopUID}-${stop.Direction}`].idx = `${cur.Direction}${stop.StopSequence}`;
      });
      return acc;
    }, {});
    const result = Object.values(stops).sort((a, b) => b.Direction - a.Direction);
    setStopLists(result);

    const show = Object.values(
      result.reduce((acc, cur) => {
        acc[`${cur.StopName}`] = {};
        acc[`${cur.StopName}`].StopName = cur.StopName;
        acc[`${cur.StopName}`].StopSequence = cur.StopSequence;
        acc[`${cur.StopName}`].Direction = cur.Direction;
        acc[`${cur.StopName}`].idx = cur.idx;
        return acc;
      }, {}),
    ).sort((a, b) => a.idx - b.idx);

    setStopChoses(show);

    const initialStop = show.filter((i) => i.Direction === 0);
    setUserOnStop(initialStop[0].StopName);
    setUserOffStop(initialStop[initialStop.length - 1].StopName);

    const direction = await getDirection(
      result,
      initialStop[0].StopName,
      initialStop[initialStop.length - 1].StopName,
    );
    setUserDirection(direction);
    setUserRoute(
      result.filter(
        (i) => i.Direction === direction
          && i.StopSequence >= initialStop[0].StopSequence
          && i.StopSequence <= initialStop[initialStop.length - 1].StopSequence,
      ),
    );

    changeInfo();
    setError(false);
  }

  useEffect(() => {
    changeInfo();
    getRealtimeData();

    const interval = setInterval(() => {
      changeInfo();
      getRealtimeData();
    }, 10000);
    return () => clearInterval(interval);
  }, [userOnStop, userOffStop, userPlate, userDirection]);

  useEffect(() => {
    if (error && bus.length > 0) {
      alert('您選擇的資訊有誤，如上下車相同站牌，或行駛路線不包含您所選擇之站牌');
    }
  }, [error]);

  return (
    <Wrapper>
      <UserInfo routeData={userPlate}>
        <UserInfoBanner>乘車資訊卡(beta)</UserInfoBanner>
        <Route>
          <RouteInput
            placeholder="路線名稱，如306"
            onChange={(e) => {
              setBus(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                getData(e);
              }
            }}
          />
          <RouteBtn
            onClick={(e) => {
              getData(e);
            }}
          />
        </Route>
        <Select
          onChange={(e) => {
            setUserOnStop(e.target.value);
          }}
          value={userOnStop}
        >
          <Option value="" disabled defaultValue>
            上車站牌名稱
          </Option>
          {stopChoses.length
            && stopChoses.map((i) => (
              <Option key={`${i.idx}-${i.StopName}`} value={i.StopName}>
                {i.StopName}
              </Option>
            ))}
        </Select>
        <Select
          onChange={(e) => {
            setUserOffStop(e.target.value);
          }}
          value={userOffStop}
        >
          <Option value="" disabled defaultValue>
            下車站牌名稱
          </Option>
          {stopChoses.length
            && stopChoses.map((i) => (
              <Option key={`${i.idx}-${i.StopName}`} value={i.StopName}>
                {i.StopName}
              </Option>
            ))}
        </Select>
        <Select
          onChange={(e) => {
            setUserPlate(e.target.value);
          }}
          value={userPlate}
          unChosen={userPlate.length === 0 && tdxBuses.length > 0}
        >
          <Option value="" disabled defaultValue>
            車牌號碼
          </Option>
          {tdxBuses.length
            && tdxBuses
              .filter((a) => a.Direction === userDirection)
              .map((i) => (
                <Option key={i.PlateNumb} value={i.PlateNumb}>
                  {i.PlateNumb}
                </Option>
              ))}
        </Select>
      </UserInfo>
      {userPlate && (
        <RouteContainer>
          <RouteInfoBanner>實時公車路線圖</RouteInfoBanner>
          <RouteInfo>
            {tdxBuses.length ? tdxBuses[0].RouteName.Zh_tw : ''}
            <span>{userPlate || ''}</span>
          </RouteInfo>
          <RouteBackground>
            {busCurrentStop !== undefined
              && userRoute?.map((i) => (
                <Stop
                  key={`${i.StopUID}`}
                  name={i.StopName}
                  pre={i.StopSequence < busCurrentStop.StopSequence}
                  current={i.StopUID === busCurrentStop.StopUID}
                  next={i.StopSequence === busCurrentStop.StopSequence + 1}
                  afterNext={i.StopSequence === busCurrentStop.StopSequence + 2}
                />
              ))}
          </RouteBackground>
          <RouteStatus>
            {busCurrentStop === undefined ? '指定車牌尚未行經區間站牌內' : ''}
            <br />
            {busCurrentStop === undefined ? '請確認乘坐車牌是否正確' : ''}
            {busCurrentStop !== undefined && tdxBuses.length
              ? `資料更新於 ${busCurrentStop.SrcUpdateTime.replace('T', ' ').replace(
                '+08:00',
                ' ',
              )}`
              : ''}
          </RouteStatus>
          {busCurrentStop && (
            <ProgressAdjust>
              <ProgressBar loading={loading} data={tdxBuses} />
            </ProgressAdjust>
          )}
        </RouteContainer>
      )}
    </Wrapper>
  );
}

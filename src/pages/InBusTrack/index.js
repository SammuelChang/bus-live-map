/* eslint-disable no-alert */
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components/macro';
import Swal from 'sweetalert2';
import api from '../../utils/api';
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
  min-height: calc(100vh - 120px);
  max-width: 100vw;
  padding: 50px 0;
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
  width: 300px;
  height: 100%;
  display: flex;
  margin-right: ${(props) => (props.routeData ? '80px' : '0')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 780px) {
    margin: 0 0 50px 0;
  }

  > * {
    width: 400px;
  }
`;

const UserInfoBanner = styled.div`
  width: 100%;
  height: 50px;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  background: ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.background};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Block = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  color: ${(props) => props.color};

  &::before {
    content: '${(props) => props.userOrder}';
    min-width: 30px;
    min-height: 30px;
    color: ${({ theme }) => theme.main};
    background: ${({ theme }) => theme.primary};
    font-weight: bold;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    visibility: ${(props) => (props.noDot ? 'hidden' : 'visible')};
  }
`;

const Label = styled.h5`
  min-width: 80px;
  font-size: 1rem;
  text-align: center;
  margin-right: 10px;

  ${(props) => props.unChosen
    && css`
      color: #e63946;
    `};
`;

const Remind = styled.table`
  color: gray;
  font-size: 0.8rem;
  margin-left: 5px;

  tr {
    width: 100%;
  }
`;

const Route = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px 5px 15px 0;
  margin-top: 15px;
  border: none;

  &::before {
    content: '1';
    min-width: 30px;
    min-height: 30px;
    color: ${({ theme }) => theme.main};
    background: ${({ theme }) => theme.primary};
    font-weight: bold;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
  }
`;
const RouteInputContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.color};

  > * {
    border: none;
    &:focus {
      outline: none;
    }
  }

  &:focus-within {
    outline: none;
    border-bottom: 2px solid ${({ theme }) => theme.color};
    margin-bottom: -1px;
  }
`;

const RouteInput = styled.input`
  width: 100%;
  height: 100%;
  min-height: 40px;
  font-size: 1rem;
  font-weight: 500;
  padding-left: 5px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
`;

const RouteBtn = styled.button`
  background: url(${({ theme }) => theme.search}) no-repeat center center;
  background-size: contain;
  min-height: 30px;
  min-width: 30px;
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
    transition: transform 0.1s;
  }
  &::active {
    transform: scale(0.7);
    transition: transform 0.1s;
  }
`;

const Select = styled.select`
  width: 100%;
  min-width: 160px;
  background: url(${({ theme }) => theme.dropDown}) no-repeat 95% 50%;
  background-size: 1rem;
  appearance: none;
  margin: 20px 0;
  padding: 15px 0;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.color};
  cursor: pointer;
  position: relative;

  &:focus {
    outline: none;
    ${'' /* border-bottom: 1px solid black; */}
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
  align-items: baseline;
  justify-content: center;
  margin-bottom: 10px;

  span {
    padding-left: 10px;
    font-size: 1rem;
    font-weight: normal;
  }
`;

const RouteInfoBanner = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 15px;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  background: ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.background};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: 50px;

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
  border: 4px solid grey;
  position: relative;
  margin: 5px 0 5px 0;
  display: flex;
  align-items: center;

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
    width: 100px;
    height: 30px;
    margin-top: 7px;
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
  const [userOnStop, setUserOnStop] = useState('on');
  const [userOffStop, setUserOffStop] = useState('off');
  const [userDirection, setUserDirection] = useState('');
  const [userPlate, setUserPlate] = useState('');
  const [userRoute, setUserRoute] = useState([]);
  const [error, setError] = useState(false);
  const [busCurrentStop, setBusCurrentStop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userStopPlate, setUserStopPlate] = useState('');

  const locateCurrentPosition = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords);
      },
      (e) => {
        reject(e);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
      },
    );
  });

  async function getUserNearbyStop(stops, userBuses) {
    const userPosition = await locateCurrentPosition();

    if (userPosition === undefined) {
      return null;
    }

    let userCurrentStop;
    let userCurrentStopToNearbyStop = Math.sqrt(
      (stops[0].PositionLat - userPosition.latitude) ** 2
        + (stops[0].PositionLon - userPosition.longitude) ** 2,
    );

    stops.forEach((i) => {
      if (
        Math.sqrt(
          (i.PositionLat - userPosition.latitude) ** 2
            + (i.PositionLon - userPosition.longitude) ** 2,
        ) < userCurrentStopToNearbyStop
      ) {
        userCurrentStop = i.StopName;
        userCurrentStopToNearbyStop = Math.sqrt(
          (i.PositionLat - userPosition.latitude) ** 2
            + (i.PositionLon - userPosition.longitude) ** 2,
        );
      }
    });
    const result = [
      userCurrentStop,
      userBuses
        .filter((a) => a.Direction === userDirection)
        .find((i) => i.StopName.Zh_tw === userCurrentStop)?.PlateNumb,
    ];
    return result;
  }

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

  async function getRealtimeData() {
    // 取得車輛即時資訊
    setLoading(true);

    if (bus.length === 0) {
      // alert('請輸入路線後搜尋');
      return;
    }

    const token = await api.getToken();
    const busWithTime = await api.getAllRealTimeNearStop('Taipei', token, bus);

    if (bus.length > 0 && busWithTime.length === 0) {
      Swal.fire({
        title: '請輸入正確的路線名稱',
        text: 'Sorry...目前僅能搜尋行經台北市區之公車',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const filterBusWithTime = await busWithTime.filter((a) => a.RouteName.Zh_tw === bus);
    setTdxBuses(filterBusWithTime);

    const stops = Object.values(stopLists).filter((i) => i.Direction === userDirection);
    const onStop = stops.find((i) => i.StopName === userOnStop)?.StopSequence;
    const offStop = stops.find((i) => i.StopName === userOffStop)?.StopSequence;
    const busFilter = filterBusWithTime.find(
      (i) => i.Direction === userDirection
        && i.StopSequence >= onStop
        && i.StopSequence <= offStop
        && i.PlateNumb === userPlate
        && i.A2EventType >= 0,
    );

    setBusCurrentStop(busFilter);
    setLoading(false);
  }

  async function changeInfo() {
    const direction = getDirection(stopLists, userOnStop, userOffStop);
    setUserDirection(direction);

    const stops = Object.values(stopLists).filter((i) => i.Direction === direction);
    const onStop = stops.find((i) => i.StopName === userOnStop)?.StopSequence;
    const offStop = stops.find((i) => i.StopName === userOffStop)?.StopSequence;
    const filterRoute = stopLists.filter(
      (i) => i.Direction === direction && i.StopSequence >= onStop && i.StopSequence <= offStop,
    );
    setUserRoute(filterRoute);

    setError(false);
  }

  async function getData(e) {
    e.preventDefault();
    if (bus.length === 0) {
      Swal.fire({
        title: '請輸入路線名稱',
        confirmButtonColor: '#3085d6',
        width: '350px',
      });
      return;
    }

    const token = await api.getToken();
    const busWithTime = await api.getAllRealTimeNearStop('Taipei', token, bus);

    if (bus.length > 0 && busWithTime.length === 0) {
      Swal.fire({
        title: '請輸入正確的路線名稱',
        text: 'Sorry...目前僅能搜尋行經台北市區之公車',
        confirmButtonColor: '#3085d6',
      });
      return;
    }
    const route = await api.getAllStationStopOfRoute('Taipei', token, bus);
    const filterRoute = route.filter((a) => a.RouteName.Zh_tw === bus);

    const stops = filterRoute.reduce((acc, cur) => {
      cur.Stops.forEach((stop) => {
        const key = `${stop.StopUID}-${stop.Direction}`;
        acc[key] = {};
        acc[key].StationID = stop.StationID;
        acc[key].StopUID = stop.StopUID;
        acc[key].StopName = stop.StopName.Zh_tw;
        acc[key].StopSequence = stop.StopSequence;
        acc[key].Direction = cur.Direction;
        acc[key].SubRouteUID = cur.SubRouteUID;
        acc[key].idx = `${cur.Direction}${stop.StopSequence}`;
        acc[key].PositionLat = stop.StopPosition.PositionLat;
        acc[key].PositionLon = stop.StopPosition.PositionLon;
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

  useEffect(() => {
    if (userRoute.length > 0 && tdxBuses.length > 0) {
      getUserNearbyStop(userRoute, tdxBuses).then((p) => {
        setUserStopPlate(p[1]);
      });
    }
  }, [userRoute, tdxBuses]);

  return (
    <Wrapper>
      <UserInfo routeData={userPlate}>
        <UserInfoBanner>目前搭乘公車</UserInfoBanner>
        <Route>
          <Label>路線名稱</Label>
          <RouteInputContainer>
            <RouteInput
              placeholder="306"
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
          </RouteInputContainer>
        </Route>
        <Block userOrder="2">
          <Label>上車站牌</Label>
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
        </Block>
        <Block userOrder="3">
          <Label>下車站牌</Label>
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
        </Block>
        <Block userOrder="4">
          <Label>
            {/* unChosen={userPlate.length === 0 && tdxBuses.length > 0} */}
            車牌號碼
          </Label>
          <Select
            onChange={(e) => {
              setUserPlate(e.target.value);
            }}
            value={userPlate}
          >
            <Option value="" disabled defaultValue />
            {tdxBuses.length
              && tdxBuses
                .filter((a) => a.Direction === userDirection)
                .map((i) => (
                  <Option key={i.PlateNumb} value={i.PlateNumb}>
                    {i.PlateNumb}
                    {i.PlateNumb === userStopPlate ? ' 您可能搭乘的車輛' : ''}
                  </Option>
                ))}
          </Select>
        </Block>
        <Block noDot>
          <Remind>
            <tbody>
              <tr>
                <td style={{ width: '120px' }}>※ 您可能搭乘的車輛</td>
                <td>{userStopPlate?.length > 0 ? `${userStopPlate}` : '偵測中'}</td>
              </tr>
              <tr>
                <td style={{ width: '120px' }}>※ 常見車牌位置</td>
                <td>
                  1.司機右上方中央看板
                  <br />
                  2.車內乘客後門正上方
                  <br />
                  3.車外正前方、正後方、右側後方
                </td>
              </tr>
            </tbody>
          </Remind>
        </Block>
      </UserInfo>
      {userPlate && (
        <RouteContainer>
          <RouteInfoBanner>即時路線圖</RouteInfoBanner>
          <RouteInfo>
            {tdxBuses.length ? tdxBuses[0].RouteName.Zh_tw : ''}
            <span>{userPlate || ''}</span>
          </RouteInfo>
          <RouteBackground>
            {busCurrentStop !== undefined
              && userRoute
                ?.filter((f) => f.StopSequence >= busCurrentStop.StopSequence - 1)
                .map((i) => (
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
            {!loading && busCurrentStop === undefined ? '指定車牌尚未行經區間站牌內' : ''}
            <br />
            {!loading && busCurrentStop === undefined ? '請確認乘坐車牌是否正確' : ''}
            {busCurrentStop !== undefined && tdxBuses.length
              ? `車機更新時間：${busCurrentStop.SrcUpdateTime.replace('T', ' ').replace(
                '+08:00',
                ' ',
              )}`
              : ''}
            <br />
            {busCurrentStop !== undefined && tdxBuses.length
              ? `網頁更新時間：${busCurrentStop.UpdateTime.replace('T', ' ').replace(
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

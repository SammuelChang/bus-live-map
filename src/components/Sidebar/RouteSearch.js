import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styled, { css } from 'styled-components/macro';
import heart from '../../images/heart.png';

const Wrapper = styled.div`
  display: flex;
  margin: 0 5px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  min-width: 300px;

  @media (max-width: 780px) {
    min-width: 100%;
    padding: 10px;
    margin: 0;
    width: 100vw;
  }
`;

const SearchContainer = styled.form`
  min-height: 50px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  .react-select__placeholder {
    color: ${({ theme }) => theme.primary};
  }
  .react-select__control {
    cursor: pointer;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    opacity: 1;
    z-index: 5;
  }
  .react-select__menu {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
  }
  .react-select__option--is-focused {
    border: none;
    outline: none;
    background: none;
  }
  .react-select__option--is-selected {
    background: #ffc94a;
    color: #363537;
  }
  .react-select__option--is-hovered {
    border-bottom: 1px solid ${({ theme }) => theme.color};
  }
  .react-select__control {
    outline: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid ${({ theme }) => theme.color};
    box-shadow: none;
    font-size: 1rem;
    font-weight: normal;
    input {
      color: unset;
      color: ${({ theme }) => theme.primary} !important;
    }
  }
  .react-select__indicator-separator {
    display: none;
  }
  .react-select__single-value {
    color: ${({ theme }) => theme.primary};
  }
  .react-select__value-container {
    padding: 0;
  }
`;

const CityStyledSelect = styled(StyledSelect)`
  width: 130px;
  margin-right: 5px;
  .react-select__control {
    font-size: 1rem;
  }
`;

const Status = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #e63946;
  height: 30px;
  width: 100%;
  animation: blur-in-expand 0.4s linear both;
  @keyframes blur-in-expand {
    0% {
      transform: scale(0);
      filter: blur(12px);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      filter: blur(0);
      opacity: 1;
    }
  }
`;

const Direction = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  & * {
    width: 100%;
    height: 40px;
    padding: 10px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    border: 1px solid ${({ theme }) => theme.third};
  }
`;

const Depart = styled.div`
  background: ${({ theme }) => theme.third};
  color: ${({ theme }) => theme.primary};
  ${(props) => props.directionNow === false
    && css`
      width: 30%;
      padding: 0;
      font-size: 0.5rem;
      background: none;
      opacity: 0.5;
      &:hover {
        width: 100%;
        padding: 0;
        font-size: 1rem;
      }
    `};
`;

const Destination = styled.div`
  background: ${({ theme }) => theme.third};
  color: ${({ theme }) => theme.primary};
  ${(props) => props.directionNow === false
    && css`
      width: 30%;
      padding: 0;
      font-size: 0.5rem;
      background: none;
      opacity: 0.5;
      &:hover {
        width: 100%;
        padding: 0;
        font-size: 1rem;
      }
    `};
`;

const Stops = styled.div`
  margin: 10px 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Stop = styled.div`
  font-size: 1rem;
  display: flex;
  height: 30px;
  margin-bottom: 10px;
  position: relative;

  > * {
    display: flex;
    align-items: center;
    cursor: default;
    z-index: 10;
  }

  &:hover::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    left: auto;
    top: 0;
    left: 0;
    background: #878484;
    z-index: 5;
    opacity: 0.1;
    transition: all 0.4s ease-out;
  }
`;

const StopName = styled.div`
  text-align: left;
  width: 60%;
  font-weight: bold;
  padding-left: 5px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: auto 0;
`;

const StopTime = styled.div`
  width: 30%;
  white-space: nowrap;
  padding-left: ${(props) => (props.coming ? '0' : '2px')};
  color: ${({ theme }) => theme.color};
  color: ${(props) => (props.coming ? '#e63946' : '')};
  font-weight: ${(props) => (props.coming ? 'bold' : 'normal')};

  span {
    font-size: 0.5rem;
    margin-left: 5px;
  }
`;

const Collect = styled.button`
  background: url(${({ theme }) => theme.heart}) no-repeat center center;
  background-size: contain;
  width: 20px;
  height: 100%;
  border: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    animation: scale-up 0.5s linear both;
  }

  @keyframes scale-up {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }

  ${(props) => props.loved
    && css`
      background: url(${heart}) no-repeat center center;
      background-size: contain;
      animation: scale-up 0.5s linear both;
    `}
`;

const ProgressContainer = styled.div`
  height: 20px;
  width: 100%;
  z-index: 100;
  margin: auto 0;
`;

const Progress = styled.div`
  background: rgba(0, 0, 0, 0.1);
  justify-content: flex-start;
  border-radius: 100px;
  align-items: center;
  position: relative;
  display: flex;
  height: 5px;
  position: relative;

  ${
  '' /* ${(props) => props.loading
    && css`
      background: #e63946;
      animation: shine 0.5s linear forwards infinite;
      @keyframes shine {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `} */
}
`;

const ProgressValue = styled.div`
  animation: ${(props) => (props.run ? 'load' : '')} 10s linear forwards;
  box-shadow: 0 10px 40px -10px ${({ theme }) => theme.color};
  border-radius: 100px;
  background: ${({ theme }) => theme.color};
  height: 4px;
  width: 0;

  @keyframes load {
    0% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }
`;

export default function RouteSearch({
  displayBus,
  setDisplayBus,
  searchRoute,
  mergeStation,
  direction,
  setDirection,
  wrongInput,
  loading,
  cityRouteLists,
  setOnRunCity,
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
        <CityStyledSelect
          classNamePrefix="react-select"
          options={[
            { value: 'Taipei', label: '台北市' },
            { value: 'NewTaipei', label: '新北市' },
          ]}
          defaultValue={{ value: 'Taipei', label: '台北市' }}
          styles={{
            menu: (provided) => ({ ...provided, zIndex: 9999 }),
            control: (base) => ({ ...base, border: 0, boxShadow: 'none' }),
          }}
          onChange={(e) => {
            setOnRunCity(e.value);
          }}
        />
        <StyledSelect
          classNamePrefix="react-select"
          placeholder={displayBus ? `${displayBus}` : '請輸入路線'}
          options={cityRouteLists}
          styles={{
            menu: (provided) => ({ ...provided, zIndex: 9999 }),
            control: (base) => ({ ...base, border: 0, boxShadow: 'none' }),
          }}
          ref={busRef}
          type="text"
          onChange={(e) => {
            searchRoute(e.value);
            setDisplayBus(e.value);
          }}
          // onKeyPress={(e) => {
          //   if (e.key === 'Enter') {
          //     e.preventDefault();
          //     searchRoute(e.value);
          //     setDisplayBus(e.value);
          //   }
          // }}
        />
        {/* <SearchButton
          onClick={() => {
            searchRoute(busRef.current.value);
            setDisplayBus(busRef.current.value);
          }}
        /> */}
      </SearchContainer>
      <Status>{wrongInput && '處理異常，請再試一次'}</Status>
      {!!mergeStation.length && (
        <Direction>
          <Depart onClick={() => setDirection(0)} directionNow={direction === 0}>
            往
            {mergeStation.length ? mergeStation[0].DestinationStopNameZh : '終點站'}
          </Depart>
          <Destination onClick={() => setDirection(1)} directionNow={direction === 1}>
            往
            {mergeStation.length ? mergeStation[0].DepartureStopNameZh : '起點站'}
          </Destination>
        </Direction>
      )}
      <Stops>
        {mergeStation
          .filter((i) => i.Direction === direction)
          .map((stop) => (
            <Stop key={stop.StopUID}>
              <StopName>{stop.StopName.Zh_tw}</StopName>
              <StopTime coming={stop.EstimateTime <= 120}>
                {stop.EstimateTime === undefined && '未發車'}
                {stop.EstimateTime >= 0 && stop.EstimateTime <= 60 && '進站中'}
                {stop.EstimateTime > 60 && stop.EstimateTime <= 120 && '將進站'}
                {stop.EstimateTime > 120 && (
                  <>
                    {Math.floor(stop.EstimateTime / 60)}
                    <span>分</span>
                  </>
                )}
              </StopTime>
              <Collect
                onClick={() => clickHandler(stop.RouteUID, stop.StopUID)}
                loved={collectList.find(
                  (c) => c.RouteUID === stop.RouteUID
                    && c.StopUID === stop.StopUID
                    && c.direction === direction,
                )}
              />
            </Stop>
          ))}
      </Stops>
      <ProgressContainer>
        <Progress loading={loading ? 1 : undefined}>
          <ProgressValue run={!loading && mergeStation.length !== 0} />
        </Progress>
      </ProgressContainer>
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
  wrongInput: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  cityRouteLists: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setOnRunCity: PropTypes.func.isRequired,
};

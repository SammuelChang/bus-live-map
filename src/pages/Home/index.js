/* eslint-disable no-unused-vars */
import styled from 'styled-components/macro';
import { Link } from 'react-scroll';
import { useRef, useState, useEffect } from 'react';
import traffic from '../../images/traffic.jpg';
import arrowLight from '../../images/arrow-light.png';
import arrowDark from '../../images/arrow-dark.png';
import missing from '../../images/missing.jpg';
import busMarker from '../../images/bus-marker.png';
import busStop from '../../images/bus-stop-empty.png';
import featureRoute from '../../images/feature-route.png';
import featureCollection from '../../images/feature-collection.png';
import featureCity from '../../images/feature-city.png';
import featureNearby from '../../images/feature-nearby.png';
import info from '../../images/info.png';

const Wrapper = styled.div`
  width: 100vw;
  height: calc(400vh - 120px);
`;

const NextPage = styled.div`
  background: url(${(props) => (props.light ? arrowLight : arrowDark)});
  background-position: center top;
  background-repeat: no-repeat;
  background-size: contain;
  height: 50px;
  width: 50px;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  margin-left: -25px;

  animation-duration: 10s;
  animation-delay: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: shake-vertical;
  @keyframes shake-vertical {
    0%,
    100% {
      transform: translateY(0);
    }
    10%,
    30%,
    50%,
    70% {
      transform: translateY(-8px);
    }
    20%,
    40%,
    60% {
      transform: translateY(8px);
    }
    80% {
      transform: translateY(6.4px);
    }
    90% {
      transform: translateY(-6.4px);
    }
  }
`;

const Cover = styled.div`
  position: relative;
  background: url(${missing});
  background-position: center 25%;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.9;
  box-shadow: 0 5px 5px 0 white inset;

  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const CoverTitle = styled.div`
  font-size: 8vw;
  font-weight: bold;
  opacity: 0.7;
  border-radius: 5px;
  color: #fff;
  background: black;
  cursor: default;
  user-select: none;
  padding: 20px;
  margin-left: -50%;
  margin-top: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubCover = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border: 1px solid white;
`;

const SubCoverTitle = styled.div`
  font-size: 6rem;
  font-weight: bold;
  margin-bottom: 50px;
  animation: ${(props) => (props.isVisible ? 'effect' : '')} 3s ease infinite,
    ${(props) => (props.isVisible ? 'scale' : '')} 1.5s ease 1;
  transition: 1.5s ease;
  @keyframes scale {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes effect {
    0%,
    75% {
      color: #f5cb5c;
    }

    50% {
      color: #606c38;
    }

    25%,
    100% {
      color: #e63946;
    }
  }
  @media (max-width: 780px) {
    font-size: 4rem;
  }
`;

const SubCoverText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  visibility: visible;
  animation: ${(props) => (props.isVisible ? 'scale-up-center' : '')} 3s ease-in-out 1;
  @keyframes scale-up-center {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }
  @media (max-width: 780px) {
    font-size: 1.5rem;
  }
`;

const MainFeature = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border: 1px solid white;
`;

const MainLayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 780px) {
    flex-direction: column;
  }
`;

const MainTextContainer = styled.div`
  display: flex;
  width: 50vw;
  flex-direction: column;
  align-items: center;
  @media (max-width: 780px) {
    height: 50vh;
    width: 100vw;
  }
`;

const MainTitle = styled.div`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 50px;
  @media (max-width: 780px) {
    padding-top: 50px;
    font-size: 3rem;
  }
`;

const MainText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  @media (max-width: 780px) {
    font-size: 1.5rem;
  }
`;

const MainImgMap = styled.div`
  background: url(${({ theme }) => theme.mapScreen});
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 50vw;
  @media (max-width: 780px) {
    width: 100vw;
    height: 50vh;
  }
`;

const MainImgContainer = styled.div`
  display: flex;
  align-items: flex-end;
  position: absolute;
  left: calc(25% - 25px);
  @media (max-width: 780px) {
    left: calc(50% - 50px);
    top: calc(25% - 50px);
  }
`;

const MainImgBus = styled.div`
  background: url(${busMarker});
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: contain;
  height: 70px;
  width: 70px;
  margin-bottom: 5px;

  animation: scale-up-center 3s infinite linear;
  @keyframes scale-up-center {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const MainImgStop = styled.div`
  background: url(${busStop});
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  height: 150px;
  width: 150px;
`;

const FeatureIntro = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  @media (max-width: 780px) {
    height: auto;
  }
`;

const IntroTitle = styled.div`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 50px;
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 780px) {
    padding-top: 50px;
    font-size: 3rem;
  }
`;

const IntroContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const IntroItem = styled.div`
  height: 400px;
  width: 300px;
  @media (max-width: 780px) {
    margin-top: 30px;
  }
`;

const IntroItemTitle = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
`;

const IntroItemImg = styled.div`
  height: 80%;
  width: 100%;
  background: url(${(props) => props.bg}) center center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 5px solid white;
  border-radius: 50px;
  position: relative;
  cursor: pointer;

  &::before {
    content: url(${info});
    position: absolute;
    background-size: contain;
    height: 20px;
    width: 20px;
    top: 20px;
    right: 25px;
  }

  &:hover > * {
    visibility: visible;
    overflow: hidden;
    animation: slide-rotate-horizontal-bottom 0.4s linear both;
    @keyframes slide-rotate-horizontal-bottom {
      100% {
        transform: translateY(0) rotateX(0deg);
      }
      0% {
        transform: translateY(-150px) rotateX(90deg);
      }
    }
  }
`;

const IntroItemImgHover = styled.div`
  visibility: hidden;
  height: 100%;
  width: 100%;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(255, 255, 255, ${(props) => props.opacity ?? 0.75});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const IntroItemImgHoverItem = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
`;

const MouseoverNav = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  text-align: right;
  height: auto;
  width: auto;
  margin: 30px 30px 0 0;
`;

export default function Home() {
  const subCoverRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (subCoverRef.current) {
      observer.observe(subCoverRef.current);
    }

    return () => {
      if (subCoverRef.current) {
        observer.unobserve(subCoverRef.current);
      }
    };
  }, [subCoverRef, options]);

  return (
    <Wrapper>
      <Cover id="cover">
        <CoverTitle>
          公車
          <br />
          難追？
        </CoverTitle>
        <Link activeClass="active" to="sub-cover" spy smooth offset={0} duration={1000}>
          <NextPage light />
        </Link>
      </Cover>
      <SubCover id="sub-cover">
        <SubCoverTitle ref={subCoverRef} isVisible={isVisible}>
          奪回人生主控權
        </SubCoverTitle>
        <SubCoverText isVisible={isVisible}>
          已經在夾縫中求生存了
          <br />
          別讓等公車都如此艱辛
        </SubCoverText>
        <Link activeClass="active" to="main-feature" spy smooth offset={0} duration={1000}>
          <NextPage light />
        </Link>
      </SubCover>
      <MainFeature id="main-feature">
        <MainLayoutContainer>
          <MainImgMap />
          <MainTextContainer>
            <MainTitle>用公車動態改變局勢</MainTitle>
            <MainText>讓公車自動奔來，而非我們追趕公車</MainText>
          </MainTextContainer>
          <MainImgContainer>
            <MainImgBus />
            <MainImgStop />
          </MainImgContainer>
        </MainLayoutContainer>
        <Link activeClass="active" to="feature-intro" spy smooth offset={0} duration={1000}>
          <NextPage light />
        </Link>
      </MainFeature>
      <FeatureIntro id="feature-intro">
        <IntroTitle>主要功能</IntroTitle>
        <IntroContent>
          <IntroItem>
            <IntroItemTitle>路線查詢</IntroItemTitle>
            <IntroItemImg bg={featureRoute}>
              <IntroItemImgHover>
                <IntroItemImgHoverItem>指定路線，隨心所欲更換</IntroItemImgHoverItem>
                <IntroItemImgHoverItem>站牌、公車、路線一覽無遺</IntroItemImgHoverItem>
                <IntroItemImgHoverItem>一鍵切換去程/返程</IntroItemImgHoverItem>
                <IntroItemImgHoverItem>進站站牌特別標註</IntroItemImgHoverItem>
              </IntroItemImgHover>
            </IntroItemImg>
          </IntroItem>
          <IntroItem>
            <IntroItemTitle>收藏站牌</IntroItemTitle>
            <IntroItemImg bg={featureCollection}>
              <IntroItemImgHover opacity={0.9}>
                <IntroItemImgHoverItem>APP老是要你加會員？</IntroItemImgHoverItem>
                <IntroItemImgHoverItem>一指收納常用站牌</IntroItemImgHoverItem>
                <IntroItemImgHoverItem>進站特別提示</IntroItemImgHoverItem>
                <IntroItemImgHoverItem>盡情使用無收藏上限</IntroItemImgHoverItem>
              </IntroItemImgHover>
            </IntroItemImg>
          </IntroItem>
          <IntroItem>
            <IntroItemTitle>全城動態</IntroItemTitle>
            <IntroItemImg bg={featureCity}>
              <IntroItemImgHover>
                <IntroItemImgHoverItem>社畜當久，也想君臨城上？</IntroItemImgHoverItem>
                <IntroItemImgHoverItem>一雙眼睛掌握台北</IntroItemImgHoverItem>
                <IntroItemImgHoverItem>哪裡塞車，立馬現形</IntroItemImgHoverItem>
                <IntroItemImgHoverItem>找到超速公車，開啟尬車模式</IntroItemImgHoverItem>
              </IntroItemImgHover>
            </IntroItemImg>
          </IntroItem>
          <IntroItem>
            <IntroItemTitle>最遠路徑</IntroItemTitle>
            <IntroItemImg bg={featureNearby}>
              <IntroItemImgHover>
                <IntroItemImgHoverItem>想搬家？租屋？換工作？</IntroItemImgHoverItem>
                <IntroItemImgHoverItem>附近沒捷運？住在荒郊野外？</IntroItemImgHoverItem>
                <IntroItemImgHoverItem>一指取得鄰近公車直達終點</IntroItemImgHoverItem>
              </IntroItemImgHover>
            </IntroItemImg>
          </IntroItem>
        </IntroContent>
      </FeatureIntro>
    </Wrapper>
  );
}

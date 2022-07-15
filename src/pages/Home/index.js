import styled from 'styled-components/macro';
import { Link } from 'react-scroll';
import { useRef, useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import busMove from '../../images/bus_move.png';
import grab from '../../images/grab.png';
import busMarker from '../../images/bus-marker.png';
import busStop from '../../images/bus-stop-empty.png';
import featureMap from '../../images/map-feature-light.png';
import featureRoute from '../../images/featureRouteLight.png';
import featureCollection from '../../images/featureCollectionLight.png';
import featureCity from '../../images/featureCityLight.png';
import featureNearby from '../../images/featureNearbyLight.png';
import featureInBus from '../../images/featureInBus.png';
import leadership from '../../images/leadership.png';

const Wrapper = styled.div`
  width: 100%;
  height: calc(800vh - 120px + 50px + 25px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  overflow: hidden;
`;

const NextPage = styled.div`
  background: url(${({ theme }) => theme.backToTop});
  background-position: center top;
  background-repeat: no-repeat;
  background-size: contain;

  height: 40px;
  width: 40px;
  cursor: pointer;

  margin-bottom: 40px;
  z-index: 5;

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
  width: 100vw;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 780px) {
    flex-direction: column;
  }
`;

const CoverTitle = styled.div`
  font-size: 4vw;
  font-weight: bold;
  height: 100px;
  cursor: default;
  user-select: none;
  padding: 0 10px 30px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 780px) {
    align-items: center;
    font-size: 8vw;
    margin: 0;
    height: 100px;
  }
`;

const CoverImgContainer = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  > * {
    display: flex;
    align-items: flex-end;
  }
`;

const Grab = styled.div`
  background: url(${grab});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 3px;
  width: 50px;
  height: 50px;
  margin-right: 20px;
  animation: shake-left-right 0.8s 3s ease-in-out 13;
  @keyframes shake-left-right {
    0%,
    100% {
      transform: rotate(0deg);
      transform-origin: 50% 50%;
    }
    10% {
      transform: rotate(8deg);
    }
    20%,
    40%,
    60% {
      transform: rotate(-10deg);
    }
    30%,
    50%,
    70% {
      transform: rotate(10deg);
    }
    80% {
      transform: rotate(-8deg);
    }
    90% {
      transform: rotate(8deg);
    }
  }
`;

const BusMove = styled.div`
  background: url(${busMove});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 250px;
  height: 150px;
  position: relative;
  animation: moving-bus 5s 3s 2;
  @keyframes moving-bus {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(60vw);
    }
  }
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
  overflow: hidden;
`;

const SubCoverTitle = styled.div`
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  font-size: 6rem;
  font-weight: bold;
  margin-bottom: 50px;
  animation: ${(props) => (props.isVisible ? 'effect' : '')} 3s ease infinite,
    ${(props) => (props.isVisible ? 'scale' : '')} 1.5s ease 1;
  transition: 1.5s ease;
  @keyframes scale {
    0% {
      transform: scale(0);
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

  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const SubCoverText = styled.div`
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  z-index: 3;
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
  @media (max-width: 600px) {
    font-size: 1rem;
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
  overflow: hidden;
`;

const MainLayoutContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 780px) {
    flex-direction: column;
  }
`;

const MainTextContainer = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  padding-left: 20px;
  @media (max-width: 780px) {
    width: 100vw;
    text-align: center;
    align-items: center;
    justify-content: center;
    ${
  '' /* br {
      display: none;
    } */
}
  }
`;

const MainTitle = styled.div`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 50px;
  @media (max-width: 780px) {
    padding-top: 25px;
    font-size: 3rem;
    margin-bottom: 25px;
  }
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const MainText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  @media (max-width: 780px) {
    font-size: 1.5rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const MainImgMap = styled.div`
  background: url(${featureMap});
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  min-height: 50vw;
  min-width: 50vw;
  margin-left: 10vw;
  border: ${({ theme }) => theme.border} 1px solid;
  @media (max-width: 780px) {
    height: 50vw;
    width: 50vw;
    margin-left: 0;
  }
`;

const MainImgContainer = styled.div`
  display: flex;
  align-items: flex-end;
  position: absolute;
  left: calc(25% - 25px);
  margin-left: 10vw;
  @media (max-width: 780px) {
    left: calc(50% - 50px);
    top: calc(25% - 50px);
    margin-left: 0;
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

  animation: zoom-in-bus 3s infinite linear;
  @keyframes zoom-in-bus {
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

const RollingBus = styled(Parallax)`
  position: absolute;
  bottom: 20vh;
  left: 20vw;
  background: url(${busMarker});
  background-size: cover;
  height: 100px;
  width: 100px;
`;

const Leadership = styled(Parallax)`
  position: absolute;
  bottom: 20vh;
  right: 20vw;
  background: url(${leadership});
  background-size: cover;
  height: 100px;
  width: 100px;
  z-index: 2;
`;

const Feature = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 780px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > * {
      margin: 0;
      text-align: center;
    }
  }
`;

const FeatureImg = styled.div`
  background: url(${(props) => props.img}) no-repeat center center;
  background-size: contain;
  width: 40%;
  height: 100%;
  max-height: 400px;
  margin: ${(props) => props.margin};

  @media (max-width: 780px) {
    width: 50vw;
    min-width: 300px;
    height: 50vw;
    min-height: 300px;
    margin: 0;
  }
`;

const FeatureIntro = styled.div`
  margin: ${(props) => props.margin};
  text-align: ${(props) => props.text};
  justify-content: flex-start;
  > * {
    font-weight: bold;
  }

  @media (max-width: 780px) {
    margin: 0;
    justify-content: center;
    text-align: center;
    order: 2;
    margin-bottom: 30px;
  }
`;
const FeatureTitle = styled.div`
  font-size: 3.2rem;
  @media (max-width: 780px) {
    font-size: 2.5rem;
    margin-bottom: 30px;
  }
`;
const FeatureText = styled.div`
  font-size: 2rem;
  opacity: 0.5;
  @media (max-width: 780px) {
    font-size: 1.5rem;
  }
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
        <CoverTitle>這是你每天的生活嗎</CoverTitle>
        <CoverImgContainer>
          <Grab />
          <BusMove />
        </CoverImgContainer>
      </Cover>
      <SubCover id="sub-cover">
        <RollingBus
          translateX={['-600px', '800px']}
          translateY={['0px', '50px']}
          scale={[2, 0]}
          rotate={[1280, 0]}
          easing="easeInQuad"
          rootMargin={{
            top: 100,
            right: 100,
            bottom: 100,
            left: 600,
          }}
        />
        <Leadership scale={[3, 5]} easing="easeInQuad" />
        <SubCoverTitle isVisible={isVisible}>奪回人生主控權</SubCoverTitle>
        <SubCoverText ref={subCoverRef} isVisible={isVisible}>
          已經在夾縫中求生存了
          <br />
          別讓等公車都如此艱辛
        </SubCoverText>
      </SubCover>
      <MainFeature id="main-feature">
        <MainLayoutContainer>
          <MainImgMap />
          <MainTextContainer>
            <MainTitle>
              用公車動態
              <br />
              改變局勢
            </MainTitle>
            <MainText>
              讓公車自動奔來
              <br />
              而非我們追趕公車
            </MainText>
          </MainTextContainer>
          <MainImgContainer>
            <MainImgBus />
            <MainImgStop />
          </MainImgContainer>
        </MainLayoutContainer>
      </MainFeature>
      <Feature>
        <FeatureImg img={featureRoute} margin="0 0 0 100px" />
        <FeatureIntro margin="0 0 0 50px" text="left">
          <FeatureTitle>
            無需下載
            <br />
            即開即用
          </FeatureTitle>
          <FeatureText>動態全掌握+特別提示</FeatureText>
        </FeatureIntro>
      </Feature>
      <Feature>
        <FeatureIntro margin="0 0 0 100px" text="right">
          <FeatureTitle>
            無料收藏
            <br />
            不限數量
          </FeatureTitle>
          <FeatureText>一鍵收納</FeatureText>
        </FeatureIntro>
        <FeatureImg img={featureCollection} margin="0 0 0 50px" />
      </Feature>
      <Feature>
        <FeatureImg img={featureCity} margin="0 0 0 100px" />
        <FeatureIntro margin="0 0 0 50px" text="left">
          <FeatureTitle>
            全市區公車
            <br />
            盡在眼裡
          </FeatureTitle>
          <FeatureText>居高臨下的體驗感</FeatureText>
        </FeatureIntro>
      </Feature>
      <Feature>
        <FeatureIntro margin="0 0 0 100px" text="right">
          <FeatureTitle>
            一班公車
            <br />
            即刻出走
          </FeatureTitle>
          <FeatureText>三秒鐘知道最遠去處</FeatureText>
        </FeatureIntro>
        <FeatureImg img={featureNearby} margin="0 0 0 50px" />
      </Feature>
      <Feature>
        <FeatureImg img={featureInBus} margin="0 0 0 100px" />
        <FeatureIntro margin="0 0 0 50px" text="left">
          <FeatureTitle>
            即便車廂擁擠
            <br />
            從此不再坐過站
          </FeatureTitle>
          <FeatureText>乘坐車輛偵測+路線實況</FeatureText>
        </FeatureIntro>
      </Feature>
      <Link activeClass="active" to="header" spy smooth offset={0} duration={1000}>
        <NextPage down={false} title="回到頂端" />
      </Link>
    </Wrapper>
  );
}

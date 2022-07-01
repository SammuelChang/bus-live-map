import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useState } from 'react';
import busIcon from '../../images/bus_24_2x.png';
import GlobalStyle from '../../globalStyles';

const StyleLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.headerColor};
`;

const Wrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.headerColor};
  height: 120px;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const NavContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 40px;

  @media (max-width: 780px) {
    display: none;
  }
`;

// const HrLine = styled.div`
//   background: #333131;
//   height: 20px;
//   width: 100vw;
// `;

const Brand = styled.div`
  box-sizing: border-box;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 500;
  border-bottom: 1px solid gray;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 780px) {
    margin: 0 20px;
  }
`;

const BrandName = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Logo = styled.div`
  background: url(${busIcon});
  background-repeat: no-repeat;
  background-position: center;
  height: 40px;
  width: 50px;
  animation-iteration-count: 1;
  animation: bounce-top 0.9s linear both;
  @keyframes bounce-top {
    0% {
      transform: translateY(-45px);
      animation-timing-function: ease-in;
      opacity: 1;
    }
    24% {
      opacity: 1;
    }
    40% {
      transform: translateY(-24px);
      animation-timing-function: ease-in;
    }
    65% {
      transform: translateY(-12px);
      animation-timing-function: ease-in;
    }
    82% {
      transform: translateY(-6px);
      animation-timing-function: ease-in;
    }
    93% {
      transform: translateY(-4px);
      animation-timing-function: ease-in;
    }
    25%,
    55%,
    75%,
    87% {
      transform: translateY(0);
      animation-timing-function: ease-out;
    }
    100% {
      transform: translateY(0);
      animation-timing-function: ease-out;
      opacity: 1;
    }
  }
`;

const NavTo = styled.div`
  width: 80px;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin: 0 20px;

  &:hover {
    color: ${({ theme }) => theme.headerHoverColor};
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s linear;
  }

  @media (max-width: 780px) {
    margin: 0 10px;

    &:hover {
      color: ${({ theme }) => theme.hoverColor};
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s linear;
    }
  }
`;

const ThemeToggler = styled.button`
  position: absolute;
  right: 20px;
  top: 55px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: ${({ theme }) => theme.toggleBorder} 0.5px solid;
  background: ${({ theme }) => theme.toggleBackground};
  cursor: pointer;

  &:active {
    animation: scale-up-center 0.4s;
    @keyframes scale-up-center {
      0% {
        transform: scale(0.5);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;

const SideToggler = styled.div`
  background: url(${({ theme }) => theme.menu});
  display: none;
  position: absolute;
  left: 20px;
  top: 55px;
  height: 30px;
  width: 30px;
  background-size: 100%;
  transform: rotate(${(props) => (props.openMenu ? '90deg' : '0deg')});

  &:active {
    animation: blur-out 0.4s linear;
    @keyframes blur-out {
      0% {
        filter: blur(0.01px);
      }
      100% {
        filter: blur(12px);
        opacity: 0;
      }
    }
  }

  @media (max-width: 780px) {
    display: block;
  }
`;

const SideNav = styled.div`
  height: 100vh;
  width: 20vw;
  min-width: 200px;
  margin: 0;
  border-top: ${({ theme }) => theme.toggleBorder} 0.1px solid;
  background: ${({ theme }) => theme.background};
  left: 0;
  position: fixed;
  top: 120px;
  z-index: 1000;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  @media (max-width: 780px) {
    width: 200px;
  }
`;

const SideContent = styled.div`
  & > * {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.hoverColor};
    margin: 10px;
    height: 20px;
  }
`;

// eslint-disable-next-line react/prop-types
function Header({ toggleTheme }) {
  const [menu, setMenu] = useState(false);
  const handleToggle = () => {
    setMenu(!menu);
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <SideNav show={menu} onClick={handleToggle}>
        {/* <SideClose /> */}
        <SideContent>
          <StyleLink to="/live/route">
            <NavTo>路線查詢</NavTo>
          </StyleLink>
          <StyleLink to="/collection">
            <NavTo>收藏站牌</NavTo>
          </StyleLink>
          <StyleLink to="/live/city">
            <NavTo>全城動態</NavTo>
          </StyleLink>
          <StyleLink to="/live/nearbyPath">
            <NavTo>最遠路徑</NavTo>
          </StyleLink>
        </SideContent>
      </SideNav>
      <StyleLink to="/">
        <Brand>
          <BrandName>Live</BrandName>
          <Logo />
          <BrandName>Bus</BrandName>
        </Brand>
      </StyleLink>
      <NavContainer>
        <StyleLink to="/live/route">
          <NavTo>路線查詢</NavTo>
        </StyleLink>
        <StyleLink to="/collection">
          <NavTo>收藏站牌</NavTo>
        </StyleLink>
        <div
          style={{
            width: '300px',
            height: '100px',
          }}
        />
        <StyleLink to="/live/city">
          <NavTo>全城動態</NavTo>
        </StyleLink>
        <StyleLink to="/live/nearbyPath">
          <NavTo>最遠路徑</NavTo>
        </StyleLink>
      </NavContainer>
      <SideToggler onClick={handleToggle} openMenu={menu} />
      <ThemeToggler type="button" label="toggleTheme" onClick={() => toggleTheme()} />
    </Wrapper>
  );
}

export default Header;

import { useLocation, Link } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import GlobalStyle from '../../globalStyles';

const StyleLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.headerColor};
`;

const StyleA = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.headerColor};
`;

const Wrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.headerColor};
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NavContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 90vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 40px;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const Brand = styled.div`
  box-sizing: border-box;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 2rem;
  font-weight: 500;
  border-bottom: 2px solid gray;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const BrandName = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: -5px;
  font-family: 'Oswald', sans-serif;
`;

const Logo = styled.div`
  background: url(${({ theme }) => theme.icon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 40px;
  width: 50px;
  animation-iteration-count: 1;
  animation: zoom-in 3s ease-out both;
  @keyframes zoom-in {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const NavTo = styled.div`
  width: 80px;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin: 0 10px;
  cursor: pointer;
  position: relative;

  ${(props) => props.cur
    && css`
      color: ${({ theme }) => theme.headerHoverColor};
      border-bottom: 1.2px solid gray;
      padding: 0 5px;
      pointer-events: none;
    `}

  &:hover {
    color: ${({ theme }) => theme.headerHoverColor};
    transition: all 0.3s linear;
    padding: 0 5px;
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    border-bottom: 1.2px solid gray;
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  &:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }

  @media (max-width: 1000px) {
    margin: 0 10px;

    &:hover {
      color: ${({ theme }) => theme.hoverColor};
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s linear;
    }
  }
`;

const ThemeToggler = styled.div`
  position: absolute;
  height: 40px;
  width: 40px;
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.themeToggleBg};
  border-radius: 10px;
  background: url(${({ theme }) => theme.themeToggleIcon}) no-repeat center center,
    ${({ theme }) => theme.themeToggleBg};
  background-size: ${({ theme }) => theme.themeToggleSz};
  bottom: 40px;
  right: 20px;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 15px 25px -5px rgba(${({ theme }) => theme.themeToggleBg}, 40%);
    transform: scale(1.03);
  }
  &::active {
    box-shadow: 0px 4px 8px rgba(${({ theme }) => theme.themeToggleBg}, 30%);
    transform: scale(0.97);
  }
`;

const SideToggler = styled.div`
  background: url(${({ theme }) => theme.menu});
  display: none;
  position: absolute;
  left: 20px;
  bottom: 40px;
  height: 30px;
  width: 30px;
  background-size: 100%;
  transform: rotate(${(props) => (props.openMenu ? '90deg' : '0deg')});
  cursor: pointer;
  z-index: 10000;

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

  @media (max-width: 1000px) {
    display: block;
  }
`;

const SideNav = styled.div`
  height: 100vh;
  width: 20vw;
  min-width: 200px;
  margin: 0;
  border: ${({ theme }) => theme.toggleBorder} 0.1px solid;
  background: ${({ theme }) => theme.background};
  left: 0;
  position: absolute;
  top: 0px;
  padding: 120px 0 0 35px;
  z-index: 1000;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  @media (min-width: 1000px) {
    display: none;
  }
  @media (max-width: 1000px) {
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

function Header({ toggleTheme }) {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const handleToggle = () => {
    setMenu(!menu);
  };
  const handleScroll = () => setMenu(false);
  const isMediaMatch = useMediaQuery({ query: '(max-width: 780px)' });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <Wrapper id="header">
      <GlobalStyle />
      <SideNav show={menu} onClick={() => handleToggle(setMenu)}>
        <SideContent>
          <StyleLink to="/live/route">
            <NavTo cur={pathname.includes('route')}>路線查詢</NavTo>
          </StyleLink>
          <StyleLink to="/collection">
            <NavTo cur={pathname.includes('collection')}>收藏站牌</NavTo>
          </StyleLink>
          <StyleLink to="/in-bus-track">
            <NavTo cur={pathname.includes('in-bus-track')}>乘車快報</NavTo>
          </StyleLink>
          {!isMediaMatch && (
            <StyleLink to="/live/city">
              <NavTo cur={pathname.includes('city')}>全城動態</NavTo>
            </StyleLink>
          )}
          <StyleLink to="/live/nearbyPath">
            <NavTo cur={pathname.includes('nearby')}>最遠路徑</NavTo>
          </StyleLink>
          <StyleA href="https://pse.is/4baf7f" target="_blank">
            <NavTo>意見提供</NavTo>
          </StyleA>
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
          <NavTo cur={pathname.includes('route')}>路線查詢</NavTo>
        </StyleLink>
        <StyleLink to="/collection">
          <NavTo cur={pathname.includes('collection')}>收藏站牌</NavTo>
        </StyleLink>
        <StyleLink to="/in-bus-track">
          <NavTo cur={pathname.includes('in-bus-track')}>乘車快報</NavTo>
        </StyleLink>
        <div
          style={{
            minWidth: '250px',
            height: '100px',
          }}
        />
        <StyleLink to="/live/city">
          <NavTo cur={pathname.includes('city')}>全城動態</NavTo>
        </StyleLink>
        <StyleLink to="/live/nearbyPath">
          <NavTo cur={pathname.includes('nearby')}>最遠路徑</NavTo>
        </StyleLink>
        <StyleA href="https://pse.is/4baf7f" target="_blank">
          <NavTo>意見提供</NavTo>
        </StyleA>
      </NavContainer>
      <SideToggler onClick={handleToggle} openMenu={menu} />
      <ThemeToggler
        type="button"
        label="toggleTheme"
        onClick={() => toggleTheme()}
        title="切換色彩"
      />
    </Wrapper>
  );
}

Header.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
};

export default Header;

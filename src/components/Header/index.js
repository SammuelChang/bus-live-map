import { Link } from 'react-router-dom';
import styled from 'styled-components';
import busIcon from '../../images/bus_24_2x.png';
import GlobalStyle from '../../globalStyles';

const StyleLink = styled(Link)`
  text-decoration: none;
  color: #878484;
`;

const Wrapper = styled.div`
  background: #ebebe6;
  color: #878484;
  height: 100px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
`;

const HrLine = styled.div`
  background: #333131;
  height: 20px;
  width: 100vw;
`;

const Brand = styled.div`
  box-sizing: border-box;
  width: 250px;
  height: 100%;
  display: flex;
  flex-wrap: no-wrap;
  margin-left: 15px;
  font-size: 2rem;
  font-weight: 500;
  align-items: flex-end;
  padding-bottom: 35px;
`;

const BrandName = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Logo = styled.div`
  background: url(${busIcon});
  height: 40px;
  width: 40px;
  margin-right: 5px;
`;

const Nav = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 400px;
  margin-right: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-bottom: 35px;
`;

const NavTo = styled.div`
  width: 80px;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin-right: 10px;

  &:hover{
    color: black;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all .1s linear;
  }
`;

function Header() {
  return (
    <>
      <Wrapper>
        <GlobalStyle />
        <StyleLink to="/">
          <Brand>
            <Logo />
            <BrandName>TaipeiBusLive</BrandName>
          </Brand>
        </StyleLink>
        <Nav>
          <StyleLink to="/live"><NavTo>即時位置</NavTo></StyleLink>
          <StyleLink to="/collection"><NavTo>收藏站牌</NavTo></StyleLink>
          <StyleLink to="/advInfo"><NavTo>進階資訊</NavTo></StyleLink>
        </Nav>
      </Wrapper>
      <HrLine />
    </>
  );
}

export default Header;

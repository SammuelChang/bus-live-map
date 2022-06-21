import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 30px;
  font-size: 2rem;
  font-weight: 500;
`;

const Nav = styled.div`
  height: 100%;
  width: 400px;
  margin-right: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const NavTo = styled.div`
  width: 80px;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;

  &:hover{
    font-size: 1.1rem;
    cursor: pointer;
    transition: all .1s linear;
  }
`;

function Header() {
  return (
    <>
      <Wrapper>
        <StyleLink to="/">
          <Brand>
            BusLive
          </Brand>
        </StyleLink>
        <Nav>
          <StyleLink to="/live"><NavTo>即時位置</NavTo></StyleLink>
          <StyleLink to="/collect"><NavTo>收藏站牌</NavTo></StyleLink>
          <StyleLink to="/advInfo"><NavTo>進階資訊</NavTo></StyleLink>
        </Nav>
      </Wrapper>
      <HrLine />
    </>
  );
}

export default Header;

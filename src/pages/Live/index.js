import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyleLink = styled(Link)`
  text-decoration: none;
  color: #878484;
`;

const Wrapper = styled.div`
  width: 50vw;
  background: #ebebe6;
  background-position: center;
  background-repeat: no-repeat;
  height: calc(100vh - 120px);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Func = styled.button`
  background: #333131;
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: none;
  margin-right: 50px;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover{
    animation: rotate-horizontal-center 0.6s;
    @keyframes rotate-horizontal-center{
      0%{transform:rotateX(0)}
      100%{transform:rotateX(-360deg)}
    }
  }
`;

export default function Live() {
  return (
    <Wrapper>
      <StyleLink to="/live/map"><Func>路線查詢</Func></StyleLink>
      <StyleLink to="/live/map"><Func>全城動態</Func></StyleLink>
      <StyleLink to="/live/map"><Func>最遠路徑</Func></StyleLink>
    </Wrapper>
  );
}

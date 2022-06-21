import styled from 'styled-components';

const Wrapper = styled.div`
  height: calc(100vh - 120px);
  background: #ebebe6;
  width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Side = styled.div`
  background: #ebebe6;
  height: 100%;
  width: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 5px;
  overflow: hidden;
  border-right: 1px solid black;
`;

const Feature = styled.div`
  border-radius: 5px; 
  text-align: center;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Search = styled.div`
  width: 100%; 
  height: 100px; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Sidebar() {
  return (
    <Wrapper>
      <Side>
        <Feature>指定路線查詢</Feature>
        <Feature>全市公車動態</Feature>
        <Feature>鄰近公車最遠路徑</Feature>
      </Side>
      <Search>
        搜尋列
      </Search>
    </Wrapper>
  );
}

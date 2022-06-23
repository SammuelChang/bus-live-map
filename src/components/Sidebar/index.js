import { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: calc(100vh - 120px);
  background: #ebebe6;
  width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border: 0.5px solid gray;
`;

const SideNav = styled.div`
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

const SideContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0 5px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: auto;
`;

const SearchContainer = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
`;

const SearchText = styled.input`
  background: none;
  border: none;
  width: 100%;
  height: 50%;
  max-height: 100px;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 10px;
  resize: none;
  border: none;
  overflow: hidden;
  outline: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const BusItem = styled.li`
  padding: 5px;
  margin: 5px 0;
  min-height: 70px;
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 0.1px solid gray;
  border-bottom: 1px solid gray;
`;

const BusInfo = styled.div`
  width: 70%;
`;
const BusName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const BusRoute = styled.div`
  font-size: 0.8rem;
  padding: 5px 0;
`;

const Collect = styled.button`
  height: 15px;
  width: 15px;
  font-size: 1.2rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: center;
`;

export default function Sidebar({ searchRoute }) {
  console.log('Sidebar Component');

  const busRef = useRef('');

  return (
    <Wrapper>
      <SideNav>
        <Feature>路線查詢</Feature>
        <Feature>全城動態</Feature>
        <Feature>最遠路徑</Feature>
      </SideNav>
      <SideContent>
        <SearchContainer>
          <SearchText placeholder="請輸入路線，如307" ref={busRef} />
          <SearchButton onClick={() => searchRoute(busRef.current.value)}>查詢</SearchButton>
        </SearchContainer>
        <BusItem>
          <BusInfo>
            <BusName>307</BusName>
            <BusRoute>天堂-地獄</BusRoute>
          </BusInfo>
          <Collect>❤️</Collect>
        </BusItem>
      </SideContent>
    </Wrapper>
  );
}

Sidebar.propTypes = {
  searchRoute: PropTypes.func.isRequired,
};

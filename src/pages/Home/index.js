import styled from 'styled-components';
import traffic from '../../images/traffic.jpg';

const Wrapper = styled.div`
  background: url(${traffic}), #ebebe6;
  background-position: center;
  background-repeat: no-repeat;
  height: calc(100vh - 120px);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  text-align: center;
  font-size: 8rem;
  color: #000;
  background: #fff;
  opacity: 0.7;
  border-radius: 50px;
`;

export default function Home() {
  return (
    <Wrapper>
      <Content>公車塞在路上？</Content>
    </Wrapper>
  );
}

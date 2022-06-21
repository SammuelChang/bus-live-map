import styled from 'styled-components';

const Wrapper = styled.div`
  background: url(https://gastrogays.com/wp-content/uploads/2018/09/taiwan-1-338.jpg), #ebebe6;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.5;
  height: calc(100vh - 120px);
  width: 100vw;
`;

export default function Home() {
  return (
    <Wrapper />
  );
}

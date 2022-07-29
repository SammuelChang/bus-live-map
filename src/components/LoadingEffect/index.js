import styled from 'styled-components';

// const LoadingContainer = styled.div`
//   height: 100%;
//   width: 100%;
//   background: white;
//   opacity: 0.9;
//   z-index: 100;
//   position: absolute;
// `;
const Loading = styled.div`
  display: inline-block;
  width: max-content;
  min-width: 40px;
  height: max-content;
  min-height: 40px;
  position: absolute;
  bottom: 20px;
  right: 20px;

  & > * {
    position: absolute;
    border: 4px solid #000;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  &:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    4.9% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    5% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;

export default function LoadingEffect() {
  return (
    // <LoadingContainer>
    <Loading>
      <div />
      <div />
    </Loading>
    // </LoadingContainer>
  );
}

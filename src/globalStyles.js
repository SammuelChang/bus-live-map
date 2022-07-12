import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
     *  {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    &::-webkit-scrollbar {
    display: none;
    }
    
    ${
  '' /* &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${({ theme }) => theme.background};
  }

  &::-webkit-scrollbar {
    width: 6px;
    background-color: ${({ theme }) => theme.background};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: ${({ theme }) => theme.headerColor};
  } */
}
`;

export default GlobalStyle;

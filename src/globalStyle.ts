import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    color:  black;
    font-family: 'Poppins', sans-serif;
  }

  h1,h2,h3,h4,h5,h6 {
    font-weight: 500;
  }
  
`;

import { createGlobalStyle } from 'styled-components';


export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background-color: #1B1725;
    color: #FFF;
    -webkit-font-smothing: antialiased;
  }

  body, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3 {
    font-weight: 500;
  }
`;

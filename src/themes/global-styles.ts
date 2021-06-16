import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.palette.body };
    color: ${({ theme }) => theme.palette.text };
    font-family: Open-Sans, Helvetica, Sans-Serif;

    h1 {
        font-size: 3.5rem;
    }
  }
`

export default GlobalStyle

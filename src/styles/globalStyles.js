import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

html {
  width: 100%;
}

body {
    margin: 0;
    min-height: 100vh;
    background-color: #FFFFFF;
    box-sizing: border-box; 
    font-family: 'Helvetica Neue', 'Arial', sans-serif;
    overflow-x: hidden;
    position: relative;
    -webkit-box-sizing: border-box; 
    -moz-box-sizing: border-box; 
    box-sizing: border-box;   
    padding-bottom: 10rem;
    max-width: 100%;
}

button {
    cursor: pointer;
    background-color: #49abcc;
    border: 1px solid white;
    color: white;
    transition: all .2s ease-in-out;
  }

  button:hover {
    transform: scale(1.05);
  }
`

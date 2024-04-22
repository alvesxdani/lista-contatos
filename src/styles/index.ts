import { ButtonHTMLAttributes } from "react";
import styled, { createGlobalStyle } from "styled-components";
import colors from "./colors";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }

  body {
    color: ${colors.black};
  }
`;

export const Container = styled.div`
  width: 100%;
  padding: 1rem;
`

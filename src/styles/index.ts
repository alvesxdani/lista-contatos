import styled, { createGlobalStyle } from 'styled-components'
import colors from './colors'
import { ButtonHTMLAttributes } from 'react'

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color: 'red' | 'black' | 'grey'
}

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
`

export const StyledButton = styled.button<TButtonProps>`
  background: ${(props) =>
    props.color === 'red'
      ? colors.red
      : props.color === 'black'
      ? colors.black
      : props.color === 'grey'
      ? colors.grey
      : '#fff'};
      color: #fff;
      padding: 12px 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
`

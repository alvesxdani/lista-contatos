import React, { ButtonHTMLAttributes } from 'react'
import { StyledButton } from './styles'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    color: 'red' | 'black' | 'grey';
};

const Button = ({ type, disabled, children, color, onClick }: Props) => {
  return (
    <StyledButton type={type} color={color} onClick={onClick} disabled={disabled}>{children}</StyledButton>
  )
}

export default Button
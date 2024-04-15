import React, { ButtonHTMLAttributes } from 'react'
import { StyledButton, TButtonProps } from '../../styles'

const Button = ({ type, disabled, children, color, onClick }: TButtonProps) => {
  return (
    <StyledButton type={type} color={color} onClick={onClick} disabled={disabled}>{children}</StyledButton>
  )
}

export default Button
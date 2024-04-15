import React, { InputHTMLAttributes } from 'react'
import { StyledInput } from './styles'

type InputProps = InputHTMLAttributes<HTMLButtonElement> & {
  label?: string
}

const Input = ({ id, type, placeholder, label }: InputProps) => {
  return (
    <StyledInput>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={id} placeholder={placeholder} />
    </StyledInput>
  )
}

export default Input
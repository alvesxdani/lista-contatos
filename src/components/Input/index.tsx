import React, { InputHTMLAttributes } from 'react'
import { StyledInput } from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const Input = ({ id, type, placeholder, label, name, ...props }: InputProps) => {
  return (
    <StyledInput>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={name} placeholder={placeholder} {...props} />
    </StyledInput>
  )
}

export default Input
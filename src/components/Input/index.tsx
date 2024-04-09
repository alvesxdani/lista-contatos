import React, { InputHTMLAttributes } from 'react'
import { StyledInput } from './styles'

type InputProps = InputHTMLAttributes<{
  type: string
  value: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: (e: React.MouseEvent) => void
}>

const Input = ({ name, id, type, placeholder }: InputProps) => {
  return (
    <StyledInput>
      <input type={type} id={id} name={name} placeholder={placeholder} />
    </StyledInput>
  )
}

export default Input
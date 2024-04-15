import React, { InputHTMLAttributes, forwardRef } from 'react'
import { StyledInput } from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, placeholder, label, name, ...props }, ref) => {
    return (
      <StyledInput>
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </StyledInput>
    )
  },
)

export default Input

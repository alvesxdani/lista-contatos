import React, { HTMLAttributes } from 'react'
import { MdError } from 'react-icons/md'
import { FaCheckCircle } from 'react-icons/fa'
import { StyledMsg } from './styles'


export type TMsg = HTMLAttributes<HTMLDivElement> & {
  type: 'error' | 'success'
}

const Msg = ({ type, children }: TMsg) => {
  return (
    <StyledMsg type={type}>
      {type === 'error' && <MdError size={20} />}
      {type ==='success' && <FaCheckCircle size={20} />}
      {children}
    </StyledMsg>
  )
}

export default Msg

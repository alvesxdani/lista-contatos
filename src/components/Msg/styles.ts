import styled from 'styled-components'
import { TMsg } from '.'
import colors from '../../styles/colors'

export const StyledMsg = styled.div<TMsg>`
  color: #fff;
  width: 100%;
  padding: 0.7rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  ${(props) =>
    props.type === 'error'
      ? `background: ${colors.red}`
      : props.type === 'success'
      ? `background: ${colors.green}`
      : ''}
`

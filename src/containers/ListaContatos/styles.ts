import styled from 'styled-components'
import colors from '../../styles/colors'

export const StyledListaContatos = styled.ul`
  padding: 1rem;
  list-style: none;
  li {
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 1rem;
    background-color: ${colors.grey};
    padding: 1rem;
    margin-bottom: 2rem;
    border-radius: 0.5rem;
  }
`

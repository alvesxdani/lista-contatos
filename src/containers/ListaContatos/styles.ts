import styled from "styled-components";
import colors from "../../styles/colors";

export const StyledListaContatos = styled.div`
  width: 100%;
  padding: 1rem;
  ul {
    padding: 1rem;
    list-style: none;
    li {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background-color: ${colors.grey};
      padding: 1rem;
      margin-bottom: 2rem;
      border-radius: 0.5rem;
    }
  }
`
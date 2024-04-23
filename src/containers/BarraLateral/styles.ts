import styled from "styled-components";
import colors from "../../styles/colors";


export const StyledBarraLateral = styled.div`
  height: 90dvh;
  border-right: 1px solid ${colors.grey};
  padding: 1rem;
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
    a {
      color: ${colors.black};
      list-style: none;
      padding: 0.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1rem;
        text-decoration: none;
      path {
        color: ${colors.red};
      }
    }
  }
  @media (max-width: 40rem) {
    height: auto;
  }
`
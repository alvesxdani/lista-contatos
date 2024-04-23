import styled from "styled-components";

export const StyledContainerHome = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.7fr 3fr;
  justify-items: center;
  @media (max-width: 40rem) {
    display: block;
  }
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`

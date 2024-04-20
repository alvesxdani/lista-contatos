import styled from "styled-components";

export const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0rem 0.5rem 0.5rem rgba(0,0,0,0.04);

  .info--user {
     display: flex;
     align-items: center;
     gap: 1.5rem;
     img {
       width: 20px;
       height: 20px;
       border-radius: 50%;
       margin-right: -0.9rem;
     }
 
  }
`
import styled from "styled-components";
import colors from "../../styles/colors";

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  width: 100%;
  font-weight: bold;
  margin-bottom: 1.2rem;
  input {
    padding: 0.7rem;
    border-radius: 0.5rem;
    border: 1px solid ${colors.grey};
    background: #f7f5f5;
    width: 100%;
  }
`
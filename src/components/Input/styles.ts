import styled from "styled-components";
import colors from "../../styles/colors";

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  input {
    padding: 0.7rem;
    border-radius: 0.5rem;
    border: 1px solid ${colors.grey};
  }
  `
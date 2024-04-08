import styled from "styled-components";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const StyledLogo = styled.h1`
  color: ${colors.black};
  font-size: 2.5rem;
  font-family: ${fonts.montserrat};
  font-weight: bold;

  span {
    color: ${colors.red};
  }
`
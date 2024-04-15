import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import colors from "../../styles/colors";

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color: "red" | "black" | "grey";
};

export const StyledButton = styled.button<TButtonProps>`
  padding: 12px 10px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  ${(props) => {
    if (props.disabled === true) {
      return `
        background-color: ${colors.grey};
        color: ${colors.black};
        cursor: wait;
      `;
    } else {
      return `
        background-color: ${
          props.color === "red"
            ? colors.red
            : props.color === "black"
            ? colors.black
            : colors.white
        };
        color: ${colors.white};
        cursor: pointer;
      `;
    }
  }};
`;

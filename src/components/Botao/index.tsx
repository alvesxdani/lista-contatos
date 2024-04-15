import React from "react";
import { StyledButton, TButtonProps } from "./style";

const Button = ({ type, disabled=false, children, color, onClick }: TButtonProps) => {
  return (
    <StyledButton
      type={type}
      color={color}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled === true ? 'Carregando...' : 'Entrar'}
    </StyledButton>
  );
};

export default Button;

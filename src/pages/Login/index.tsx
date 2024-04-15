import React from 'react'
import Logo from '../../components/Logo'
import { StyledContainer } from './styles'
import FormsLogin from '../../containers/FormsLogin'

const Login = () => {
  return (
    <StyledContainer>
      <Logo />
      <FormsLogin />
    </StyledContainer>
  )
}

export default Login
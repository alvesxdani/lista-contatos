import React, { useEffect } from 'react'
import Logo from '../../components/Logo'
import { StyledContainer } from './styles'
import FormsLogin from '../../containers/FormsLogin'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Login = () => {
  const { user, getAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getAuth()
    if (user) navigate('/index')
  }, [])

    return (
      <StyledContainer>
        <Logo />
        <FormsLogin />
      </StyledContainer>
    )
}

export default Login

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo'
import FormsLogin from '../../containers/FormsLogin'
import { useAuth } from '../../hooks/useAuth'
import { StyledContainer } from './styles'

export const Login = () => {
  const { user, getAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getAuth()
    if (user) navigate('/')
  }, [])

  return (
    <StyledContainer>
      <Logo />
      <FormsLogin />
    </StyledContainer>
  )
}

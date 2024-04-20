import React from 'react'
import Logo from '../Logo'
import { useAuth } from '../../hooks/useAuth'
import { StyledHeader } from './styles'
import Button from '../Botao'
import { useAppDispatch } from '../../hooks/useApp'
import { logout } from '../../store/reducers/login'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { user } = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function handleLogout() {
    dispatch(logout())
    navigate('/')
  }
  return (
    <StyledHeader>
      <Logo />
      <div className="info--user">
        <img
          src={
            user?.photoURL ||
            'https://th.bing.com/th/id/OIP.4yQU3p-Cx4P_mLF7QcesFwAAAA?rs=1&pid=ImgDetMain'
          }
          alt=""
        />
        {user?.email}
        <Button color="red" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </StyledHeader>
  )
}

export default Header

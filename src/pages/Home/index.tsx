import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/useApp'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Header from '../../components/Header'
import BarraLateral from '../../containers/BarraLateral'
import { StyledContainerHome } from './styles'

const Home = () => {
  // const { user } = useAppSelector((state) => state.auth)
  const { user, getAuth } = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getAuth()
    if (!user) navigate('/login')
  }, [])

  return (
    <>
      <Header />
      <StyledContainerHome>
        <BarraLateral />
        <main>
          <Outlet />
        </main>
      </StyledContainerHome>
    </>
  )
}

export default Home

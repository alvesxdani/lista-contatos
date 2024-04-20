import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useApp'
import { checkLoginStatus, logout } from '../../store/reducers/login'
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
        <Outlet />
      </StyledContainerHome>
    </>
  )
}

export default Home

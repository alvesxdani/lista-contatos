import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHook'
import { checkLoginStatus, logout } from '../../store/reducers/login'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Botao'
import { useAuth } from '../../hooks/useAuth'

const Home = () => {
  // const { user } = useAppSelector((state) => state.auth)
  const {user, getAuth} = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user)
    getAuth()
    if(!user) navigate('/')
  }, [])

  function handleLogout() {
    dispatch(logout())
    navigate('/')
  }

  if (user)
    return (
      <>
        <p>Bem-vindo, {user?.email}</p>
        <Button color='black' onClick={handleLogout}>Logout</Button>
      </>
    )
}

export default Home

import React from 'react'
import { useAppSelector } from '../../hooks/storeHook'

const Home = () => {
  const {user} = useAppSelector((state) => state.auth)
  return (
    <p>Bem-vindo, {user?.email}</p>
  )
}

export default Home
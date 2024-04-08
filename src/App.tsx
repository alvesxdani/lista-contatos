import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './styles'
import Home from './pages/Home'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
  ])
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  )
}

export default App

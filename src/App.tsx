import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './styles'
import { Provider } from 'react-redux'
import store from './store'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/index',
      element: <Home />,
    },
  ])
  return (
    <Provider store={store}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App

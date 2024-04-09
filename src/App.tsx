import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './styles'
import Home from './pages/Home'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
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

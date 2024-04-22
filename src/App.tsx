import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './styles'
import { Provider } from 'react-redux'
import store from './store'
import Login from './pages/Login'
import Home from './pages/Home'
import ListaContatos from './containers/ListaContatos'
import FormContato from './containers/FormContato'
import EditarContato from './containers/EditarContato'

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <Home />,
      children: [
        {
          path: '/',
          element: <ListaContatos />,
        },
        {
          path: '/novo-contato',
          element: <FormContato option="novo" />,
        },
        {
          path: '/editar-contato/:id',
          element: <FormContato option="editar" />,
        },
      ],
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

import FormContato from '@/containers/FormContato'
import ListaContatos from '@/containers/ListaContatos'
import Home from '@/pages/Home'
import { Login } from '@/pages/Login/index'
import { createBrowserRouter, RouterProviderProps } from 'react-router-dom'

export const appRouter: RouterProviderProps['router'] = createBrowserRouter([
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

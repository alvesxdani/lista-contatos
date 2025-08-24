import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import store from './store'
import { GlobalStyle } from './styles'
import { appRouter } from './utils/routes'

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <RouterProvider router={appRouter} />
    </Provider>
  )
}

export default App

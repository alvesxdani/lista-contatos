import { checkLoginStatus } from '../store/reducers/login'
import { useAppDispatch, useAppSelector } from './useApp'

export const useAuth = () => {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  function getAuth() {
    const authStatus = dispatch(checkLoginStatus())
    return authStatus
  }

  return { user, getAuth }
}

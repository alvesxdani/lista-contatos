import React, { ErrorInfo, SetStateAction, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { StyledFormsLogin } from './styles'
import Subtitulo from '../../components/Subtitulo'
import Input from '../../components/Input'
import Button from '../../components/Botao'
import { IAuthForm } from '../../Interfaces'
import { authFormSchema } from '../../models/Form'
import { useAppDispatch, useAppSelector } from '../../hooks/useApp'
import { login } from '../../store/reducers/login'
import { useNavigate } from 'react-router-dom'
import { RootReducer } from '../../store'

const FormsLogin = () => {
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAppSelector((state: RootReducer) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const errorMsg = 'Login inválido'

  useEffect(() => {
    if (Boolean(user)) {
      navigate('/index')
    }
  }, [user, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAuthForm>({
    resolver: yupResolver(authFormSchema),
  })

  const handleFormSubmit = async (data: IAuthForm) => {
    const { email, password } = data
    try {
      setLoading(true)
      const { user: userLogin } = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      if (userLogin && userLogin.email)
        dispatch(
          login({
            id: userLogin.uid,
            email: userLogin.email,
            displayName: userLogin.displayName,
            photoURL: userLogin.photoURL || null,
          }),
        )
      console.log(userLogin)
      // console.log(user)
    } catch (e: any) {
      setError(errorMsg)
      setLoading(false)
    } finally {
      reset({
        email: '',
        password: '',
      })
      setLoading(false)
    }
  }

  return (
    <StyledFormsLogin onSubmit={handleSubmit(handleFormSubmit)}>
      <Subtitulo text="Faça login" />
      <Input
        type="email"
        id="email"
        placeholder="E-mail"
        label="E-mail:"
        {...register('email')}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <Input
        type="password"
        id="password"
        placeholder="Senha"
        label="Senha:"
        {...register('password')}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <Button color="red" type="submit" disabled={loading}>
        Entrar
      </Button>
      {error && <p>{error}</p>}
    </StyledFormsLogin>
  )
}

export default FormsLogin

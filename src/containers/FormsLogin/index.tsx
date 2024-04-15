import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { StyledFormsLogin } from './styles'
import Subtitulo from '../../components/Subtitulo'
import Input from '../../components/Input'
import Button from '../../components/Botao'
import { IAuthForm } from '../../Interfaces'
import { authFormSchema } from '../../models/Form'
import { auth } from '../../services/firebase'

const FormsLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IAuthForm>({
    resolver: yupResolver(authFormSchema),
  })
  const handleFormSubmit = async(data: IAuthForm) => {
    const login = await signInWithEmailAndPassword(auth, data.email, data.password)
    console.log(login)
    reset({
      email: '',
      password: '',
    })
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
      <Button color="red" type="submit">
        Entrar
      </Button>
    </StyledFormsLogin>
  )
}

export default FormsLogin

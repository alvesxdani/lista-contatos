import React from 'react'
import { StyledFormsLogin } from './styles'
import Subtitulo from '../../components/Subtitulo'
import Input from '../../components/Input'

const FormsLogin = () => {
  return (
    <StyledFormsLogin>
        <Subtitulo text='Faça login'/>
        <Input type='email' id='email' name='email' placeholder='E-mail' />
        <Input type='password' id='password' name='password' placeholder='Senha' />
    </StyledFormsLogin>
  )
}

export default FormsLogin
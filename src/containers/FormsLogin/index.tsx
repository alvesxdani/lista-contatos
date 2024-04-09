import React from 'react'
import { StyledFormsLogin } from './styles'
import Subtitulo from '../../components/Subtitulo'
import Input from '../../components/Input'

const FormsLogin = () => {
  return (
    <StyledFormsLogin>
        <Subtitulo text='Faça login'/>
        <Input type='email' label='E-mail' id='email' name='email' />
    </StyledFormsLogin>
  )
}

export default FormsLogin
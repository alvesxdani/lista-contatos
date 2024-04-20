import React from 'react'
import { StyledNovoContato } from './styles'
import Subtitulo from '../../components/Subtitulo'
import Input from '../../components/Input'
import Button from '../../components/Botao'

const NovoContato = () => {
  return (
    <StyledNovoContato>
      <Subtitulo text="Adicione um novo contato" />
      <Input type="text" label="Nome" id="name-contact" name="name-contact" />
      <Input type="tel" label="Telefone" id="tel-contact" name="tel-contact" />
      <Input type="email" label="E-mail" id="email-contact" name="email-contact" />
      <Button color="black">Salvar</Button>
    </StyledNovoContato>
  )
}

export default NovoContato

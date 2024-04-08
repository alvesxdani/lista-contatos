import React from 'react'
import { StyledSubtitulo } from './styles'

type Props = {
  text: string
}

const Subtitulo = ({text}: Props) => {
  return <StyledSubtitulo>{text}</StyledSubtitulo>
}

export default Subtitulo

import React, { MouseEventHandler, SetStateAction, useEffect, useState } from 'react'
import { DocumentData, collection, getDocs } from 'firebase/firestore'
import { StyledListaContatos } from './styles'
import Subtitulo from '../../components/Subtitulo'
import { db } from '../../services/firebase'
import Button from '../../components/Botao'
import { useNavigate } from 'react-router-dom'
import { Container } from '../../styles'
import { useAppDispatch, useAppSelector } from '../../hooks/useApp'
import { fetchItens } from '../../store/reducers/contatos'
import { useFetchItens } from '../../hooks/useFetchItens'

const ListaContatos = () => {
  const navigate = useNavigate()
  const { items, fetchContatos } = useFetchItens()

  useEffect(() => {
    fetchContatos()
  }, [])

  function handleEdit(id: string) {
    // Lógica para levar ao id dos dados
    navigate(`/editar-contato/${id}`)
  }
  return (
    <Container>
      <Subtitulo text="Lista de contatos" />
      <StyledListaContatos>
        {items?.map(({id, data}, index) => {
          return (
            <li key={id}>
              <h2>{data.name}</h2>
              <p>{data.phone}</p>
              <p>{data.email}</p>
              <Button color="red" onClick={() => handleEdit(id)}>Editar</Button>
            </li>
          )
        })}
      </StyledListaContatos>
    </Container>
  )
}

export default ListaContatos

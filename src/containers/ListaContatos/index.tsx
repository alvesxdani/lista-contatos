import React, { useEffect, useState } from 'react'
import { deleteDoc, doc, getDocs } from 'firebase/firestore'
import { StyledListaContatos } from './styles'
import Subtitulo from '../../components/Subtitulo'
import { db } from '../../services/firebase'
import Button from '../../components/Botao'
import { useNavigate } from 'react-router-dom'
import { Container } from '../../styles'
import { useFetchItens } from '../../hooks/useFetchItens'

const ListaContatos = () => {
  const [isDeleting, setIsDeleting] = useState<string | null>()
  const navigate = useNavigate()
  const { items, fetchContatos } = useFetchItens()

  useEffect(() => {
    fetchContatos()
  }, [])

  function handleEdit(id: string) {
    // Lógica para levar ao id dos dados
    navigate(`/editar-contato/${id}`)
  }

  async function handleDelete(id: string) {
    try {
      setIsDeleting(id)
      await deleteDoc(doc(db, 'users', `${id}`))
      fetchContatos()
    } catch (error) {
      console.error('Error deleting document', error)
      throw error
    } finally {
      setIsDeleting(null)
    }
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
              <div>
                <Button color="black" onClick={() => handleEdit(id)}>
                  Editar
                </Button>
                <Button color="red" onClick={() => handleDelete(id)}>
                  {isDeleting === id ? 'Excluindo...' : 'Excluir'}
                </Button>
              </div>
            </li>
          )
        })}
      </StyledListaContatos>
    </Container>
  )
}

export default ListaContatos

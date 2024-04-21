import React, { SetStateAction, useEffect, useState } from 'react'
import { DocumentData, collection, getDocs } from 'firebase/firestore'
import { StyledListaContatos } from './styles'
import Subtitulo from '../../components/Subtitulo'
import { db } from '../../services/firebase'

const ListaContatos = () => {
  const [data, setData] = useState<any[]>()

  const querySnapshot = async () => {
    const snapshot = await getDocs(collection(db, 'users'))
    return snapshot
  }

  querySnapshot()
    .then((snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()))
    })
    .catch((error) => {
      console.log('Error getting documents', error)
    })

  return (
    <StyledListaContatos>
      <Subtitulo text="Lista de contatos" />
      <ul>
        {data?.map((item,index) => {
          return (
            <li key={index}>
              <h2>{item.name}</h2>
              <p>{item.phone}</p>
              <p>{item.email}</p>
            </li>
          )
        })}
      </ul>
    </StyledListaContatos>
  )
}

export default ListaContatos

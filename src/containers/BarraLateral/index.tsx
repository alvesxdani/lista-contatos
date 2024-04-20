import React from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import { RiContactsBook2Line } from 'react-icons/ri'
import { StyledBarraLateral } from './styles'
import { Link } from 'react-router-dom'

const BarraLateral = () => {
  return (
    <StyledBarraLateral>
      <ul>
        <li>
          <Link to="/novo-contato">
            <FaCirclePlus size={20} /> Adicionar contato
          </Link>
        </li>
        <li>
          <Link to="/">
            <RiContactsBook2Line size={20} /> Lista de contatos
          </Link>
        </li>
      </ul>
    </StyledBarraLateral>
  )
}

export default BarraLateral

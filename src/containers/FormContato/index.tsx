import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { StyledNovoContato } from './styles'
import Subtitulo from '../../components/Subtitulo'
import Input from '../../components/Input'
import Button from '../../components/Botao'
import { INewContactForm } from '../../Interfaces'
import { newContactSchema } from '../../models/FormNovoContato'
import { db } from '../../services/firebase'
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchItens } from '../../hooks/useFetchItens'
import Msg from '../../components/Msg'

type TForm = {
  option: 'novo' | 'editar'
}

const FormContato = ({ option }: TForm) => {
  const [data, setData] = useState<DocumentData>()
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, fetchContatos } = useFetchItens()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INewContactForm>({
    resolver: yupResolver(newContactSchema),
  })

  useEffect(() => {
    if (id && option === 'editar' && !data) {
      try {
        setLoading(true)
        fetchContatos()
        const filteredData = items.filter((item) => item.id === id)
        if (filteredData.length > 0) setData(filteredData[0].data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (option === 'novo') {
      setData(undefined)
    }
  }, [id, option, items, fetchContatos])


  useEffect(() => {
    if (data && option ==='editar') {
      reset({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
      })
    } else {
      reset({
        name: '',
        email: '',
        phone: '',
      })
    }
  }, [data, reset])

  const handleFormSubmit = async (data: INewContactForm) => {
    try {
      setLoading(true)
      const dataRef = await addDoc(collection(db, 'users'), {
        name: data.name,
        email: data.email,
        phone: data.phone,
      })
      reset({
        name: '',
        email: '',
        phone: '',
      })
    } catch (error) {
      console.log(error)
    } finally {
      setSuccess('Contato cadastrado com sucesso!')
      setLoading(false)
    }
  }

  const handleUpdateSubmit = async (data: INewContactForm) => {
    try {
      setLoading(true)
      const dataRef = await updateDoc(doc(db, 'users', `${id}`), {
        name: data.name,
        email: data.email,
        phone: data.phone,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setSuccess('Contato atualizado com sucesso!')
      setLoading(false)
    }
  }

  if (loading) return <p>Carregando...</p>
  return (
    <StyledNovoContato
      onSubmit={handleSubmit(
        option === 'novo' ? handleFormSubmit : handleUpdateSubmit,
      )}
    >
      {option === 'novo' && <Subtitulo text="Adicione um novo contato" />}
      {option === 'editar' && <Subtitulo text="Editar contato" />}
      <Input
        type="text"
        label="Nome"
        id="name-contact"
        placeholder="Jane Doe"
        {...register('name')}
      />
      {errors.name && <p>{errors.name.message}</p>}
      <Input
        type="text"
        label="Telefone"
        id="tel-contact"
        placeholder="Formato: (xx) xxxxx-xxxx"
        {...register('phone')}
      />
      {errors.phone && <p>{errors.phone.message}</p>}
      <Input
        type="email"
        label="E-mail"
        id="email-contact"
        placeholder="contact@janedoe.com"
        {...register('email')}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <Button color="black" disabled={loading}>
        {option === 'novo' ? 'Salvar' : 'Concluir'}
      </Button>
      {option === 'editar' && (
        <Button color="red" onClick={() => navigate('/')}>
          Cancelar
        </Button>
      )}
      {success && <Msg type='success'>{success}</Msg>}
    </StyledNovoContato>
  )
}

export default FormContato

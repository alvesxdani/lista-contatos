import React, { Ref, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { StyledNovoContato } from './styles'
import Subtitulo from '../../components/Subtitulo'
import Input from '../../components/Input'
import Button from '../../components/Botao'
import { INewContactForm } from '../../Interfaces'
import { newContactSchema } from '../../models/FormNovoContato'
import { db } from '../../services/firebase'
import { addDoc, collection } from 'firebase/firestore'

const NovoContato = () => {
  const [success, setSuccess] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INewContactForm>({
    resolver: yupResolver(newContactSchema),
  })

  const handleFormSubmit = async (data: INewContactForm) => {
    try {
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
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setSuccess('Contato cadastrado com sucesso!')
    }
  }

  return (
    <StyledNovoContato onSubmit={handleSubmit(handleFormSubmit)}>
      <Subtitulo text="Adicione um novo contato" />
      <Input type="text" label="Nome" id="name-contact" {...register('name')} />
      {errors.name && <p>{errors.name.message}</p>}
      <Input
        type="tel"
        label="Telefone"
        id="tel-contact"
        placeholder='(xx) xxxxx-xxxx'
        {...register('phone')}
      />
      {errors.phone && <p>{errors.phone.message}</p>}
      <Input
        type="email"
        label="E-mail"
        id="email-contact"
        {...register('email')}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <Button color="black">Salvar</Button>
      {success && <p>{success}</p>}
    </StyledNovoContato>
  )
}

export default NovoContato

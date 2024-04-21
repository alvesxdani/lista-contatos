import * as yup from 'yup'

export const newContactSchema = yup.object().shape({
  name: yup.string().uppercase().trim().required('O nome é obrigatório'),
  email: yup
    .string()
    .email('Digite um e-mail válido.')
    .required('E-mail obrigatório'),
  phone: yup
    .string()
    .required('O telefone é obrigatório')
})

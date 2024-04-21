import * as yup from 'yup'

const phoneRegex = /^\+?\d{2}\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/

export const newContactSchema = yup.object().shape({
  name: yup.string().uppercase().trim().required('O nome é obrigatório'),
  email: yup
    .string()
    .email('Digite um e-mail válido.')
    .required('E-mail obrigatório'),
  phone: yup
    .string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Formato de telefone inválido')
    .required('Telefone é obrigatório'),
})

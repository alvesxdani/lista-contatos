import * as yup from 'yup'

export const novoContatoSchema = yup.object().shape({
  name: yup.string().uppercase().trim().required(),
  email: yup
    .string()
    .email('Digite um e-mail válido.')
    .required('E-mail obrigatório'),
})

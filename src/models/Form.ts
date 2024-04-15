import yup from 'yup'

export const authFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Digite um e-mail válido.')
    .required('E-mail obrigatório'),
  password: yup.string().required('A senha é obrigatória.'),
})

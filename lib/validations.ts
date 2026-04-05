import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('O email é obrigatório.')
    .email('Digite um email válido.'),
  password: yup
    .string()
    .required('A senha é obrigatória.'),
})

export const registerSchema = yup.object({
  name: yup
    .string()
    .optional(),
  email: yup
    .string()
    .required('O email é obrigatório.')
    .email('Digite um email válido.'),
  password: yup
    .string()
    .required('A senha é obrigatória.')
    .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  confirmPassword: yup
    .string()
    .required('Confirme sua senha.')
    .oneOf([yup.ref('password')], 'As senhas não coincidem.'),
})

export const contactSchema = yup.object({
  name: yup
    .string()
    .required('O nome é obrigatório.'),
  email: yup
    .string()
    .email('Digite um email válido.')
    .optional(),
  phone: yup
    .string()
    .optional()
    .test('phone-format', 'Telefone inválido. Use (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.', (value) => {
      if (!value) return true
      const digits = value.replace(/\D/g, '')
      return digits.length === 10 || digits.length === 11
    }),
})

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

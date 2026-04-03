import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { RegisterForm } from './register-form'

export default async function RegisterPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (token) {
    redirect('/')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <RegisterForm />
    </main>
  )
}

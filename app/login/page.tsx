import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { LoginForm } from './login-form'

export default async function LoginPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (token) {
    redirect('/')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <LoginForm />
    </main>
  )
}

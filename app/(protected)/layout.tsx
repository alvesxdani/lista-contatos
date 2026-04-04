import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Header } from '@/components/header'

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    redirect('/login')
  }

  const userName = cookieStore.get('user-name')?.value || ''

  return (
    <div className="min-h-screen bg-background">
      <Header userName={decodeURIComponent(userName)} />
      <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
    </div>
  )
}

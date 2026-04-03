import type { Metadata } from 'next'
import { IBM_Plex_Mono, Noto_Serif, Open_Sans } from 'next/font/google'
import '../assets/style/globals.scss'

const openSans = Open_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
})

const notoSerif = Noto_Serif({
  variable: '--font-serif',
  subsets: ['latin'],
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Lista de Contatos',
  description: 'Aplicativo de lista de contatos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${openSans.variable} ${notoSerif.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}

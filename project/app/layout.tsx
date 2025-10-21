import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recicla Capixaba - Jogos Educativos',
  description: 'Aprenda sobre reciclagem de forma divertida e interativa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

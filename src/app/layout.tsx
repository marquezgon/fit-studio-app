import {Providers} from "./providers";
import Navbar from './components/navbar'
import type { Metadata } from 'next'
import {Inter} from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zeal Studio | Join the Movement',
  description: 'Plataforma Online de Zeal Studio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className}`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}

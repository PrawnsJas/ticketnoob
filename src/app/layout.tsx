import type { Metadata } from 'next'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
// @ts-ignore: CSS side-effect import declaration
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'TicketNoob',
  description: 'Master high-pressure ticket buying simulation',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

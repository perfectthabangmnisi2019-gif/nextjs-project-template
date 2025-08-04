import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { TradingProvider } from '../context/TradingContext'
import { Header } from '../components/layout/Header'
import { Sidebar } from '../components/layout/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PT_FX Trading Dashboard',
  description: 'Funded trader trade tracking system',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-50"}>
        <TradingProvider>
          <div className="flex h-screen flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
          </div>
        </TradingProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip'
import Providers from '@/components/providers'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const geist = Geist({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Smart Dossier',
  description: 'AI-powered property procedure management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geist.variable} font-sans`}>
        <Providers>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  )
}

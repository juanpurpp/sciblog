import {  Nunito } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'
import MainLayout from './MainLayout'

const font = Nunito({ subsets: ['latin'], weight: [ "200", "300", "400", "500", "600", "700", "800", "900"] })

export const metadata = {
  title: 'Sciblog',
  description: 'Sciblog es una red social para estudios profesionales de la academia',
}


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={font.className + ' dark:dark'}>
        <Providers>
          <MainLayout>
            {children}
          </MainLayout>

        </Providers>
      </body>
    </html>
  )
}

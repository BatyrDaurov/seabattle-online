import React from 'react'
import Head from 'next/head'
import { Header } from '@components/@layout/header/Header'
import { Footer } from '@components/@layout/footer/Footer'

type Props = {
  children: React.ReactNode
  title?: string
}

export const MainLayout: React.FC<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{title || 'Морской бой || by Batyr Daurov'}</title>
    </Head>
    <Header />
    <main className={`container`}>{children}</main>
    <Footer />
  </>
)

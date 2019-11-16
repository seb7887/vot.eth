import React from 'react'
import Head from 'next/head'

interface Props {
  title?: string
}

const Layout: React.FC<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    {children}
  </>
)

export default Layout

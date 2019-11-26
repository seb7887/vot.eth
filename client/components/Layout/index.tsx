import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import { theme, GlobalStyle } from './styles'

interface Props {
  title?: string
}

const Layout: React.FC<Props> = ({ children, title }) => (
  <ThemeProvider theme={theme}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <GlobalStyle />
    {children}
  </ThemeProvider>
)

export default Layout

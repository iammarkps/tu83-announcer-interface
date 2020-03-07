import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'

import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import { GlobalStyle } from '../design'
import { customTheme } from '../design/theme'
import * as gtag from '../libs/gtag'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    console.log('Developed by @iammarkps (เตรียมอุดม ๘๑)')
    console.log('Contact: secure@iammark.me')
  }, [])

  return (
    <React.StrictMode>
      <Head>
        <title>ประกาศผลสอบ | โรงเรียนเตรียมอุดมศึกษา</title>
      </Head>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App

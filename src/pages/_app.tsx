import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { CSSReset, ThemeProvider } from '@chakra-ui/core'

import { GlobalStyle } from '../design'
import { customTheme } from '../design/theme'
import * as gtag from '../libs/gtag'
import { Layout } from '../components/Layout'
import { User } from '../@types/data'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

let timeout: any

const start = () => {
  timeout = setTimeout(NProgress.start, 300)
}

const done = () => {
  clearTimeout(timeout)
  NProgress.done()
}

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const [user, setUser] = useState<User>()
  const [fetchError, setFetchError] = useState('')
  const [refetch, setRefetch] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      let data: any

      start()

      try {
        try {
          const res = await fetch(
            `https://api.announce.triamudom.ac.th:1323/student`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            }
          )

          data = await res.json()
        } catch (_) {
          setFetchError('An error occured')
          setRefetch(false)
        } finally {
          setRefetch(false)
        }
      } finally {
        done()
      }

      setUser(data)
    }

    if (refetch) {
      fetchData()
    }
  }, [refetch])

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
        <Layout>
          <Component
            {...pageProps}
            setRefetch={setRefetch}
            fetchError={fetchError}
            user={user}
          />
        </Layout>
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App

import { PropsWithChildren } from 'react'

import Head from 'next/head'

interface Props {
  name?: string
  description?: string
  append?: boolean
}

export const PageHead = ({
  append = true,
  children,
  description,
  name,
}: PropsWithChildren<Props>): JSX.Element => {
  const appName = 'Your App'
  const pageName = () => {
    if (append) {
      return name ? `${name} | ${appName}` : appName
    }
    return name ?? appName
  }
  const pageDesc = description ?? appName
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{pageName()}</title>
      <meta content={pageDesc} name="description" />
      <meta content={pageName()} name="og:title" />
      <meta content={pageDesc} name="og:description" />
      {children}
    </Head>
  )
}

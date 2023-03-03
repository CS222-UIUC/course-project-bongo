 // will apply to all pages and components
// only import this inside pages/_app.js
/**
 * In development, expressing stylesheets this way allows 
 * your styles to be hot reloaded as you edit them—meaning 
 * you can keep application state.
 * 
 * In production, all CSS files will be automatically 
 * concatenated into a single minified .css file.
 */
import '../styles/globals.css'

import type { AppProps } from 'next/app' // necessary

import Head from "next/head";
import Script from "next/script";

import MainNavigation from '@components/layout/MainNavigation'
import Layout from '@components/layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      {/* for custom imports and the remaining of bootstrap */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />



      <MainNavigation />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
  return (
    <Html lang="en">
      {/* <Head /> is the custom component by Next.js which compiles down to <head/> of our plain HTML. */}
      {/* No Stylesheets In Head Component. reference: https://nextjs.org/docs/messages/no-stylesheets-in-head-component*/}
      <Head>
        {/* Boostrap */}
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossOrigin="anonymous"
          />
        {/* Bootstrap Icons */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"></link>

        {/* Can also import other stuff like google fonts */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

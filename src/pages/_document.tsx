import { Html, Head, Main, NextScript } from 'next/document'
import Analytics from '../components/Analytics/index'

export default function Document() {
   return (
      <Html>
         <Head>

         </Head>
         <body>
            <Main />
            <NextScript />
            <Analytics />
         </body>
      </Html>
   )
}
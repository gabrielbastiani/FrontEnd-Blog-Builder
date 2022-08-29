import Head from '../../../node_modules/next/head'
import { FooterPainel } from '../../components/FooterPainel/index'
import { HeaderPainel } from '../../components/HeaderPainel/index'
import styles from './styles.module.scss'

export default function Comments(){

   return(
      <>
         <Head>
            <title>Comentarios nos artigos - Blog Builder Seu Negócio Online</title>
         </Head>
         <main>
            <HeaderPainel />
            <h1>COMENTARIOS</h1>
         </main>
         <FooterPainel />
      </>
   )
}
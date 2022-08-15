import Head from '../../../node_modules/next/head'
import { FooterBlog } from '../../components/FooterBlog/index'
import { HeaderBlog } from '../../components/HeaderBlog/index'
import styles from './styles.module.scss'

export function Sobre(){

   return(
      <>
         <Head>
            <title>Sobre - Blog Builder Seu Negócio Online</title>
         </Head>
         <main>
            <HeaderBlog/>
            <h1>SOBRE</h1>
         </main>
         <FooterBlog/>
      </>
   )
}
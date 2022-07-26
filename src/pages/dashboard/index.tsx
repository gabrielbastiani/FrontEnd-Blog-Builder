import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from 'next/head';
import styles from "../dashboard/styles.module.scss"

import { HeaderPainel } from "../../components/HeaderPainel/index";
import { FooterPainel } from "../../components/FooterPainel/index";

export default function Dashboard(){
   return(
      <>
      <Head>
         <title>Painel - Blog Builder Seu Negócio Online</title>
      </Head>
      <main className={styles.dashboard}>
         <HeaderPainel/>
         
         <h1>Painel</h1>

         <FooterPainel/>
      </main>
      </>
   )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

   return {
      props: {}
   }
})
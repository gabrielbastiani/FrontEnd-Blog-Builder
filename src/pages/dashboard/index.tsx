import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from 'next/head';
import styles from "../dashboard/styles.module.scss"
import { setupAPIClient } from '../../services/api'
import { HeaderPainel } from "../../components/HeaderPainel/index";
import { FooterPainel } from "../../components/FooterPainel/index";

type ArticleProps = {
   id: string;
   title: string;
   description: string;
   banner: string;
}

interface Article {
   articleList: ArticleProps[];
}

export default function Dashboard({ articleList }: Article) {
   return (
      <>
         <Head>
            <title>Painel - Blog Builder Seu Negócio Online</title>
         </Head>

         <main className={styles.dashboard}>
            <HeaderPainel />

            <section className={styles.container}>

               <h1>Painel</h1>

               <br />

               <table>
                  <tr>
                     <th>Banner do Artigo</th>
                     <th>Titulo do Artigo</th>
                     <th>Texto do Artigo</th>
                     <th>Data de Criação do Artigo</th>
                     <th>Editar Artigo</th>
                     <th>Deletar Artigo</th>
                  </tr>
                  {articleList.map((item) => {
                     return (
                        <>
                        <tr className={styles.tableContent} key={item.id}>
                           <td>{item.banner}</td>
                           <td>{item.title}</td>
                           <td className={styles.descriptionText}>{item.description}</td>
                           <td>Data</td>
                           <td>Editar</td>
                           <td>Deletar</td>
                        </tr>
                        </>
                     )
                  })}
               </table>

            </section>

            <FooterPainel />
         </main>
      </>
   )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
   const apliClient = setupAPIClient(ctx)

   const response = await apliClient.get('/category');
   const responseArticle = await apliClient.get('/category/article');
   /* console.log(responseArticle.data); */

   return {
      props: {
         categoryList: response.data,
         articleList: responseArticle.data,
      }
   }
})
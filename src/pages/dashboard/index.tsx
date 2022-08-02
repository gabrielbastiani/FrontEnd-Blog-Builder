import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from 'next/head';
import styles from "../dashboard/styles.module.scss"
import { setupAPIClient } from '../../services/api'
import { HeaderPainel } from "../../components/HeaderPainel/index";
import { FooterPainel } from "../../components/FooterPainel/index";
import Link from "../../../node_modules/next/link";
import moment from 'moment';
import { FaTrashAlt } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { FiRefreshCcw } from 'react-icons/fi'

type ArticleProps = {
   id: string;
   title: string;
   description: string;
   banner: string;
   created_at: string;
   updated_at: string;
}

interface Article {
   articleList: ArticleProps[];
}

export default function Dashboard({ articleList }: Article) {

   const dateFormat = articleList.map(i => {
      return {
         ...i,
         created_at: moment(i.created_at).format('DD/MM/YYYY HH:mm:ss'),
         updated_at: moment(i.updated_at).format('DD/MM/YYYY HH:mm:ss')
      }
   })

   async function handleRefreshArticle() {
      const apiClient = setupAPIClient()
      const articles = await apiClient.get('/category/article')
      articles.data

      console.log(articles.data)
    }

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

               <button className={styles.buttonRefresh} onClick={handleRefreshArticle}>
                  <FiRefreshCcw className={styles.refresh} size={22} />Atualizar Lista de Artigos
               </button>

               {articleList.length === 0 && (
                  <span className={styles.emptyList}>
                     Nenhum artigo cadastrado...
                  </span>
               )}

               <div className={styles.articlesSection}>
                  {articleList.map((item) => {
                     return (
                        <>
                           <div className={styles.articleBox}>
                              <div className={styles.article}>
                                 <div className={styles.boxArticle} key={item.id}>
                                    <div className={styles.listArticles}>
                                       <div className={styles.bannerArticle}><img src={"http://localhost:3333/files/" + item?.banner} alt="banner do artigo" /></div>
                                       <div className={styles.titleArticle}>{item?.title}</div>
                                       <div className={styles.descriptionArticle}>{item?.description}</div>
                                       <div className={styles.dates}><span>Data de criação do artigo: {moment(item?.created_at).format('DD/MM/YYYY HH:mm:ss')}</span></div>
                                    </div>
                                 </div>
                              </div>
                              <div className={styles.articleUpdate}>
                                 <Link className={styles.articleUpdate} href={`/articleUpdate?article_id=${item.id}`}>
                                    <FiEdit className={styles.edit} color='var(--red)' size={20} />
                                 </Link>
                              </div>
                              <div className={styles.deleteArticle}>
                                 <Link className={styles.deleteArticle} href={`/articleDelete?article_id=${item.id}`}>
                                    <FaTrashAlt className={styles.trash} color='var(--red)' size={20} />
                                 </Link>
                              </div>
                           </div>
                        </>
                     )
                  })}
               </div>





               {/* <table>
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
               </table> */}

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
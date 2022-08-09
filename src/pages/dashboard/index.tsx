import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from '../../../node_modules/next/router'
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
import Router from 'next/router'
import { api } from '../../services/apiClient';


export default function Dashboard() {

   const [articles, setArticles] = useState([]);
   const [total, setTotal] = useState(0);
   const [limit, setLimit] = useState(4);
   const [pages, setPages] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);

   const router = useRouter()

   useEffect(() => {
      async function loadArticles() {
         try {
            const { data } = await api.get(`/article/all?page=${currentPage}&limit=${limit}`);
            setTotal(data?.articles?.length || 0);
            setArticles(data?.articles || []);
         } catch (error) {
            console.error(error);
            alert('Error call api list article');
         }
      }

      loadArticles();
   }, [currentPage, limit]);

   const limits = useCallback((e) => {
      setLimit(e.target.value);
      setCurrentPage(1);
   }, []);


   const dateFormat = articles.map(i => {
      return {
         ...i,
         created_at: moment(i.created_at).format('DD/MM/YYYY HH:mm'),
         updated_at: moment(i.updated_at).format('DD/MM/YYYY HH:mm')
      }
   })
 
  async function handleRefreshArticle() {

      const reload = await api.get('/article/all');

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

               <select onChange={limits}>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="12">12</option>
                  <option value="20">20</option>
               </select>

               < br />

               <button className={styles.buttonRefresh} onClick={handleRefreshArticle}>
                  <FiRefreshCcw className={styles.refresh} size={22} />Atualizar Lista de Artigos
               </button>

               {articles.length === 0 && (
                  <span className={styles.emptyList}>
                     Nenhum artigo cadastrado...
                  </span>
               )}

                <div className={styles.articlesSection}>
                  {articles.map((article) => {
                     return (
                        <>
                           <div key={article.id} className={styles.articleBox}>
                              <div className={styles.article}>
                                 <div className={styles.boxArticle}>
                                    <div className={styles.titleArticle}>{article?.title}</div>
                                    <div className={styles.listArticles}>
                                       <div className={styles.bannerArticle}><img src={"http://localhost:3333/files/" + article?.banner} alt="banner do artigo" /></div>
                                       <div className={styles.descriptionArticle} dangerouslySetInnerHTML={{ __html: article?.description }}></div>
                                       <div className={styles.dates}><span>Data de criação do artigo: {moment(article?.created_at).format('DD/MM/YYYY HH:mm')}</span></div>
                                    </div>
                                 </div>
                              </div>
                              <div className={styles.containerUpdate}>
                                 <div className={styles.articleUpdate}>
                                    <Link className={styles.articleUpdate} href={`/articleUpdate?article_id=${article.id}`}>
                                       <FiEdit className={styles.edit} color='var(--red)' size={35} />
                                    </Link>
                                 </div>
                                 <div className={styles.deleteArticle}>
                                    <Link className={styles.deleteArticle} href={`/articleDelete?article_id=${article.id}`}>
                                       <FaTrashAlt className={styles.trash} color='var(--red)' size={35} />
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </>
                     )
                  })}
               </div>
 
               <div className={styles.containerPagination}>
                  <div className={styles.totalArticles}>
                     <span>Total de artigos: {total}</span>
                  </div>

                  <div className={styles.containerArticlesPages}>
                     {currentPage > 1 && (
                        <div className={styles.previus}>
                           <button className={styles.previus} onClick={() => setCurrentPage(currentPage - 1)}>
                              Voltar
                           </button>
                        </div>
                     )}

                        {pages.map((page) => (
                           <span
                              className={styles.page}
                              key={page}
                              onClick={() => setCurrentPage(page)}
                           >
                              {page}
                           </span>
                        ))}

                     {articles?.length > 0 && (
                        <div className={styles.next}>
                           <button onClick={() => setCurrentPage(currentPage + 1)}>
                              Avançar
                           </button>
                        </div>
                     )}

                  </div>
               </div>        

            </section>
            <FooterPainel />
         </main>
      </>
   )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
   const apliClient = setupAPIClient(ctx)

   /* const response = await apliClient.get('/category');
   const responseArticle = await apliClient.get('/article/all'); */

   return {
      props: {
         /* categoryList: response.data,
         articleList: responseArticle.data, */
      }
   }
})
import React, { useState, useEffect, useCallback } from 'react'
import styles from "./styles.module.scss"
import Link from "../../../node_modules/next/link";
import moment from 'moment';
import { api } from '../../services/apiClient';
import { BsCalendarCheck } from 'react-icons/bs'
import { AiOutlineFolderOpen, AiOutlineArrowRight } from 'react-icons/ai'
import { Button } from '../ui/Button/index';


export function ArticleHome() {

   const [articles, setArticles] = useState([]);
   const [total, setTotal] = useState(0);
   const [limit, setLimit] = useState(4);
   const [pages, setPages] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);


   useEffect(() => {
      async function loadArticles() {
         try {
            const { data } = await api.get(`/article/published/blog?page=${currentPage}&limit=${limit}`);
               setTotal(data?.total);
               const totalPages = Math.ceil(total / limit);

               const arrayPages = [];

               for (let i = 1; i <= totalPages; i++) {
               arrayPages.push(i);

               setPages(arrayPages);
               setArticles(data?.articles || []);
            
            }

         } catch (error) {

            console.error(error);
            alert('Error call api list article');

         }
      }

      loadArticles();
   }, [currentPage, limit, total]);



   return (
      <>
         <main className={styles.dashboard}>

            <section className={styles.container}>

               {articles.length === 0 && (
                  <span className={styles.emptyList}>
                     Nenhum artigo cadastrado...
                  </span>
               )}

               <br />
               <br />

               <div className={styles.articlesSection}>
                  {articles.map((articl) => {
                     return (
                        <>
                           <div key={articl.id} className={styles.articleBox}>
                              <div className={styles.titleArticle}>
                                 <h1>{articl.title}</h1>
                              </div>
                              <div className={styles.informationsArticle}>
                                 <span><BsCalendarCheck color='var(--red)' size={20} /> {moment(articl?.created_at).format('DD/MM/YYYY')}</span>
                                 <span><AiOutlineFolderOpen color='var(--red)' size={25} /></span>
                              </div>
                              <div className={styles.bannerArticle}>
                                 <img src={"http://localhost:3333/files/" + articl?.banner} alt="banner do artigo" />
                              </div>
                              <div className={styles.descriptionArticle} dangerouslySetInnerHTML={{ __html: articl?.description }}></div>
                              
                              <Link href={`/articlePage?article_id=${articl.id}`}>
                              <div className={styles.articleMore}>                            
                                 <Button>Ler mais...</Button>
                                 <AiOutlineArrowRight className={styles.arrowArticle} color='var(--red)' size={30}/>
                              </div>
                              </Link>
                              <hr />
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
                           <button onClick={() => setCurrentPage(currentPage - 1)}>
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

                     {currentPage < articles.length && (
                        <div className={styles.next}>
                           <button onClick={() => setCurrentPage(currentPage + 1)}>
                              Avançar
                           </button>
                        </div>
                     )}

                  </div>
               </div>

            </section>

         </main>
      </>
   )
}
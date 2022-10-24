import React, { useState, useEffect } from 'react';
import styles from "./styles.module.scss";
import { api } from '../../services/apiClient';
import Link from '../../../node_modules/next/link';
import moment from 'moment';


export function RecentPosts() {

   const [articles, setArticles] = useState([]);
   const [total, setTotal] = useState(0);
   const [limit, setLimit] = useState(5);
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

               setArticles(data?.articles || []);
            }
         } catch (error) {
            console.error(error);
            alert('Clique para continuar');
         }
      }

      loadArticles();
   }, [currentPage, limit, total]);


   return (
      <>
         <section className={styles.sectionRecentPost}>
            <div className={styles.contentFooter}>
               <h2>Postagens Recentes</h2>
               <hr />
       
               {articles.length === 0 && (
                  <span className={styles.emptyList}>
                     Nenhum artigo cadastrado...
                  </span>
               )}

               {articles.map((artic) => {
                  return (
                     <>
                        <ul key={artic.id}>
                           <Link href={`/articlePageRecent?title=${artic.title}`}>
                              <li>{artic?.title}</li>
                           </Link>
                           <span className={styles.dateArticles}>{moment(artic?.created_at).format('DD/MM/YYYY')}</span>
                        </ul>
                     </>
                  )
               })}

            </div>
         </section>
      </>
   )
}
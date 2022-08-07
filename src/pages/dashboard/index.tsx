import React, { useState, useEffect, useCallback } from 'react'
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

   const apiClient = setupAPIClient();

   /* const [itens, setItens] = useState([]);
   const [itensProPage, setItensProPage] = useState(4);
   const [currentPage, setCurrentPage] = useState(0);

   const pages = Math.ceil(itens.length / itensProPage);
   const startIndex = currentPage * itensProPage;
   const endIndex = startIndex + itensProPage;
   const currentItems = itens.slice(startIndex, endIndex);

   useEffect(() => {
      const fetchData = async () => {
         const result = await api.get('/article/all');

         setItens(result)
      }
      fetchData()
   }, []) */

   const [products, setProducts] = useState([]);
   const [total, setTotal] = useState(0);
   const [limit, setLimit] = useState(4);
   const [pages, setPages] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
      async function loadProducts() {
         const response = await api.get('/article/all');
         setTotal(response.data.length);
         const totalPages = Math.ceil(total / limit);

         const arrayPages = [];
         for (let i = 1; i <= totalPages; i++) {
            arrayPages.push(i);
         }

         setPages(arrayPages);
         setProducts(response.data);
      }

      loadProducts();
   }, [currentPage, limit, total]);

   const limits = useCallback((e) => {
      setLimit(e.target.value);
      setCurrentPage(1);
   }, []);


   const dateFormat = products.map(i => {
      return {
         ...i,
         created_at: moment(i.created_at).format('DD/MM/YYYY HH:mm'),
         updated_at: moment(i.updated_at).format('DD/MM/YYYY HH:mm')
      }
   })

   async function handleRefreshArticle() {

      Router.push('/dashboard')

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

               {products.length === 0 && (
                  <span className={styles.emptyList}>
                     Nenhum artigo cadastrado...
                  </span>
               )}

                <div className={styles.articlesSection}>
                  {products.map((product) => {
                     return (
                        <>
                           <div key={product.id} className={styles.articleBox}>
                              <div className={styles.article}>
                                 <div className={styles.boxArticle}>
                                    <div className={styles.titleArticle}>{product?.title}</div>
                                    <div className={styles.listArticles}>
                                       <div className={styles.bannerArticle}><img src={"http://localhost:3333/files/" + product?.banner} alt="banner do artigo" /></div>
                                       <div className={styles.descriptionArticle} dangerouslySetInnerHTML={{ __html: product?.description }}></div>
                                       <div className={styles.dates}><span>Data de criação do artigo: {moment(product?.created_at).format('DD/MM/YYYY HH:mm')}</span></div>
                                    </div>
                                 </div>
                              </div>
                              <div className={styles.containerUpdate}>
                                 <div className={styles.articleUpdate}>
                                    <Link className={styles.articleUpdate} href={`/articleUpdate?article_id=${product.id}`}>
                                       <FiEdit className={styles.edit} color='var(--red)' size={35} />
                                    </Link>
                                 </div>
                                 <div className={styles.deleteArticle}>
                                    <Link className={styles.deleteArticle} href={`/articleDelete?article_id=${product.id}`}>
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

                     {currentPage < pages.length && (
                        <div className={styles.next}>
                           <button onClick={() => setCurrentPage(currentPage + 1)}>
                              Avançar
                           </button>
                        </div>
                     )}

                  </div>
               </div>

              {/*  <div>
                  {Array.from(Array(pages), (item, index) => {
                     return (
                     <button value={index} onClick={(e) => setCurrentPage(Number(e.target.value))}>Next Button</button>
                     )
                  })}
               </div>

               {currentItems.map(item => {
                  return (
                     <div key={item}>
                        <span>{item.id}</span>
                        <span>{item.title}</span>
                     </div>
                  )
               })} */}
               

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

   return {
      props: {
         categoryList: response.data,
         articleList: responseArticle.data,
      }
   }
})
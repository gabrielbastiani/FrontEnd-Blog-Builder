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
import { MdPublish } from 'react-icons/md'
import { AiOutlineDeleteColumn } from 'react-icons/ai'
import { api } from '../../services/apiClient';
import { Input } from '../../components/ui/Input/index';
import { Button } from '../../components/ui/Button/index';


export default function Dashboard() {

   const [articles, setArticles] = useState([]);
   const [total, setTotal] = useState(0);
   const [limit, setLimit] = useState(4);
   const [pages, setPages] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);

   const [publish, setPublish] = useState([]);
   const [totalPublish, setTotalPublish] = useState(0);
   const [limitPublish, setLimitPublish] = useState(4);
   const [pagesPublish, setPagesPublish] = useState([]);
   const [currentPagePublish, setCurrentPagePublish] = useState(1);



   const [initialFilter, setInitialFilter] = useState();
   const [search, setSearch] = useState([]);

   const [showElement, setShowElement] = useState(false);


   useEffect(() => {
      async function loadArticles() {
         try {
            const { data } = await api.get(`/article/all?page=${currentPage}&limit=${limit}`);
            /* setTotal(data?.articles?.length || 0); */
            setTotal(data?.total);
            const totalPages = Math.ceil(total / limit);

            const arrayPages = [];
            for (let i = 1; i <= totalPages; i++) {
               arrayPages.push(i);
            }

            setPages(arrayPages);
            setArticles(data?.articles || []);

         } catch (error) {

            console.error(error);
            alert('Error call api list article');

         }
      }

      loadArticles();
   }, [currentPage, limit, total]);

   const limits = useCallback((e) => {
      setLimit(e.target.value);
      setCurrentPage(1);
   }, []);

   useEffect(() => {
      async function publishArticle() {
         try {
            const { data } = await api.get(`/article/published/blog?page=${currentPagePublish}&limit=${limitPublish}`);
            setTotalPublish(data?.total);
            const totalPagesPublish = Math.ceil(totalPublish / limitPublish);

            const arrayPagesPublish = [];

            for (let i = 1; i <= totalPagesPublish; i++) {
               arrayPagesPublish.push(i);

               setPagesPublish(arrayPagesPublish);
               setPublish(data?.publish || []);

            }

         } catch (error) {

            console.error(error);
            alert('Error call api list article');

         }
      }

      publishArticle();
   }, [currentPagePublish, limitPublish, totalPublish]);

   async function handleRefreshArticle() {
      const apiClient = setupAPIClient();

      const response = await apiClient.get('/article/filter')
      setArticles(response.data);
   }

   useEffect(() => {
      const loadSearch = async () => {
         try {
            const response = await api.get('/article/filter');
            const filter = await response.data;

            setInitialFilter(filter);
            setSearch(filter);

         } catch (error) {
            console.log('Error call api list filter');
         }
      }

      loadSearch();
   }, [])

   const handleChange = ({ target }) => {
      if (!target.value) {
         setSearch(initialFilter);

         return;
      }

      const filterArticles = search.filter((filt) => filt.description.toLowerCase().includes(target.value));
      setSearch(filterArticles);
   }

   const showOrHide = () => {
      setShowElement(!showElement)
   }

   const renderOk = () => {
      return <p className={styles.sim}>SIM</p>
   }

   const renderNo = () => {
      return <p className={styles.nao}>NÃO</p>
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
               <br />

               <h5>Total de artigos por página</h5>

               <br />

               <select onChange={limits}>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="12">12</option>
                  <option value="20">20</option>
               </select>

               <br />

               <div className={styles.sectionBoxSearch}>
                  <Input
                     placeholder='Busca por artigo'
                     type="search"
                     onChange={handleChange}
                  />

                  <Button
                     onClick={showOrHide}>{showElement ? 'Ocultar Busca' : 'Mostrar Busca'}
                  </Button>
               </div>

               <br />

               {/* BUSCA POR ARTIGOS AQUI ABAIXO */}

               <section className={styles.searchSection}>
                  {showElement ? search.map((sear) => {
                     return (
                        <>
                           <div key={sear.id} className={styles.searchBox}>
                              <div className={styles.search}>
                                 <div className={styles.boxSearch}>
                                    <div className={styles.titleSearch}>{sear?.title}</div>
                                    <div className={styles.listSearch}>
                                       <div className={styles.bannerSearch}><img src={"http://localhost:3333/files/" + sear?.banner} alt="banner do artigo" /></div>
                                       <div className={styles.descriptionSearch} dangerouslySetInnerHTML={{ __html: sear?.description }}></div>
                                    </div>
                                 </div>
                              </div>
                              <div className={styles.containerUpdateDeleteSearch}>
                                 <div className={styles.datesAndPublishSearch}>
                                    <span>Categoria: {sear?.categoryName}</span>
                                    <hr />
                                    <span>Data do artigo: {moment(sear?.created_at).format('DD/MM/YYYY - HH:mm')}</span>
                                    <hr />
                                    <span>Esta publicado? {sear?.published && renderOk() || renderNo()}</span>
                                 </div>
                                 <div className={styles.articleUpdateSearch}>
                                    <Link className={styles.articleUpdateSearch} href={`/articleUpdate?article_id=${sear.id}`}>
                                       <FiEdit className={styles.editSearch} color='var(--red)' size={17} />
                                    </Link>
                                 </div>
                                 <div className={styles.deleteArticleSearch}>
                                    <Link className={styles.deleteArticleSearch} href={`/articleDelete?article_id=${sear.id}`}>
                                       <FaTrashAlt className={styles.trashSearch} color='var(--red)' size={17} />
                                    </Link>
                                 </div>
                                 <div className={styles.publishArticleSearch}>
                                    <Link className={styles.publishArticleSearch} href={`/articlePublish?article_id=${sear.id}`}>
                                       <MdPublish className={styles.publishSearch} color='var(--red)' size={17} />
                                    </Link>
                                 </div>
                                 <div className={styles.despublishArticleSearch}>
                                    <Link className={styles.despublishArticSearch} href={`/articleDespublish?article_id=${sear.id}`}>
                                       <AiOutlineDeleteColumn className={styles.despublishSearch} color='var(--red)' size={17} />
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </>
                     )
                  }) : null}
               </section>

               <button className={styles.buttonRefresh} onClick={handleRefreshArticle}>
                  <FiRefreshCcw className={styles.refresh} size={22} />Atualizar Lista de Artigos
               </button>

               {articles.length === 0 && (
                  <span className={styles.emptyList}>
                     Nenhum artigo cadastrado...
                  </span>
               )}

               <br />
               <br />

               <div className={styles.containerPagination}>
                  <div className={styles.totalArticles} key={total}>
                     <span>Total de artigos: {total}</span>
                  </div>

                  <div className={styles.containerArticlesPages} key={currentPage}>
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

               <br />

               <div className={styles.articlesSection}>
                  {articles.map((articl) => {
                     return (
                        <>
                           <div key={articl.id} className={styles.articleBox}>
                              <div className={styles.article}>
                                 <div className={styles.boxArticle}>
                                    <div className={styles.titleArticle}>{articl?.title}</div>
                                    <div className={styles.listArticles}>
                                       <div className={styles.bannerArticle}><img src={"http://localhost:3333/files/" + articl?.banner} alt="banner do artigo" /></div>
                                       <div className={styles.descriptionArticle} dangerouslySetInnerHTML={{ __html: articl?.description }}></div>
                                       <div className={styles.datesAndPublish}>
                                          <span>Categoria: {articl?.categoryName}</span>
                                          <hr />
                                          <span>Data do artigo: {moment(articl?.created_at).format('DD/MM/YYYY HH:mm')}</span>
                                          <hr />
                                          <span>Esta publicado? {articl?.published && renderOk() || renderNo()}</span>
                                       </div>
                                    </div>
                                    <div className={styles.tagsAndAutorBox}>
                                       <span>AUTOR:</span>
                                       <p className={styles.author}>{articl?.name}</p>
                                       <span>TAGS:</span>
                                       <p>{articl?.tag1} - {articl?.tag2} - {articl?.tag3} - {articl?.tag4}</p>
                                    </div>
                                 </div>
                              </div>
                              <div className={styles.containerUpdate}>
                                 <div className={styles.articleUpdate}>
                                    <Link className={styles.articleUpdate} href={`/articleUpdate?article_id=${articl.id}`}>
                                       <FiEdit className={styles.edit} color='var(--red)' size={30} />
                                    </Link>
                                 </div>
                                 <div className={styles.deleteArticle}>
                                    <Link className={styles.deleteArticle} href={`/articleDelete?article_id=${articl.id}`}>
                                       <FaTrashAlt className={styles.trash} color='var(--red)' size={30} />
                                    </Link>
                                 </div>
                                 <div className={styles.publishArticle}>
                                    <Link className={styles.publishArti} href={`/articlePublish?article_id=${articl.id}`}>
                                       <MdPublish className={styles.publish} color='var(--red)' size={30} />
                                    </Link>
                                 </div>
                                 <div className={styles.despublishArticle}>
                                    <Link className={styles.despublishArti} href={`/articleDespublish?article_id=${articl.id}`}>
                                       <AiOutlineDeleteColumn className={styles.despublish} color='var(--red)' size={30} />
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
            <FooterPainel />
         </main>
      </>
   )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
   const apiClient = setupAPIClient(ctx);

   return {
      props: {}
   }
})
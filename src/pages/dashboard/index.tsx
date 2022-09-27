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
import { useRouter } from 'next/router'


export default function Dashboard() {

   const router = useRouter()

   const [articles, setArticles] = useState([]);
   const [total, setTotal] = useState(0);
   const [limit, setLimit] = useState(4);
   const [pages, setPages] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [currentUser, setCurrentUser] = useState('');

   const [initialFilter, setInitialFilter] = useState();
   const [search, setSearch] = useState([]);

   const [admin, setAdmin] = useState([]);
   const [totalAdmin, setTotalAdmin] = useState(0);
   const [limitAdmin, setLimitAdmin] = useState(4);
   const [pagesAdmin, setPagesAdmin] = useState([]);
   const [currentPageAdmin, setCurrentPageAdmin] = useState(1);

   const [currentAdmin, setCurrentAdmin] = useState('');
   const roleADMIN = "ADMIN";

   const [initialFilterAdmin, setInitialFilterAdmin] = useState();
   const [searchAdmin, setSearchAdmin] = useState([]);


   useEffect(() => {
      async function loadAllArticlesAdmin() {
         try {
            const response = await api.get('/me');
            setCurrentAdmin(response.data.role);

            const { data } = await api.get(`/article/admin?pageAdmin=${currentPageAdmin}&limitAdmin=${limitAdmin}`);

            setTotalAdmin(data?.totalAdmin);
            const totalPagesAdmin = Math.ceil(totalAdmin / limitAdmin);

            const arrayPagesAdmin = [];
            for (let i = 1; i <= totalPagesAdmin; i++) {
               arrayPagesAdmin.push(i);
            }

            setPagesAdmin(arrayPagesAdmin);
            setAdmin(data?.admin || []);

         } catch (error) {

            console.error(error);
            alert('Error call api list ALL article');

         }
      }
      loadAllArticlesAdmin();
   }, [currentPageAdmin, limitAdmin, totalAdmin]);

   const limitsAdmin = useCallback((e) => {
      setLimitAdmin(e.target.value);
      setCurrentPageAdmin(1);
   }, []);


   useEffect(() => {
      async function loadArticles() {
         try {
            const name = currentUser
            const response = await api.get('/me');
            setCurrentUser(response.data.name);

            const { data } = await api.get(`/article/all?page=${currentPage}&limit=${limit}&name=${name}`);

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
   }, [currentPage, currentUser, limit, total]);

   const limits = useCallback((e) => {
      setLimit(e.target.value);
      setCurrentPage(1);
   }, []);

   async function handleRefreshArticle() {
      const apiClient = setupAPIClient();

      const response = await apiClient.get('/article/filter')
      setArticles(response.data);

      router.reload()
   }

   async function handleRefreshArticleAdmin() {
      const apiClient = setupAPIClient();

      const response = await apiClient.get('/article/filter')
      setArticles(response.data);

      router.reload()
   }

   const handleChange = ({ target }) => {
      if (!target.value) {
         setSearch(initialFilter);

         return;
      }

      const filterArticles = articles.filter((filt) => filt.description.toLowerCase().includes(target.value));
      setArticles(filterArticles);
   }

   const handleChangeAdmin = ({ target }) => {
      if (!target.value) {
         setSearchAdmin(initialFilterAdmin);

         return;
      }

      const filterArticlesAdmin = admin.filter((filtAdmin) => filtAdmin.description.toLowerCase().includes(target.value));
      setAdmin(filterArticlesAdmin);
   }

   async function handleRefreshFilter() {
      const apiClient = setupAPIClient();

      const response = await apiClient.get('/article/filter')
      setArticles(response.data);

   }

   async function handleRefreshFilterAdmin() {
      const apiClient = setupAPIClient();

      const response = await apiClient.get('/article/filter')
      setAdmin(response.data);

   }

   const renderOk = () => {
      return <p className={styles.sim}>SIM</p>
   }

   const renderNo = () => {
      return <p className={styles.nao}>NÃO</p>
   }

   const renderOkAdmin = () => {
      return <p className={styles.sim}>SIM</p>
   }

   const renderNoAdmin = () => {
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

               {currentAdmin != roleADMIN && (
                  <select onChange={limits}>
                     <option value="4">4</option>
                     <option value="8">8</option>
                     <option value="12">12</option>
                     <option value="20">20</option>
                     <option value="999999">Todos os artigos</option>
                  </select>
               )}

               {currentAdmin === roleADMIN && (
                  <select onChange={limitsAdmin}>
                     <option value="4">4</option>
                     <option value="8">8</option>
                     <option value="12">12</option>
                     <option value="20">20</option>
                     <option value="999999">Todos os artigos</option>
                  </select>
               )}
               <br />

               {currentAdmin != roleADMIN && (
                  <button className={styles.buttonRefresh} onClick={handleRefreshArticle}>
                     <FiRefreshCcw className={styles.refresh} size={22} />Atualizar Lista de Artigos
                  </button>
               )}

               {currentAdmin === roleADMIN && (
                  <button className={styles.buttonRefresh} onClick={handleRefreshArticleAdmin}>
                     <FiRefreshCcw className={styles.refresh} size={22} />Atualizar Lista de Artigos
                  </button>
               )}

               <section className={styles.boxSearch}>
                  {currentAdmin != roleADMIN && (
                     <Input
                        placeholder='Busca por artigo'
                        type="search"
                        onChange={handleChange}
                     />
                  )}

                  {currentAdmin === roleADMIN && (
                     <Input
                        placeholder='Busca por artigo'
                        type="search"
                        onChange={handleChangeAdmin}
                     />
                  )}

                  {currentAdmin != roleADMIN && (
                     <button
                        onClick={handleRefreshFilter}>Limpar filtro
                     </button>
                  )}

                  {currentAdmin === roleADMIN && (
                     <button
                        onClick={handleRefreshFilterAdmin}>Limpar filtro
                     </button>
                  )}
               </section>

               <br />

               {currentAdmin != roleADMIN && (
                  <div>
                     {articles.length === 0 && (
                        <span className={styles.emptyList}>
                           Nenhum artigo cadastrado...
                        </span>
                     )}
                  </div>
               )}

               {currentAdmin === roleADMIN && (
                  <div>
                     {admin.length === 0 && (
                        <span className={styles.emptyList}>
                           Nenhum artigo cadastrado...
                        </span>
                     )}
                  </div>
               )}

               <br />
               <br />

               {currentAdmin != roleADMIN && (<section>
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
                                          <p>{articl?.tagName1} - {articl?.tagName2} - {articl?.tagName3} - {articl?.tagName4} - {articl?.tagName5}</p>
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
               </section>)}

               {currentAdmin === roleADMIN && (<section>

                  <div className={styles.containerPagination}>
                     <div className={styles.totalArticles} key={totalAdmin}>
                        <span>Total de artigos: {totalAdmin}</span>
                     </div>

                     <div className={styles.containerArticlesPages} key={currentPageAdmin}>
                        {currentPageAdmin > 1 && (
                           <div className={styles.previus}>
                              <button onClick={() => setCurrentPageAdmin(currentPageAdmin - 1)}>
                                 Voltar
                              </button>
                           </div>
                        )}

                        {pagesAdmin.map((pageAdmin) => (
                           <span
                              className={styles.page}
                              key={pageAdmin}
                              onClick={() => setCurrentPage(pageAdmin)}
                           >
                              {pageAdmin}
                           </span>
                        ))}

                        {currentPageAdmin < admin.length && (
                           <div className={styles.next}>
                              <button onClick={() => setCurrentPageAdmin(currentPageAdmin + 1)}>
                                 Avançar
                              </button>
                           </div>
                        )}

                     </div>
                  </div>

                  <br />

                  <div className={styles.articlesSection}>
                     {admin.map((articlAdmin) => {
                        return (
                           <>
                              <div key={articlAdmin.id} className={styles.articleBox}>
                                 <div className={styles.article}>
                                    <div className={styles.boxArticle}>
                                       <div className={styles.titleArticle}>{articlAdmin?.title}</div>
                                       <div className={styles.listArticles}>
                                          <div className={styles.bannerArticle}><img src={"http://localhost:3333/files/" + articlAdmin?.banner} alt="banner do artigo" /></div>
                                          <div className={styles.descriptionArticle} dangerouslySetInnerHTML={{ __html: articlAdmin?.description }}></div>
                                          <div className={styles.datesAndPublish}>
                                             <span>Categoria: {articlAdmin?.categoryName}</span>
                                             <hr />
                                             <span>Data do artigo: {moment(articlAdmin?.created_at).format('DD/MM/YYYY HH:mm')}</span>
                                             <hr />
                                             <span>Esta publicado? {articlAdmin?.published && renderOkAdmin() || renderNoAdmin()}</span>
                                          </div>
                                       </div>
                                       <div className={styles.tagsAndAutorBox}>
                                          <span>AUTOR:</span>
                                          <p className={styles.author}>{articlAdmin?.name}</p>
                                          <span>TAGS:</span>
                                          <p>{articlAdmin?.tagName1} - {articlAdmin?.tagName2} - {articlAdmin?.tagName3} - {articlAdmin?.tagName4} - {articlAdmin?.tagName5}</p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className={styles.containerUpdate}>
                                    <div className={styles.articleUpdate}>
                                       <Link className={styles.articleUpdate} href={`/articleUpdate?article_id=${articlAdmin.id}`}>
                                          <FiEdit className={styles.edit} color='var(--red)' size={30} />
                                       </Link>
                                    </div>
                                    <div className={styles.deleteArticle}>
                                       <Link className={styles.deleteArticle} href={`/articleDelete?article_id=${articlAdmin.id}`}>
                                          <FaTrashAlt className={styles.trash} color='var(--red)' size={30} />
                                       </Link>
                                    </div>
                                    <div className={styles.publishArticle}>
                                       <Link className={styles.publishArti} href={`/articlePublish?article_id=${articlAdmin.id}`}>
                                          <MdPublish className={styles.publish} color='var(--red)' size={30} />
                                       </Link>
                                    </div>
                                    <div className={styles.despublishArticle}>
                                       <Link className={styles.despublishArti} href={`/articleDespublish?article_id=${articlAdmin.id}`}>
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
                        <span>Total de artigos: {totalAdmin}</span>
                     </div>

                     <div className={styles.containerArticlesPages}>
                        {currentPageAdmin > 1 && (
                           <div className={styles.previus}>
                              <button onClick={() => setCurrentPageAdmin(currentPageAdmin - 1)}>
                                 Voltar
                              </button>
                           </div>
                        )}

                        {pagesAdmin.map((pageAdmin) => (
                           <span
                              className={styles.page}
                              key={pageAdmin}
                              onClick={() => setCurrentPageAdmin(pageAdmin)}
                           >
                              {pageAdmin}
                           </span>
                        ))}

                        {currentPageAdmin < admin.length && (
                           <div className={styles.next}>
                              <button onClick={() => setCurrentPageAdmin(currentPageAdmin + 1)}>
                                 Avançar
                              </button>
                           </div>
                        )}

                     </div>
                  </div>

               </section>)}

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
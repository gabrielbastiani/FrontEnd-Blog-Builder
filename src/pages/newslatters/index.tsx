import React, { useEffect, useCallback, useState } from 'react'
import Head from '../../../node_modules/next/head'
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { api } from '../../services/apiClient';
import { FooterPainel } from '../../components/FooterPainel/index'
import { HeaderPainel } from '../../components/HeaderPainel/index'
import styles from './styles.module.scss'
import moment from 'moment';
import Link from '../../../node_modules/next/link';
import { FaTrashAlt, FaFileExport } from 'react-icons/fa'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { FiRefreshCcw } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { Input } from '../../components/ui/Input/index';
import { toast } from 'react-toastify';


export default function Newslatters() {

   const router = useRouter()

   const [newslatter, setNewslatter] = useState([]);
   const [totalNews, setTotalNews] = useState(0);
   const [limitNews, setLimitNews] = useState(9);
   const [pagesNews, setPagesNews] = useState([]);
   const [currentPageNews, setCurrentPageNews] = useState(1);

   const [initialFilter, setInitialFilter] = useState();
   const [search, setSearch] = useState([]);


   useEffect(() => {
      async function loadNewslatters() {
         try {
            const { data } = await api.get(`/newslatter/page?pageNews=${currentPageNews}&limitNews=${limitNews}`);
            setTotalNews(data?.totalNews);
            const totalPagesNews = Math.ceil(totalNews / limitNews);

            const arrayPagesNews = [];
            for (let i = 1; i <= totalPagesNews; i++) {
               arrayPagesNews.push(i);
            }

            setPagesNews(arrayPagesNews);
            setNewslatter(data?.newslatter || []);

         } catch (error) {

            console.error(error);
            alert('Error call api list Newslatters');

         }
      }

      loadNewslatters();
   }, [currentPageNews, limitNews, totalNews]);

   const limitsNews = useCallback((e) => {
      setLimitNews(e.target.value);
      setCurrentPageNews(1);
   }, []);

   async function handleRefreshNewslatters() {
      const apiClient = setupAPIClient();

      const response = await apiClient.get('/newslatter/all')
      setNewslatter(response.data);

      router.reload()
   }

   const handleChange = ({ target }) => {
      if (!target.value) {
         setSearch(initialFilter);

         return;
      }

      const filterArticles = newslatter.filter((filt) => filt.nameEmail.toLowerCase().includes(target.value));
      setNewslatter(filterArticles);
   }

   async function handleRefreshFilter() {
      const apiClient = setupAPIClient();

      const response = await apiClient.get('/newslatter/all')
      setNewslatter(response.data);

   }

   async function handleExportNewslatter() {
      const apiClient = setupAPIClient();

      const response = await apiClient.get('/newslatter/export');

      toast.success('Lista de contatos exportada com sucesso!')

   }



   return (
      <>
         <Head>
            <title>Central de E-mails - Blog Builder Seu Negócio Online</title>
         </Head>
         <main>

            <HeaderPainel />

            <section className={styles.sectionReturn}>

               <Link href={'/dashboard'}>
                  <BsFillArrowLeftSquareFill className={styles.return} size={30} />
               </Link>

               <h1>Central de e-mails (Newslatters)</h1>

            </section>

            <section className={styles.sectionChangePage}>

               <h5>Total de contatos por página: </h5>

               <br />

               <select onChange={limitsNews}>
                  <option value="9">9</option>
                  <option value="15">15</option>
                  <option value="27">27</option>
                  <option value="999999">Todas</option>
               </select>

            </section>

            <section className={styles.refresh}>
               <button className={styles.buttonRefresh} onClick={handleRefreshNewslatters}>
                  <FiRefreshCcw size={22} />Atualizar Lista de E-mails
               </button>
            </section>

            <section className={styles.boxSearch}>
               <Input
                  placeholder='Busca por contato'
                  type="search"
                  onChange={handleChange}
               />

               <button
                  onClick={handleRefreshFilter}>Limpar filtro
               </button>
            </section>

            <section className={styles.refresh}>
               <button className={styles.buttonRefresh} onClick={handleExportNewslatter}>
                  <FaFileExport size={22} />Exportar Lista de E-mails
               </button>
            </section>

            <section className={styles.sectionContact}>

               <div className={styles.contactformSection}>

                  {newslatter.length === 0 && (
                     <span className={styles.emptyList}>
                        Nenhum contato por enquanto...
                     </span>
                  )}

                  {newslatter.map((news) => {
                     return (
                        <>
                           <div key={news.id} className={styles.contactForm}>
                              <div className={styles.iconsContainer}>
                                 <div className={styles.trashLink}>
                                    <Link href={`/newsDelete?newslatter_id=${news.id}`}>
                                       <FaTrashAlt className={styles.trash} color='var(--red)' size={25} />
                                    </Link>
                                 </div>
                              </div>
                              <div className={styles.dataContact}>
                                 <span>Contato recebido: {moment(news?.created_at).format('DD/MM/YYYY - HH:mm')}</span>
                              </div>
                              <label>Nome</label>
                              <div className={styles.nameContact}>
                                 <span className={styles.name}>{news.nameEmail}</span>
                              </div>
                              <label>E-mail</label>
                              <div className={styles.emailContact}>
                                 <span className={styles.email}>{news.emailName}</span>
                              </div>
                           </div>
                        </>
                     )
                  })}
               </div>

            </section>

            <section className={styles.containerPagination}>
               <div className={styles.totalCategorys}>
                  <span>Total de categorias: {totalNews}</span>
               </div>

               <div className={styles.containerCategorysPages}>
                  {currentPageNews > 1 && (
                     <div className={styles.previus}>
                        <button onClick={() => setCurrentPageNews(currentPageNews - 1)}>
                           Voltar
                        </button>
                     </div>
                  )}

                  {pagesNews.map((page) => (
                     <span
                        className={styles.page}
                        key={page}
                        onClick={() => setCurrentPageNews(page)}
                     >
                        {page}
                     </span>
                  ))}

                  {currentPageNews < newslatter.length && (
                     <div className={styles.next}>
                        <button onClick={() => setCurrentPageNews(currentPageNews + 1)}>
                           Avançar
                        </button>
                     </div>
                  )}

               </div>
            </section>

         </main>
         <FooterPainel />
      </>
   )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
   const apliClient = setupAPIClient(ctx)

   return {
      props: {}
   }
})
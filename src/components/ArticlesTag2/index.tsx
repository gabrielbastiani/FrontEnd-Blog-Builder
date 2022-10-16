import React, { useEffect, useState } from "react";
import { api } from "../../services/apiClient";
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import Head from "../../../node_modules/next/head";
import moment from 'moment';
import { BsCalendarCheck } from 'react-icons/bs'
import { AiOutlineFolderOpen, AiOutlineArrowRight, AiOutlineTags } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Button } from '../../components/ui/Button/index';
import Link from "../../../node_modules/next/link";
import Image from "../../../node_modules/next/image";


export function ArticlesTag2() {

   const router = useRouter()

   const [articlestagName2, setArticlestagName2] = useState([]);
   const [total, setTotal] = useState(0);
   const [limit, setLimit] = useState(4);
   const [pages, setPages] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);

   const [tagName2, setTagName2] = useState('');


   useEffect(() => {
      async function loadArticles() {
         try {
            const tagName2 = router.query.tagName2;

            const { data } = await api.get(`/tag2/article?page=${currentPage}&limit=${limit}&tagName2=${tagName2}`);

            setTotal(data?.total);
            const totalPages = Math.ceil(total / limit);

            const arrayPages = [];
            for (let i = 1; i <= totalPages; i++) {
               arrayPages.push(i);
            }

            setPages(arrayPages);
            setArticlestagName2(data?.articles || []);

            setTagName2(tagName2)

         } catch (error) {

            console.error(error);
            alert('Error call api list article');

         }
      }

      loadArticles();
   }, [currentPage, limit, router.query.tagName2, total]);



   return (
      <>
         <Head>
            <title>TAG - {tagName2} - Blog Builder Seu Negócio Online</title>
         </Head>

         <main className={styles.dashboard}>

            <section className={styles.container}>

               {articlestagName2.length === 0 && (
                  <span className={styles.emptyList}>
                     Nenhum artigo encontrado com essa TAG...
                  </span>
               )}

               <h1>TAG: {tagName2}</h1>

               <br />

               <div className={styles.articlesSection}>
                  {articlestagName2.map((articl) => {
                     return (
                        <>
                           <div key={articl.id} className={styles.articleBox}>
                              <div className={styles.titleArticle}>
                                 <h1>{articl.title}</h1>
                              </div>
                              <div className={styles.informationsArticle}>
                                 <span><BsCalendarCheck color='var(--orange)' size={20} /> {moment(articl?.created_at).format('DD/MM/YYYY')}</span>
                                 <span><BiEdit color='var(--orange)' size={20} />
                                    <Link href={`/authorArticles?name=${articl?.name}`}>
                                       {articl?.name}
                                    </Link>
                                 </span>
                                 <span><AiOutlineFolderOpen color='var(--orange)' size={25} />
                                    <Link href={`/categoryPage?categoryName=${articl?.categoryName}`}>
                                       {articl?.categoryName}
                                    </Link>
                                 </span>
                              </div>
                              <Link href={`/articlePage?article_id=${articl.id}`}>
                                 <div className={styles.bannerArticle}>
                                    <Image src={"https://apiblog.builderseunegocioonline.com.br/files/" + articl?.banner} width={740} height={418} alt="banner do artigo" />
                                 </div>
                              </Link>
                              <div className={styles.tags}>

                                 <span><AiOutlineTags color='var(--orange)' size={25} />
                                    <Link href={`/tagArticlesPageOne?tagName1=${articl?.tagName1}`}>
                                       {articl?.tagName1}
                                    </Link>
                                    &nbsp;
                                    <span> - </span>
                                    &nbsp;
                                    <Link href={`/tagArticlesPageTwo?tagName2=${articl?.tagName2}`}>
                                       {articl?.tagName2}
                                    </Link>
                                    &nbsp;
                                    <span> - </span>
                                    &nbsp;
                                    <Link href={`/tagArticlesPageThree?tagName3=${articl?.tagName3}`}>
                                       {articl?.tagName3}
                                    </Link>
                                    &nbsp;
                                    <span> - </span>
                                    &nbsp;
                                    <Link href={`/tagArticlesPageFour?tagName4=${articl?.tagName4}`}>
                                       {articl?.tagName4}
                                    </Link>
                                    &nbsp;
                                    <span> - </span>
                                    &nbsp;
                                    <Link href={`/tagArticlesPageFive?tagName5=${articl?.tagName5}`}>
                                       {articl?.tagName5}
                                    </Link>
                                 </span>

                              </div>

                              <div className={styles.descriptionArticle} dangerouslySetInnerHTML={{ __html: articl?.description }}></div>

                              <Link href={`/articlePage?article_id=${articl.id}`}>
                                 <div className={styles.articleMore}>
                                    <Button>Ler mais...</Button>
                                    <AiOutlineArrowRight className={styles.arrowArticle} color='var(--orange)' size={30} />
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

                     {currentPage < articlestagName2.length && (
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
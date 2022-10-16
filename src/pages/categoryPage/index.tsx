import React, { useEffect, useState } from "react";
import { api } from "../../services/apiClient";
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import Head from "../../../node_modules/next/head";
import moment from 'moment';
import { HeaderBlog } from "../../components/HeaderBlog/index";
import { FooterBlog } from "../../components/FooterBlog/index";
import { BsCalendarCheck } from 'react-icons/bs'
import { AiOutlineFolderOpen, AiOutlineArrowRight, AiOutlineTags } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Button } from '../../components/ui/Button';
import Link from "../../../node_modules/next/link";
import { SearchBar } from "../../components/SearchBar/index";
import { RecentPosts } from "../../components/RecentPosts/index";
import Image from "../../../node_modules/next/image";


export default function CategoryPage() {

   const router = useRouter()

   const [articlesCategory, setArticlesCategory] = useState([]);
   const [total, setTotal] = useState(0);
   const [limit, setLimit] = useState(4);
   const [pages, setPages] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);

   const [category, setCategory] = useState('');


   useEffect(() => {
      async function loadArticles() {
         try {
            const categoryName = router.query.categoryName;

            const { data } = await api.get(`/category/article?page=${currentPage}&limit=${limit}&categoryName=${categoryName}`);

            setTotal(data?.total);
            const totalPages = Math.ceil(total / limit);

            const arrayPages = [];
            for (let i = 1; i <= totalPages; i++) {
               arrayPages.push(i);
            }

            setPages(arrayPages);
            setArticlesCategory(data?.articles || []);

            setCategory(categoryName)

         } catch (error) {

            console.error(error);
            alert('Error call api list article');

         }
      }

      loadArticles();
   }, [currentPage, limit, router.query.categoryName, total]);


   return (
      <>
         <Head>
            <title>{category} - Blog Builder Seu Negócio Online</title>
         </Head>

         <main className={styles.sectionCategory}>

            <HeaderBlog />

            <section className={styles.sectionContent}>

               <nav className={styles.articleSidbar}>
                  <SearchBar />
                  <RecentPosts />
               </nav>

               <div className={styles.emptyListBox}>
                  {articlesCategory.length === 0 && (
                     <span className={styles.emptyList}>
                        Nenhum artigo encontrado com essa categoria...
                     </span>
                  )}
               </div>

               <article className={styles.articleMaster}>

                  <h1>Categoria: {category}</h1>

                  <div className={styles.articlesSection}>
                     {articlesCategory.map((article) => {
                        return (
                           <>
                              <div className={styles.articleBox}>
                                 <div className={styles.titleArticle}>
                                    <h1>{article.title}</h1>
                                 </div>
                                 <div className={styles.informationsArticle}>
                                    <span><BsCalendarCheck color='var(--orange)' size={20} /> {moment(article?.created_at).format('DD/MM/YYYY')}</span>
                                    <span><BiEdit color='var(--orange)' size={20} />
                                       <Link href={`/authorArticles?name=${article?.name}`}>
                                          {article?.name}
                                       </Link>
                                    </span>
                                    <span><AiOutlineFolderOpen color='var(--orange)' size={25} />
                                       <Link href={`/categoryPage?categoryName=${article?.categoryName}`}>
                                          {article?.categoryName}
                                       </Link>
                                    </span>
                                 </div>

                                 <Link href={`/articlePage?article_id=${article.id}`}>
                                    <div className={styles.bannerArticle}>
                                       <Image src={"http://localhost:3333/files/" + article?.banner} width={740} height={418} alt="banner do artigo" />
                                    </div>
                                 </Link>

                                 <div className={styles.tags}>

                                    <span><AiOutlineTags color='var(--orange)' size={25} />
                                       <Link href={`/tagArticlesPageOne?tagName1=${article?.tagName1}`}>
                                          {article?.tagName1}
                                       </Link>
                                       &nbsp;
                                       <span> - </span>
                                       &nbsp;
                                       <Link href={`/tagArticlesPageTwo?tagName2=${article?.tagName2}`}>
                                          {article?.tagName2}
                                       </Link>
                                       &nbsp;
                                       <span> - </span>
                                       &nbsp;
                                       <Link href={`/tagArticlesPageThree?tagName3=${article?.tagName3}`}>
                                          {article?.tagName3}
                                       </Link>
                                       &nbsp;
                                       <span> - </span>
                                       &nbsp;
                                       <Link href={`/tagArticlesPageFour?tagName4=${article?.tagName4}`}>
                                          {article?.tagName4}
                                       </Link>
                                       &nbsp;
                                       <span> - </span>
                                       &nbsp;
                                       <Link href={`/tagArticlesPageFive?tagName5=${article?.tagName5}`}>
                                          {article?.tagName5}
                                       </Link>
                                    </span>
                                 </div>

                                 <div className={styles.descriptionArticle} dangerouslySetInnerHTML={{ __html: article?.description }}></div>

                                 <Link href={`/articlePage?article_id=${article.id}`}>
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

                        {currentPage < articlesCategory.length && (
                           <div className={styles.next}>
                              <button onClick={() => setCurrentPage(currentPage + 1)}>
                                 Avançar
                              </button>
                           </div>
                        )}

                     </div>
                  </div>

               </article>

            </section>

            <FooterBlog />

         </main>
      </>
   )
}
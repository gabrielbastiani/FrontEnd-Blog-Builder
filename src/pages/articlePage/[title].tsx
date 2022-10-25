import { useEffect, useState } from "react";
import { api } from "../../services/apiClient";
import styles from './styles.module.scss';
import Head from "next/head";
import moment from 'moment';
import { HeaderBlog } from "../../components/HeaderBlog/index";
import { FooterBlog } from "../../components/FooterBlog/index";
import { SearchBar } from "../../components/SearchBar/index";
import { RecentPosts } from "../../components/RecentPosts/index";
import { BsCalendarCheck, BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';
import { AiOutlineFolderOpen, AiOutlineTags } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import Link from "next/link";
import Disqus from "disqus-react";
import { Newslatter } from "../../components/Newslatter/index";
import Image from "next/image";
import { Ads } from "../../components/Ads/index";
import { AdsFooter } from "../../components/AdsFooter/index";
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import router from "../../../node_modules/next/router";


interface Article {
   id: string;
   title: string;
   description: string;
   banner: string;
   categoryName: string;
   name: string;
   tagName1: string;
   tagName2: string;
   tagName3: string;
   tagName4: string;
   tagName5: string;
   created_at: string;
}

export default function ArticlePage({ id, title, description, banner, categoryName, name, tagName1, tagName2, tagName3, tagName4, tagName5, created_at }: Article) {

   const [articles, setArticles] = useState([]);
   const [total, setTotal] = useState(0);
   const [limit, setLimit] = useState(3);
   const [pages, setPages] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);

   const [post, setPost] = useState([]);
   const [postPrevious, setPostPrevious] = useState([]);
   const [postPreviousTitle, setPostPreviousTitle] = useState('');
   const [postNext, setPostNext] = useState([]);
   const [postNextTitle, setPostNextTitle] = useState('');


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
            alert('Clique para continuar');
         }
      }

      loadArticles();
   }, [currentPage, limit, total]);


   useEffect(() => {
      async function loadArticlePage() {
         try {
            const dataPage = await api.get(`/article/read?title=${title}`);

            setPost(dataPage?.data.title);
            setPostPrevious(dataPage?.data.postPrevious.title);
            setPostPreviousTitle(dataPage?.data.postPrevious.title)
            setPostNext(dataPage?.data.postNext.title);
            setPostNextTitle(dataPage?.data.postNext.title)

         } catch (error) {
            console.error(error);
            alert('Clique para continuar!');
         }
      }

      loadArticlePage();
   }, []);

   async function handleArticle() {
      location.reload();
   }

   const handleArticlePrevius = (e) => {
      router.push(`/articlePage/${postPrevious}`);
      setTimeout(() => {
         handleArticle()
      }, 1000)
   }

   const handleArticleNext = (e) => {
      router.push(`/articlePage/${postNext}`);
      setTimeout(() => {
         handleArticle()
      }, 1000)
   }

   const disqusShortname = "blog-builder-seu-negocio-online" //found in your Disqus.com dashboard
   const disqusConfig = {
      url: `https://blog.builderseunegocioonline.com.br/${title}`, //this.props.pageUrl
      identifier: `${id}`, //this.props.uniqueId
      title: `${title}` //this.props.title
   }



   return (
      <>
         <Head>
            <title>{title} - Blog Builder Seu Negócio Online</title>
         </Head>

         <main className={styles.sectionCategory}>

            <HeaderBlog />

            <section className={styles.sectionContent}>

               <nav className={styles.articleSidbar}>
                  <SearchBar />
                  <RecentPosts />
                  <br />
                  <Ads />
               </nav>

               <article className={styles.articleMaster}>


                  <div className={styles.articleBox}>
                     <div className={styles.titleArticle}>
                        <h1>{title}</h1>
                     </div>
                     <div className={styles.informationsArticle}>
                        <span><BsCalendarCheck color='var(--orange)' size={20} /> {moment(created_at).format('DD/MM/YYYY')}</span>
                        <span><BiEdit color='var(--orange)' size={25} />
                           <Link href={`/authorArticles?name=${name}`}>
                              {name}
                           </Link>
                        </span>
                        <span><AiOutlineFolderOpen color='var(--orange)' size={25} />
                           <Link href={`/categoryPage?categoryName=${categoryName}`}>
                              {categoryName}
                           </Link>
                        </span>
                     </div>

                     <div className={styles.bannerArticle}>
                        <Image src={"http://localhost:3333/files/" + banner} width={740} height={418} alt="banner do artigo" />
                     </div>

                     <div className={styles.descriptionArticle} dangerouslySetInnerHTML={{ __html: description }}></div>

                     <div className={styles.tags}>

                        <span><AiOutlineTags color='var(--orange)' size={25} />
                           <Link href={`/tagArticlesPageOne?tagName1=${tagName1}`}>
                              {tagName1}
                           </Link>
                           &nbsp;
                           <span> - </span>
                           &nbsp;
                           <Link href={`/tagArticlesPageTwo?tagName2=${tagName2}`}>
                              {tagName2}
                           </Link>
                           &nbsp;
                           <span> - </span>
                           &nbsp;
                           <Link href={`/tagArticlesPageThree?tagName3=${tagName3}`}>
                              {tagName3}
                           </Link>
                           &nbsp;
                           <span> - </span>
                           &nbsp;
                           <Link href={`/tagArticlesPageFour?tagName4=${tagName4}`}>
                              {tagName4}
                           </Link>
                           &nbsp;
                           <span> - </span>
                           &nbsp;
                           <Link href={`/tagArticlesPageFive?tagName5=${tagName5}`}>
                              {tagName5}
                           </Link>
                        </span>
                     </div>

                     <br />

                     <h2 className={styles.vejaTambem}>Veja também...</h2>

                     <div className={styles.containerArticlesPages}>

                        <div className={styles.containerArticles}>

                           {articles.length === 0 && (
                              <span className={styles.emptyList}>
                                 Nenhum artigo cadastrado...
                              </span>
                           )}

                           {currentPage > 1 && (
                              <div className={styles.previus}>
                                 <BsFillArrowLeftSquareFill color='var(--orange)' size={40} onClick={() => setCurrentPage(currentPage - 1)} />
                              </div>
                           )}

                           {articles.map((posts) => {
                              return (
                                 <>
                                    <div className={styles.articleBoxFooter}>
                                       <Link href={`/articlePage/${posts.title}`}>
                                          <div className={styles.article}>
                                             <h4>{posts?.title}</h4>
                                             <Image src={"http://localhost:3333/files/" + posts?.banner} width={740} height={418} alt="banner do artigo" />
                                          </div>
                                       </Link>
                                    </div>
                                 </>
                              )
                           })}

                           {currentPage < articles.length && (
                              <div className={styles.next}>
                                 <BsFillArrowRightSquareFill color='var(--orange)' size={40} onClick={() => setCurrentPage(currentPage + 1)} />
                              </div>
                           )}

                        </div>
                     </div>

                     <div className={styles.pagination}>
                        <button className={styles.proximo} onClick={() => handleArticleNext()}>
                           {postNextTitle}
                        </button>
                        
                        <button className={styles.antes} onClick={() => handleArticlePrevius()}>
                           {postPreviousTitle}
                        </button>
                     </div>

                     <Disqus.DiscussionEmbed
                        shortname={disqusShortname}
                        config={disqusConfig}
                     />
                  </div>
                  <Newslatter />
                  <br />
                  <br />
                  <AdsFooter />
               </article>
               <br />
               <br />
            </section>
            <FooterBlog />
         </main>
      </>
   )
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
   const title = context.query.title as string;

   const response = await api.get<Article>(`/article/exact?title=${title}`);

   const article = response.data;

   return {
      props: article,
   }

};
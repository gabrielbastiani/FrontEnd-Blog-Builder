import { useEffect, useState } from "react";
import { api } from "../../services/apiClient";
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import Head from "next/head";
import moment from 'moment';
import { HeaderBlog } from "../../components/HeaderBlog/index";
import { FooterBlog } from "../../components/FooterBlog/index";
import { SearchBar } from "../../components/SearchBar/index";
import { RecentPosts } from "../../components/RecentPosts/index";
import { BsCalendarCheck, BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs'
import { AiOutlineFolderOpen, AiOutlineTags } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import Link from "next/link";
import Disqus from "disqus-react"
import { Newslatter } from "../../components/Newslatter/index";
import Image from "next/image";
import { Ads } from "../../components/Ads/index";
import { AdsFooter } from "../../components/AdsFooter/index";
import { setupAPIClient } from "../../services/api";
import { GetServerSideProps, GetServerSidePropsContext } from 'next';



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

export default function ArticlePage({ title, description, banner, categoryName, name, tagName1, tagName2, tagName3, tagName4, tagName5, created_at }: Article) {

   const router = useRouter();

   /* const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [banner, setBanner] = useState('');
   const [categoryName, setCategoryName] = useState('');
   const [name, setName] = useState('');
   const [tagName1, setTagName1] = useState('');
   const [tagName2, setTagName2] = useState('');
   const [tagName3, setTagName3] = useState('');
   const [tagName4, setTagName4] = useState('');
   const [tagName5, setTagName5] = useState('');
   const [created_at, setCreated_at] = useState('');

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

   const titleArticle = router.query.title;

   useEffect(() => {
      async function articlesLoad() {
         const apiClient = setupAPIClient()
         try {
            const articleDate = await apiClient.get(`/article/exact?title=${titleArticle}`);
            const { created_at, title, description, banner, name, categoryName, tagName1, tagName2, tagName3, tagName4, tagName5 } = articleDate.data;

            setTitle(title)
            setDescription(description)
            setBanner(banner)
            setCategoryName(categoryName)
            setName(name)
            setTagName1(tagName1)
            setTagName2(tagName2)
            setTagName3(tagName3)
            setTagName4(tagName4)
            setTagName5(tagName5)
            setCreated_at(created_at)

         } catch (error) {
            console.error(error);
            alert('Clique para continuar');
         }
      }

      articlesLoad()
   }, [router.query.titleArticle])


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
            const titleArticle = router.query.title;
            const dataPage = await api.get(`/article/read?title=${titleArticle}`);

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
   }, [router.query.article_id]);

   const article_id = router.query.article_id

   const disqusShortname = "blog-builder-seu-negocio-online" //found in your Disqus.com dashboard
   const disqusConfig = {
      url: `https://blog.builderseunegocioonline.com.br?title=${title}`, //this.props.pageUrl
      identifier: `${article_id}`, //this.props.uniqueId
      title: `${title}` //this.props.title
   } */



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

                        {/* <div className={styles.containerArticles}>

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
                                       <Link href={`/articlePageRecent?title=${posts.title}`}>
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

                        </div> */}
                     </div>

                     {/* <div className={styles.pagination}>
                        <button className={styles.antes}>
                           <Link href={`/articlePageArrow?title=${postPrevious}`}>
                              {postPreviousTitle}
                           </Link>
                        </button>

                        <button className={styles.proximo}>
                           <Link href={`/articlePageArrow?title=${postNext}`}>
                              {postNextTitle}
                           </Link>
                        </button>

                     </div> */}

                     {/* <Disqus.DiscussionEmbed
                        shortname={disqusShortname}
                        config={disqusConfig}
                     /> */}
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
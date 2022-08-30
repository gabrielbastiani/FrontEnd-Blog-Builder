import { useEffect, useState } from 'react';
import { FooterBlog } from '../../components/FooterBlog/index'
import { HeaderBlog } from '../../components/HeaderBlog/index'
import Head from '../../../node_modules/next/head'
import styles from './styles.module.scss'
import { api } from '../../services/apiClient';
import moment from 'moment';
import Link from "../../../node_modules/next/link";
import { useRouter } from '../../../node_modules/next/router'
import { BsCalendarCheck } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
import { AiOutlineFolderOpen, AiOutlineTags } from 'react-icons/ai'


export default function ArticlePage() {

   const router = useRouter()

   const [title, setTitle] = useState('')
   const [description, setDescription] = useState('')
   const [banner, setBanner] = useState('')
   const [categoryName, setCategoryName] = useState('')
   const [name, setName] = useState('')
   const [tagName1, setTagName1] = useState('')
   const [tagName2, setTagName2] = useState('')
   const [tagName3, setTagName3] = useState('')
   const [tagName4, setTagName4] = useState('')
   const [tagName5, setTagName5] = useState('')
   const [created_at, setCreated_at] = useState('')

   const [articles, setArticles] = useState([]);
   const [total, setTotal] = useState(0);
   const [limit, setLimit] = useState(1);
   const [pages, setPages] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);



   useEffect(() => {
      async function loadArticle() {
         try {
            const article_id = router.query.article_id
            const articleDate = await api.get(`/article/exact?article_id=${article_id}`);
            const { created_at, title, description, banner, name, categoryName, tagName1, tagName2, tagName3, tagName4, tagName5 } = articleDate.data

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
            console.log(error)
            alert('Error call API article')
         }
      }
      loadArticle();
   }, [router.query.article_id])

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
         <Head>
            <title>Blog Builder Seu Negócio Online</title>
         </Head>

         <main className={styles.articleMain}>
            <HeaderBlog />
            <section className={styles.sectionContent}>
               <nav>Navigation</nav>
               <article className={styles.sectionArticle}>
                  <h1>{title}</h1>
                  <br />
                  <div className={styles.informationsArticle}>
                     <span><BsCalendarCheck color='var(--orange)' size={20} /> {moment(created_at).format('DD/MM/YYYY')}</span>
                     <span><BiEdit color='var(--orange)' size={20} />
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

                  <div className={styles.bannerBox}>
                     <img src={"http://localhost:3333/files/" + banner} alt="banner do artigo" />
                  </div>

                  <div className={styles.contentBox} dangerouslySetInnerHTML={{ __html: description }}></div>

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
               </article>
            </section>
            <FooterBlog />
         </main>
      </>
   )
}
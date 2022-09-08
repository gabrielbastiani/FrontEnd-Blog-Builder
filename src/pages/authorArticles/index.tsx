import { useEffect, useState } from "react";
import { api } from "../../services/apiClient";
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import Head from "../../../node_modules/next/head";
import moment from 'moment';
import { HeaderBlog } from "../../components/HeaderBlog/index";
import { FooterBlog } from "../../components/FooterBlog/index";


export default function AuthorArticles() {

   const [articlesUser, setArticlesUser] = useState([]);
   const [user, setUser] = useState('');

   console.log(articlesUser.map((item) => item.name))

   const router = useRouter()


   useEffect(() => {
      async function loadarticlesUser() {
         const name = router.query.name;
         const response = await api.get(`/user/article?name=${name}`);

         const articles = response.data;

         setArticlesUser(articles);
         setUser(name)

      }

      loadarticlesUser()
   }, [router.query.name])


   return (
      <>
         <Head>
            <title>{user} - Blog Builder Seu Negócio Online</title>
         </Head>

         <main className={styles.sectionCategory}>

            <HeaderBlog />

            <section className={styles.sectionArticles}>

               {articlesUser.length === 0 && (
                  <span className={styles.emptyList}>
                     Nenhum artigo encontrado com esse usúario...
                  </span>
               )}

               {articlesUser.map((article) => {
                  return (
                     <>
                        <div key={article.id}>
                           <span>{article?.name}</span>
                           <span>{article?.categoryName}</span>
                           <span>{article?.title}</span>
                           <span>{article?.tag1} - {article?.tag2} - {article?.tag3} - {article?.tag4}</span>
                           <span>Data de criação do artigo: {moment(article?.created_at).format('DD/MM/YYYY HH:mm')}</span>
                           <span><img src={"http://localhost:3333/files/" + article?.banner} alt="banner do artigo" /></span>
                           <span dangerouslySetInnerHTML={{ __html: article?.description }}></span>
                        </div>
                     </>
                  )
               })}
            </section>

            <FooterBlog />

         </main>
      </>
   )
}
import { useEffect, useState } from "react";
import { api } from "../../services/apiClient";
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import Head from "../../../node_modules/next/head";
import moment from 'moment';
import { HeaderBlog } from "../../components/HeaderBlog/index";
import { FooterBlog } from "../../components/FooterBlog/index";


export default function TagArticlesPageThree() {

    const [tag3Articles, setTag3Articles] = useState([]);

    const router = useRouter()


    useEffect(() => {
        async function loadArticlesTag() {
            const tagName3 = router.query.tagName3;

            const responseTag3 = await api.get(`/tag3/article?tagName3=${tagName3}`);

            const articlesTag3 = responseTag3.data;

            setTag3Articles(articlesTag3)

        }

        loadArticlesTag()
    }, [router.query.tagName3])


    return (
        <>
            <Head>
                <title>TAG - Blog Builder Seu Negócio Online</title>
            </Head>

            <main className={styles.sectionCategory}>

                <HeaderBlog />

                <section className={styles.sectionArticles}>

                    {tag3Articles.length === 0 && (
                        <span className={styles.emptyList}>
                            Nenhum artigo encontrado com essa TAG...
                        </span>
                    )}

                    {tag3Articles.map((article) => {
                        return (
                            <>
                                <div key={article.id}>
                                    <span>{article?.categoryName}</span>
                                    <span>{article?.title}</span>
                                    <span>{article?.name}</span>
                                    <span>{article?.tagName1} - {article?.tagName2} - {article?.tagName3} - {article?.tagName4} - {article?.tagName5}</span>
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
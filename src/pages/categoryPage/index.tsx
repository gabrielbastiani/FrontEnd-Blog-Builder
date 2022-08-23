import { useEffect, useState } from "react";
import { api } from "../../services/apiClient";
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import Head from "../../../node_modules/next/head";
import moment from 'moment';


export default function CategoryPage() {

    const [articelesCategory, setArticlesCategory] = useState([]);

    console.log(articelesCategory)

    const router = useRouter()

    useEffect(() => {
        async function loadArticlesCategory() {
            const name = router.query.name;
            const response = await api.get(`/category/article?name=${name}`);

            const articles = response.data;

            setArticlesCategory(articles)

        }

        loadArticlesCategory()
    }, [router.query.name])


    return (
        <>
            <Head>
                <title>Categoria - Blog Builder Seu Negócio Online</title>
            </Head>

            <main className={styles.sectionCategory}>

                <section className={styles.sectionArticles}>
                    
                    {articelesCategory.length === 0 && (
                        <span className={styles.emptyList}>
                            Nenhum artigo encontrado nessa categoria...
                        </span>
                    )}

                    {articelesCategory.map((article) => {
                        return (
                            <>
                                <div key={article.id}>
                                    <span>{article?.category_id}</span>
                                    <span>{article?.title}</span>
                                    <span>Data de criação do artigo: {moment(article?.created_at).format('DD/MM/YYYY HH:mm')}</span>
                                    <span><img src={"http://localhost:3333/files/" + article?.banner} alt="banner do artigo" /></span>
                                    <span dangerouslySetInnerHTML={{ __html: article?.description }}></span>
                                </div>
                            </>
                        )
                    })}
                </section>
            </main>
        </>
    )
}
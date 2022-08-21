import { useEffect, useState } from "react";
import { api } from "../../services/apiClient";
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import Head from "../../../node_modules/next/head";
import moment from 'moment';


export default function CategoryArticles() {

    const [articelesCategory, setArticlesCategory] = useState([]);

    const [categories, setCategories] = useState([])
    const [categorySelected, setCategorySelected] = useState(0)

    console.log(articelesCategory)

    const router = useRouter()

    useEffect(() => {
        async function loadArticlesCategory() {
            const category_id = router.query.category_id;
            const response = await api.get(`/category/article?category_id=${category_id}`);

            const articles = response.data;

            setArticlesCategory(articles)

        }

        loadArticlesCategory()
    }, [router.query.category_id])




    useEffect(() => {
        async function loadCategory() {
            const categoryid = router.query.item_id
            const responseProduct = await api.get(`/article/exact?category_id=${categoryid}`)
            const { category_id } = responseProduct.data
            let categoryFilter = categories.filter(result => result.id.match(category_id));

            setCategories(categoryFilter)
        }

        loadCategory()
    }, [])



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
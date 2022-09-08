import { useEffect, useState } from "react";
import { api } from "../../services/apiClient";
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import Head from "../../../node_modules/next/head";
import moment from 'moment';
import { HeaderBlog } from "../../components/HeaderBlog/index";
import { FooterBlog } from "../../components/FooterBlog/index";
import { SearchBar } from "../../components/SearchBar/index";
import { RecentPosts } from "../../components/RecentPosts/index";
import { BsCalendarCheck } from 'react-icons/bs'
import { AiOutlineFolderOpen, AiOutlineTags, AiOutlineArrowRight } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import Link from "../../../node_modules/next/link";
import { Button } from "../../components/ui/Button/index";


export default function CategoryPage() {

    const [articelesCategory, setArticlesCategory] = useState([]);
    const [category, setCategory] = useState('');

    const router = useRouter()


    useEffect(() => {
        async function loadArticlesCategory() {
            const categoryName = router.query.categoryName;
            const response = await api.get(`/category/article?categoryName=${categoryName}`);

            const articles = response.data;

            setArticlesCategory(articles)
            setCategory(categoryName)

        }

        loadArticlesCategory()
    }, [router.query.categoryName])


    return (
        <>
            <Head>
                <title>Categoria - {category} - Blog Builder Seu Negócio Online</title>
            </Head>

            <main className={styles.sectionCategory}>

                <HeaderBlog />

                <section className={styles.sectionContent}>

                    <nav className={styles.articleSidbar}>
                        <SearchBar />
                        <RecentPosts />
                    </nav>

                    <div className={styles.emptyListBox}>
                        {articelesCategory.length === 0 && (
                            <span className={styles.emptyList}>
                                Nenhum artigo encontrado com essa TAG...
                            </span>
                        )}
                    </div>

                    <article className={styles.articleMaster}>

                        <h1>Categoria: {category}</h1>
                        
                        {articelesCategory.map((article) => {
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
                                                <img src={"http://localhost:3333/files/" + article?.banner} alt="banner do artigo" />
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
                    </article>
                </section>

                <FooterBlog />

            </main>
        </>
    )
}
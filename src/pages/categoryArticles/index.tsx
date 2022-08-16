import { useEffect, useState } from "react";
import { api } from "../../services/apiClient";
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import Head from "../../../node_modules/next/head";


export default function CategoryArticles() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [bannerUrl, setBannerUrl] = useState('');

    const router = useRouter()

    useEffect(() => {
        async function loadArticlesCategory(){
            const category_id = router.query.category_id;
            const response = await api.get(`/category/article?category_id=${category_id}`);
            const {title, description, banner} = response.data
  
            setTitle(title)
            setDescription(description)
            setBannerUrl(`http://localhost:3333/files/${banner}`)
        }

        loadArticlesCategory()
    }, [])

    

    return(
        <>
            <Head>
                <title>Categoria - Blog Builder Seu Negócio Online</title>
            </Head>

            <main className={styles.sectionCategory}>

                <section className={styles.sectionArticles}>
                    <span>{title}</span>
                </section>
                
            </main>
        </>
    )
}
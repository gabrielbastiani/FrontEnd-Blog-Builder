import React from 'react'
import Head from "next/head"
import styles from './style.module.scss';
import { useRouter } from 'next/router'
import Router from 'next/router'
import { Button } from '../../components/ui/Button/index';
import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupAPIClient } from '../../services/api'
import Link from '../../../node_modules/next/link';
import { toast } from 'react-toastify'


export default function ArticleDelete() {

    const router = useRouter()

    async function handleArticleDelete() {

        try {

            const apiClient = setupAPIClient();
        
            const article_id = router.query.article_id

            await apiClient.delete(`/article/remove?article_id=${article_id}`)

            toast.success('Artigo deletado com sucesso.')

            Router.push('/dashboard')

        } catch (err) {

            toast.error('Ops erro ao deletar')

        }

    }


    return (
        <>

            <Head>
                <title>Deletar Categoria - Builder Seu Negócio Online</title>
            </Head>

            <main className={styles.container}>

                <section className={styles.containerContent}>

                    <h2>Deseja mesmo deletar essa categoria?</h2>

                    <span>Se deleta-la, ela será desvinculada do(s) artigo(s) que pertence no momento.</span>

                    <Button
                        className={styles.buttonUpdate}
                        onClick={() => handleArticleDelete()}
                    >
                        Deletar
                    </Button>

                    <Link href={'/dashboard'}>
                        <Button
                            className={styles.buttonUpdate}
                        >
                            Cancelar
                        </Button>
                    </Link>

                </section>

            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    const categorys = await apliClient.get('category/article');

    return {
        props: {
            categorysList: categorys.data
        }
    }
})
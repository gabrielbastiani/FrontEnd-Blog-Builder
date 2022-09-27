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


export default function ArticleDespublish() {

    const router = useRouter()

    async function handleArticleDespublish() {

        try {

            const apiClient = setupAPIClient();

            const article_id = router.query.article_id

            await apiClient.put(`/article/despublish?article_id=${article_id}`)

            toast.success('Artigo despublicado com sucesso no blog.')

            Router.push('/dashboard')

        } catch (err) {

            toast.error('Ops erro ao despublicar artigo do blog')

        }

    }


    return (
        <>

            <Head>
                <title>Despublicar Artigo - Builder Seu Negócio Online</title>
            </Head>

            <main className={styles.container}>

                <section className={styles.containerContent}>

                    <h2>Deseja mesmo despublicar esse artigo no blog?</h2>

                    <Button
                        className={styles.buttonUpdate}
                        onClick={() => handleArticleDespublish()}
                    >
                        Despublicar
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

    return {
        props: {}
    }
})
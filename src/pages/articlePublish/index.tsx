import React, { useEffect, useState } from 'react'
import Head from "next/head"
import styles from './style.module.scss';
import { useRouter } from 'next/router'
import Router from 'next/router'
import { Button } from '../../components/ui/Button/index';
import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupAPIClient } from '../../services/api'
import Link from '../../../node_modules/next/link';
import { toast } from 'react-toastify'
import { api } from '../../services/apiClient';


export default function ArticlePublish() {

    const router = useRouter();

    const [roleUser, setRoleUser] = useState('');

    const userRole = "ADMIN";

    useEffect(() => {
        async function loadUser() {
            const response = await api.get('/me');
            setRoleUser(response.data.role);
        }
        loadUser()
    }, []);

    async function handleArticlePublish() {

        try {
            if (roleUser != userRole) {
                toast.error('Você não tem permisão para isso')
                return
            }

            const apiClient = setupAPIClient();

            const article_id = router.query.article_id

            await apiClient.put(`/article/published?article_id=${article_id}`)

            toast.success('Artigo publicado com sucesso no blog.')

            Router.push('/dashboard')

        } catch (err) {

            toast.error('Ops erro ao publicar no blog')

        }

    }


    return (
        <>

            <Head>
                <title>Publicar Artigo - Builder Seu Negócio Online</title>
            </Head>

            <main className={styles.container}>

                <section className={styles.containerContent}>

                    <h2>Deseja mesmo publicar esse artigo no blog?</h2>

                    <Button
                        className={styles.buttonUpdate}
                        onClick={() => handleArticlePublish()}
                    >
                        Publicar
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
import React from 'react'
import Head from "next/head"
import styles from './style.module.scss';
import { useRouter } from 'next/router'
import Router from 'next/router'
import { Button } from '../../components/ui/Button/index';
import Link from '../../../node_modules/next/link';
import { toast } from 'react-toastify'
import { api } from '../../services/apiClient';


export default function UserAuthenticated() {

    const router = useRouter()

    async function handleArticlePublish() {

        try {
        
            const user_id = router.query.user_id

            await api.put(`/users/authenticated?user_id=${user_id}`)

            toast.success('Seu cadastro esta ativo para acessar o Blog.')

            Router.push('/login')

        } catch (err) {

            toast.error('Ops erro ao se autenticar seu cadastro!')

        }

    }


    return (
        <>

            <Head>
                <title>Autenticar - Builder Seu Negócio Online</title>
            </Head>

            <main className={styles.container}>

                <section className={styles.containerContent}>

                    <h2>Confirme aqui, seu cadastro junto ao Blog para poder acessar!</h2>

                    <Button
                        className={styles.buttonUpdate}
                        onClick={() => handleArticlePublish()}
                    >
                        Confirmar
                    </Button>

                    <Link href={'/login'}>
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
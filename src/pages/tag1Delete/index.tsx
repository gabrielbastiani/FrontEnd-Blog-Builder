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


export default function Tag1Delete() {
    const router = useRouter()
    async function handleDeleteTag() {
        try {
            const apiClient = setupAPIClient();
            const tag1_id = router.query.tag1_id;
            await apiClient.delete(`/tag1/remove?tag1_id=${tag1_id}`)

            toast.success('TAG do 1º grupo deletada com sucesso!')

            Router.push('/newsTags')
        } catch (err) {
            toast.error('Ops erro ao deletar - Possivelmente por estar atrelada a algum artigo');
        }
    }

    return (
        <>
            <Head>
                <title>Deletar TAG do 1º grupo - Builder Seu Negócio Online</title>
            </Head>
            <main className={styles.container}>
                <section className={styles.containerContent}>
                    <h2>Deseja mesmo deletar essa TAG?</h2>
                    <span>Se deleta-la, ela será desvinculada do(s) artigo(s) que pertence no momento.</span>
                    <Button
                        className={styles.buttonUpdate}
                        onClick={() => handleDeleteTag()}
                    >
                        Deletar
                    </Button>
                    <Link href={'/newsTags'}>
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
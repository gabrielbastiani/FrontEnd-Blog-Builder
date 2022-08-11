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


export default function CategoryDelete() {

    const router = useRouter()

    async function handleDeleteCategory() {

        try {

            const apiClient = setupAPIClient();
        
            const category_id = router.query.category_id

            await apiClient.delete(`/category/remove?category_id=${category_id}`)

            toast.success('Categoria deletada com sucesso.')

            Router.push('/newCategory')

        } catch (err) {

            toast.error('Ops erro ao deletar - Possivelmente por estar atrelada a algum artigo')

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
                        onClick={() => handleDeleteCategory()}
                    >
                        Deletar
                    </Button>

                    <Link href={'/newCategory'}>
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

    const categorys = await apliClient.get('/category');

    return {
        props: {
            categorysList: categorys.data
        }
    }
})
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



export default function DeleteUser() {

    const router = useRouter();

    async function handleDeleteUser() {

        try {

            const apiClient = setupAPIClient();
        
            const user_id = router.query.user_id

            await apiClient.delete(`/users/remove?user_id=${user_id}`)

            toast.success('Usuario deletado com sucesso.')

            Router.push('/usersAll')

        } catch (err) {

            toast.error('Ops erro ao deletar!')

        }

    }


    return (
        <>

            <Head>
                <title>Deletar usúario - Builder Seu Negócio Online</title>
            </Head>

            <main className={styles.container}>

                <section className={styles.containerContent}>

                    <h2>Deseja mesmo deletar esse usúario do blog?</h2>

                    <Button
                        className={styles.buttonUpdate}
                        onClick={() => handleDeleteUser()}
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

    return {
        props: {}
    }
})
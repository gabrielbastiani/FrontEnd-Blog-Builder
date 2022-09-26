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


export default function NewsDelete() {

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

    async function handleContactDelete() {

        try {
            if (roleUser != userRole) {
                toast.error('Você não tem permisão para isso')
                return
            }

            const apiClient = setupAPIClient();
        
            const newslatter_id = router.query.newslatter_id

            await apiClient.delete(`/newslatter/remove?newslatter_id=${newslatter_id}`)

            toast.success('Contato deletado com sucesso.')

            Router.push('/newslatters')

        } catch (err) {

            toast.error('Ops erro ao deletar!')

        }

    }


    return (
        <>

            <Head>
                <title>Deletar E-mail - Builder Seu Negócio Online</title>
            </Head>

            <main className={styles.container}>

                <section className={styles.containerContent}>

                    <h2>Deseja mesmo deletar esse contato de e-mail?</h2>

                    <Button
                        className={styles.buttonUpdate}
                        onClick={() => handleContactDelete()}
                    >
                        Deletar
                    </Button>

                    <Link href={'/newslatters'}>
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
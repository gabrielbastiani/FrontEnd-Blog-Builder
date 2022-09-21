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


export default function ContactDelete() {

    const router = useRouter()

    async function handleContactDelete() {

        try {

            const apiClient = setupAPIClient();
        
            const contactform_id = router.query.contactform_id

            await apiClient.delete(`/contactform/remove?contactform_id=${contactform_id}`)

            toast.success('Contato deletado com sucesso.')

            Router.push('/contacts')

        } catch (err) {

            toast.error('Ops erro ao deletar!')

        }

    }


    return (
        <>

            <Head>
                <title>Deletar Contato - Builder Seu Negócio Online</title>
            </Head>

            <main className={styles.container}>

                <section className={styles.containerContent}>

                    <h2>Deseja mesmo deletar esse contato?</h2>

                    <Button
                        className={styles.buttonUpdate}
                        onClick={() => handleContactDelete()}
                    >
                        Deletar
                    </Button>

                    <Link href={'/contacts'}>
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
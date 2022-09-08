import { useState, FormEvent } from 'react'
import Head from "next/head"
import styles from './styles.module.scss'
import Router from 'next/router'
import { useRouter } from '../../../node_modules/next/router'
import Link from 'next/link';
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { toast } from 'react-toastify'
import { Button } from '../../components/ui/Button/index'
import { Input } from '../../components/ui/Input/index'


export default function Tag3Update() {

    const [tagName3, setTagName3] = useState('')
    const router = useRouter()

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData()
            if (tagName3 === '') {
                toast.error('Digite alguma palavra para atualizar essa TAG!')
                return;
            }

            const tag3_id = router.query.tag3_id
            const apiClient = setupAPIClient()
            await apiClient.put(`/tag3/update?tag3_id=${tag3_id}`, { tagName3 })

            toast.success('TAG atualizada com sucesso.')

            Router.push('/newsTags')
        } catch (err) {
            toast.error('Ops erro ao atualizar.')
        }
    }

    return (
        <>
            <Head>
                <title>Atualizar TAG do grupo 3 - Builder Seu Negócio Online</title>
            </Head>

            <main className={styles.container}>
                <section className={styles.containerContent}>
                    <h1>Atualize o nome da categoria</h1>
                    <form className={styles.form} onSubmit={handleRegister}>
                        <Input
                            type="text"
                            placeholder={'Digite nova TAG!'}
                            className={styles.input}
                            value={tagName3}
                            onChange={(e) => setTagName3(e.target.value)}
                        />
                        <Button
                            className={styles.buttonUpdate}
                            type="submit"
                        >
                            Atualizar
                        </Button>
                        <Link href={'/newsTags'}>
                            <Button
                                className={styles.buttonUpdate}
                            >
                                Cancelar
                            </Button>
                        </Link>
                    </form>
                </section>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    return {
        props: {}
    }
})
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


export default function Category() {

    const [categoryName, setCategoryName] = useState('')

    const router = useRouter()
    

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData()

            if (categoryName === '') {

                toast.error('Digite algum nome para sua categoria!')

                return;
            }

            const category_id = router.query.category_id

            const apiClient = setupAPIClient()

            await apiClient.put(`/category/update?category_id=${category_id}`, { categoryName })

            toast.success('Categoria atualizada com sucesso.')

            Router.push('/newCategory')

        } catch (err) {

            toast.error('Ops erro ao atualizar.')

        }
    }

    return (
        <>
            <Head>
                <title>Atualizar Categoria - Builder Seu Negócio Online</title>
            </Head>

            <main className={styles.container}>

                <section className={styles.containerContent}>

                    <h1>Atualize o nome da categoria</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <Input
                            type="text"
                            placeholder={'Digite novo nome de categoria!'}
                            className={styles.input}
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />

                        <Button
                            className={styles.buttonUpdate}
                            type="submit"
                        >
                            Atualizar
                        </Button>

                        <Link href={'/newCategory'}>
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
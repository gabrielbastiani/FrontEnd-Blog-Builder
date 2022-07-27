import { useState, FormEvent } from 'react'
import Head from "next/head"
import { HeaderPainel } from '../../components/HeaderPainel/index'
import styles from './styles.module.scss'
import Router from 'next/router'
import { useRouter } from '../../../node_modules/next/router'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'

import Link from 'next/link';
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { FooterPainel } from '../../components/FooterPainel/index'
import { toast } from 'react-toastify'
import { Button } from '../../components/ui/Button/index'
import { Input } from '../../components/ui/Input/index'


export default function Category() {

    const [name, setName] = useState('')

    const router = useRouter()

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData()
            const category_id = router.query.category_id

            const apiClient = setupAPIClient()

            await apiClient.put(`/category/update?category_id=${category_id}`, {name})

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

            <HeaderPainel />

            <main className={styles.container}>

                <Link href={'/newCategory'}>
                    <BsFillArrowLeftSquareFill className={styles.return} size={30} />
                </Link>

                <h1>Atualize o nome da categoria</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <Input
                        type="text"
                        placeholder={'Digite novo nome de categoria!'}
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Button
                        type="submit"
                    >
                        Atualizar
                    </Button>

                </form>
            </main>
            <FooterPainel />
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    return {
        props: {}
    }
})
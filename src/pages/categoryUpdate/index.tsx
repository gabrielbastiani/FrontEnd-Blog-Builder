import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import Head from "next/head"
import { HeaderPainel } from '../../components/HeaderPainel/index'
import styles from './styles.module.scss'
import Router from 'next/router'
import { useRouter } from '../../../node_modules/next/router'

import Link from 'next/link';
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { FooterPainel } from '../../components/FooterPainel/index'
import { toast } from 'react-toastify'
import { Button } from '../../components/ui/Button/index'

type CategoryName = {
    id: string
    name: string
}

interface CategoryProps {
    categoryList: CategoryName[]
}

export default function Category({ categoryList }: CategoryProps) {

    const [name, setName] = useState('')

    const [categories, setCategories] = useState(categoryList || [])

    const router = useRouter()

    /* useEffect(() => {
        async function updateCategory() {
            const apiClient = setupAPIClient()
            const data = new FormData()
            const category_id = router.query.category_id
            const responseCategory = await apiClient.get(`/category/all?category_id=${category_id}`)
            const { name } = responseCategory.data

            setName(name)

        }

        updateCategory()

    }, []) */

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData()
            const category_id = router.query.category_id

            /* data.append('product_id', category_id as string) */
            data.append('name', name)

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
                <h1>Atualize o nome da categoria</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder={`${name}`}
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
    const category = await apiClient.get('/category')

    return {
        props: {
            categoryList: category.data
        }
    }
})
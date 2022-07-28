import React, { useState } from 'react'
import styles from './style.module.scss';
import { useRouter } from 'next/router'
import { Button } from '../../components/ui/Button/index';
import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupAPIClient } from '../../services/api'
import Link from '../../../node_modules/next/link';


type CategoryItems = {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }
  
  interface CategoryProps {
    categorysList: CategoryItems[];
  }


export default function CategoryDelete({categorysList}: CategoryProps) {

    const [categorys, setCategorys] = useState(categorysList || [])

    const router = useRouter()

    async function handleDeleteCategory(id: string) {
        const apiClient = setupAPIClient();
        await apiClient.delete(`/category/remove`, {
            category_id: id,
        })

        const response = await apiClient.get(`/category`)

        setCategorys(response.data)

    }


    return (
        <>
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

    const categorys = await apliClient.get('/category/all');

    return {
        props: {
            categorysList: categorys.data
        }
    }
})
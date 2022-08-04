import { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react'
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
import { FiUpload } from 'react-icons/fi'
import { HeaderPainel } from '../../components/HeaderPainel/index'


type ItemProps = {
    id: string
    name: string
}

interface CategoryProps {
    categoryList: ItemProps[]
}

export default function ArticleUpdate({ categoryList }: CategoryProps) {

    const [title, setTitle] = useState('')
   
    const [description, setDescription] = useState('')

    const [bannerUrl, setBannerUrl] = useState('');
    const [imageBanner, setImageBanner] = useState(null);

    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    const router = useRouter()

   /*  useEffect(() => {
        async function updateArticle() {
            const apiClient = setupAPIClient()
            const data = new FormData()
            const item_id = router.query.item_id
            const responseProduct = await apiClient.get(`/article/exact?item_id=${item_id}`)
            const { name, price, description, banner, category_id } = responseProduct.data
            let categoryFilter = categories.filter(result => result.id.match(category_id));

            setTitle(title)
            setDescription(description)
            setCategories(categoryFilter)
            setBannerUrl(`http://localhost:3333/tmp/${banner}`)
        }

        updateArticle()
    }, []) */

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        }

        const image = e.target.files[0]
        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageBanner(image)
            setBannerUrl(URL.createObjectURL(image))
        }
    }

    function handleChangeCategory(e: any) {
        setCategorySelected(e.target.value)
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData()
            const article_id = router.query.article_id

            data.append('title', title)
            data.append('description', description)
            data.append('category_id', categories[categorySelected].id)
            data.append('file', imageBanner)

            const apiClient = setupAPIClient()

            await apiClient.put(`/article/update?article_id=${article_id}`, data)
            toast.success('Artigo atualizado com sucesso')
        } catch (err) {
            toast.error('Ops erro ao atualizar (verifique todos os campos, e atualize o Banner)')
        }
    }

    return (
        <>
            <Head>
                <title>Atualizar artigo - Builder Seu Negócio Online</title>
            </Head>
            <div>
                <HeaderPainel />
                <main className={styles.container}>
                    <h1>Atualizar Artigo</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <label className={styles.labelBanner}>
                            <span>
                                <FiUpload size={30} color="#8E8E8E" />
                            </span>

                            <input type='file' accept='image/png, image/jpeg' onChange={handleFile} />

                            {bannerUrl && (
                                <img
                                    className={styles.preview}
                                    src={bannerUrl}
                                    alt='Banner do artigo'
                                    width={250}
                                    height={250}
                                />
                            )}
                        </label>

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <Input
                            type='text'
                            placeholder={`${title}`}
                            className={styles.input}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                
                        <textarea
                            placeholder={`${description}`}
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <Button className={styles.buttonUpdate} type='submit'>
                            Atualizar
                        </Button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/category')

    return {
        props: {
            categoryList: response.data
        }
    }
})
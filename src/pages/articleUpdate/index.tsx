import { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react'
import Head from "next/head"
import styles from './styles.module.scss'
import Router from 'next/router'
import { useRouter } from '../../../node_modules/next/router'
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { toast } from 'react-toastify'
import { Button } from '../../components/ui/Button/index'
import { Input } from '../../components/ui/Input/index'
import { FiUpload } from 'react-icons/fi'
import { Editor } from '@tinymce/tinymce-react';
import { HeaderPainel } from '../../components/HeaderPainel/index'
import { FooterPainel } from '../../components/FooterPainel/index'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import Link from '../../../node_modules/next/link'

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

    const [text, setText] = useState('');

    const router = useRouter()
    

    useEffect(() => {
        async function updateArticle() {
            const apiClient = setupAPIClient()
            const data = new FormData()
            const article_id = router.query.article_id
            const responseArticle = await apiClient.get(`/article/exact?article_id=${article_id}`)
            const { title, description, banner } = responseArticle.data

            setTitle(title)
            setDescription(description)
            setBannerUrl(`http://localhost:3333/files/${banner}`)
        }

        updateArticle()
    }, [])

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

            data.append('file', imageBanner)
            data.append('title', title)
            data.append('category_id', categories[categorySelected].id)
            data.append('description', description)

            const apiClient = setupAPIClient()

            await apiClient.put(`/article/update?article_id=${article_id}`, data)

            toast.success('Artigo atualizado com sucesso')

            Router.push('/dashboard')

        } catch (err) {
            toast.error('Ops erro ao atualizar (é preciso inserir o Banner novamente)')
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

                    <br />

                    <div className={styles.returnBox}>
                        <Link href={'/dashboard'}>
                            <BsFillArrowLeftSquareFill className={styles.return} size={30} />
                        </Link>
                    </div>

                    <form className={styles.form} onSubmit={handleRegister}>

                            <br />

                            <h3>Atualize o banner do artigo</h3>

                            <br />

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

                            <h3>Atualize a categoria do artigo</h3>

                            <br />

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                            <h3>Atualize o titulo do artigo</h3>

                            <br />

                        <Input
                            type='text'
                            placeholder={title}
                            className={styles.input}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <Editor
                            apiKey='3uadxc7du623dpn0gcvz8d1520ngvsigncyxnuj5f580qyz4'
                            value={description}
                            onInit={(evt, editor) => {
                                setText(editor.getContent({ format: 'html' }));
                            }}
                            className={styles.input}
                            init={{
                                selector: "textarea.editor",
                                mode: 'textarea',
                                height: 900,
                                menubar: true,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: '.left { text-align: left; } ' +
                                    'img.left, audio.left, video.left { float: left; } ' +
                                    'table.left { margin-left: 0px; margin-right: auto; } ' +
                                    '.right { text-align: right; } ' +
                                    'img.right, audio.right, video.right { float: right; } ' +
                                    'table.right { margin-left: auto; margin-right: 0px; } ' +
                                    '.center { text-align: center; } ' +
                                    'img.center, audio.center, video.center { display: block; margin: 0 auto; } ' +
                                    'table.center { margin: 0 auto; } ' +
                                    '.full { text-align: justify; } ' +
                                    'img.full, audio.full, video.full { display: block; margin: 0 auto; } ' +
                                    'table.full { margin: 0 auto; } ' +
                                    '.bold { font-weight: bold; } ' +
                                    '.italic { font-style: italic; } ' +
                                    '.underline { text-decoration: underline; } ' +
                                    '.example1 {} ' +
                                    'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }' +
                                    '.tablerow1 { background-color: #D3D3D3; }',
                                formats: {
                                    alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video', classes: 'left' },
                                    aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video', classes: 'center' },
                                    alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video', classes: 'right' },
                                    alignfull: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video', classes: 'full' },
                                    bold: { inline: 'span', classes: 'bold' },
                                    italic: { inline: 'span', classes: 'italic' },
                                    underline: { inline: 'span', classes: 'underline', exact: true },
                                    strikethrough: { inline: 'del' },
                                    customformat: { inline: 'span', styles: { color: '#00ff00', fontSize: '20px' }, attributes: { title: 'My custom format' }, classes: 'example1' }
                                },
                                style_formats: [
                                    { title: 'Custom format', format: 'customformat' },
                                    { title: 'Align left', format: 'alignleft' },
                                    { title: 'Align center', format: 'aligncenter' },
                                    { title: 'Align right', format: 'alignright' },
                                    { title: 'Align full', format: 'alignfull' },
                                    { title: 'Bold text', inline: 'strong' },
                                    { title: 'Red text', inline: 'span', styles: { color: '#ff0000' } },
                                    { title: 'Red header', block: 'h1', styles: { color: '#ff0000' } },
                                    { title: 'Badge', inline: 'span', styles: { display: 'inline-block', border: '1px solid #2276d2', 'border-radius': '5px', padding: '2px 5px', margin: '0 2px', color: '#2276d2' } },
                                    { title: 'Table row 1', selector: 'tr', classes: 'tablerow1' },
                                    { title: 'Image formats' },
                                    { title: 'Image Left', selector: 'img', styles: { 'float': 'left', 'margin': '0 10px 0 10px' } },
                                    { title: 'Image Right', selector: 'img', styles: { 'float': 'right', 'margin': '0 0 10px 10px' } },
                                ]
                            }}
                            onEditorChange={(description, editor) => {
                                setDescription(description);
                                setText(editor.getContent({ format: 'html' }));
                            }}
                        />

                        <Button
                            className={styles.buttonUpdate}
                            type='submit'
                        >
                            Atualizar
                        </Button>
                    </form>
                </main>
                <FooterPainel />
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/category')

    return {
        props: {
            categoryList: response.data,
        }
    }
})
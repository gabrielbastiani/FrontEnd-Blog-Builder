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
import { FiUpload, FiEdit } from 'react-icons/fi'
import { Editor } from '@tinymce/tinymce-react';
import { HeaderPainel } from '../../components/HeaderPainel/index'
import { FooterPainel } from '../../components/FooterPainel/index'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import Link from '../../../node_modules/next/link'
import { api } from '../../services/apiClient';


type ItemProps = {
    id: string
    categoryName: string
    tagName1: string
    tagName2: string
    tagName3: string
    tagName4: string
    tagName5: string
}

interface CategoryAndTags {
    categoryList: ItemProps[]
    tags1List: ItemProps[]
    tags2List: ItemProps[]
    tags3List: ItemProps[]
    tags4List: ItemProps[]
    tags5List: ItemProps[]
}

export default function ArticleUpdate({ categoryList, tags1List, tags2List, tags3List, tags4List, tags5List }: CategoryAndTags) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [bannerUrl, setBannerUrl] = useState('');
    const [imageBanner, setImageBanner] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(categoryList || [])
    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    const [currentTag1, setCurrentTag1] = useState(tags1List || [])
    const [currentTag2, setCurrentTag2] = useState(tags2List || [])
    const [currentTag3, setCurrentTag3] = useState(tags3List || [])
    const [currentTag4, setCurrentTag4] = useState(tags4List || [])
    const [currentTag5, setCurrentTag5] = useState(tags5List || [])

    const [tag1, setTag1] = useState(tags1List || [])
    const [tag2, setTag2] = useState(tags2List || [])
    const [tag3, setTag3] = useState(tags3List || [])
    const [tag4, setTag4] = useState(tags4List || [])
    const [tag5, setTag5] = useState(tags5List || [])

    const [tag1Selected, setTag1Selected] = useState(0)
    const [tag2Selected, setTag2Selected] = useState(0)
    const [tag3Selected, setTag3Selected] = useState(0)
    const [tag4Selected, setTag4Selected] = useState(0)
    const [tag5Selected, setTag5Selected] = useState(0)

    const [text, setText] = useState('')

    const router = useRouter()


    useEffect(() => {
        async function updateArticleCurrent() {
            const apiClient = setupAPIClient()
            const data = new FormData()
            const article_id = router.query.article_id
            const responseArticle = await apiClient.get(`/article/exact?article_id=${article_id}`)
            const { categoryName, tagName1, tagName2, tagName3, tagName4, tagName5 } = responseArticle.data;

            let categoryFilterCurrent = categories.filter(result => result.categoryName.match(categoryName));

            let tag1FilterCurrent = tag1.filter(result => result.tagName1.match(tagName1));
            let tag2FilterCurrent = tag2.filter(result => result.tagName2.match(tagName2));
            let tag3FilterCurrent = tag3.filter(result => result.tagName3.match(tagName3));
            let tag4FilterCurrent = tag4.filter(result => result.tagName4.match(tagName4));
            let tag5FilterCurrent = tag5.filter(result => result.tagName5.match(tagName5));

            setCurrentCategory(categoryFilterCurrent);
            setCurrentTag1(tag1FilterCurrent);
            setCurrentTag2(tag2FilterCurrent);
            setCurrentTag3(tag3FilterCurrent);
            setCurrentTag4(tag4FilterCurrent);
            setCurrentTag5(tag5FilterCurrent);
        }

        updateArticleCurrent()
    }, [router.query.article_id])

    useEffect(() => {
        async function updateArticle() {
            const apiClient = setupAPIClient()
            const data = new FormData()
            const article_id = router.query.article_id
            const responseArticle = await apiClient.get(`/article/exact?article_id=${article_id}`)
            const { title, description, banner } = responseArticle.data;

            setTitle(title)
            setDescription(description)
            setBannerUrl(`http://localhost:3333/files/${banner}`)

        }

        updateArticle()
    }, [router.query.article_id])


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



    function handleChangeTag1(e: any) {
        setTag1Selected(e.target.value)
    }

    function handleChangeTag2(e: any) {
        setTag2Selected(e.target.value)
    }

    function handleChangeTag3(e: any) {
        setTag3Selected(e.target.value)
    }

    function handleChangeTag4(e: any) {
        setTag4Selected(e.target.value)
    }

    function handleChangeTag5(e: any) {
        setTag5Selected(e.target.value)
    }

    async function handleUpdateBanner(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData()
            const article_id = router.query.article_id
            const apiClient = setupAPIClient()

            data.append('file', imageBanner)
            await apiClient.put(`/article/banner/update?article_id=${article_id}`, data)

            toast.success('Banner atualizado com sucesso')

            Router.reload();

        } catch (err) {
            toast.error('Ops erro ao atualizar o banner')
        }
    }

    async function handleUpdateTitle(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData()
            const article_id = router.query.article_id;
            const apiClient = setupAPIClient()

            await apiClient.put(`/article/update/title?article_id=${article_id}`, { title })

            toast.success('Titulo do artigo atualizado com sucesso')

            Router.reload();

        } catch (err) {
            toast.error('Ops erro ao atualizar o titulo do artigo')
        }
    }

    async function handleUpdateCategory(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData();
            const article_id = router.query.article_id;
            let categoryName = categories[categorySelected].categoryName;
            const apiClient = setupAPIClient();

            await apiClient.put(`/article/update/category?article_id=${article_id}`, { categoryName });

            toast.success('Categoria do artigo atualizada com sucesso')

            Router.reload();

        } catch (err) {
            toast.error('Ops erro ao atualizar a categoria do artigo.')
        }
    }

    async function handleUpdateDescription(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData()
            const article_id = router.query.article_id;
            const apiClient = setupAPIClient()

            await apiClient.put(`/article/update/description?article_id=${article_id}`, { description })

            toast.success('Artigo atualizado com sucesso')

            Router.reload();

        } catch (err) {
            toast.error('Ops erro ao atualizar o artigo')
        }
    }

    async function handleUpdateTags(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData()
            const article_id = router.query.article_id
            let tagName1 = tag1[tag1Selected].tagName1;
            let tagName2 = tag2[tag2Selected].tagName2;
            let tagName3 = tag3[tag3Selected].tagName3;
            let tagName4 = tag4[tag4Selected].tagName4;
            let tagName5 = tag5[tag5Selected].tagName5;

            const apiClient = setupAPIClient()

            await apiClient.put(`/article/update/tags?article_id=${article_id}`, { tagName1, tagName2, tagName3, tagName4, tagName5 })

            toast.success('Tags dos artigo atualizada com sucesso')

            Router.reload();

        } catch (err) {
            toast.error('Ops erro ao atualizar Tags dos artigo')
        }
    }

    return (
        <>
            <Head>
                <title>Atualizar artigo - {title} - Builder Seu Negócio Online</title>
            </Head>

            <HeaderPainel />
            <main className={styles.container}>
                <h1>Atualizar Artigo</h1>

                <br />

                <div className={styles.returnBox}>
                    <Link href={'/dashboard'}>
                        <BsFillArrowLeftSquareFill className={styles.return} size={30} />
                    </Link>
                </div>

                <form className={styles.form} onSubmit={handleUpdateBanner}>

                    <br />

                    <h3>Atualize o banner do artigo</h3>

                    <br />

                    <label className={styles.labelBanner}>
                        <span>
                            <FiUpload size={30} color="#8E8E8E" />
                        </span>

                        <input type='file' accept='image/png, image/jpeg' onChange={handleFile} />

                        {bannerUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                className={styles.preview}
                                src={bannerUrl}
                                alt='Banner do artigo'
                                width={250}
                                height={250}
                            />
                        )}
                    </label>

                    <div className={styles.buttonBannerUpdate}>
                        <Button
                            type="submit"
                        >
                            Salvar novo Banner
                        </Button>
                    </div>

                </form>

                <h3>Atualize a categoria do artigo</h3>

                <br />

                <div className={styles.categoryBox}>
                    <div className={styles.category}>
                        <span>Categoria atual do artigo:</span>
                    </div>
                    <div className={styles.categoryBoxCurrent}>
                        <select className={styles.currentCategory} value={categorySelected}>
                            {currentCategory.map((item, index) => {
                                return (
                                    <option className={styles.current} key={item.id} value={index}>
                                        {item.categoryName}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>

                <form className={styles.form} onSubmit={handleUpdateCategory}>

                    <select value={categorySelected} onChange={handleChangeCategory}>
                        {categories.map((item, index) => {
                            return (
                                <option key={item.id} value={index}>
                                    {item.categoryName}
                                </option>
                            )
                        })}
                    </select>

                    <div className={styles.buttonBannerUpdate}>
                        <Button
                            type="submit"
                        >
                            Salvar nova categoria selecionada
                        </Button>
                    </div>

                </form>

                <Link href="/newCategory">
                    <div className={styles.categoryCadastre}>
                        <FiEdit color='var(--red)' size={20} />
                        <span>Cadastre aqui a categoria se não encontrar.</span>
                    </div>
                </Link>

                <form className={styles.form} onSubmit={handleUpdateTitle}>

                    <h3>Atualize o titulo do artigo</h3>

                    <br />

                    <Input
                        type='text'
                        placeholder={title}
                        className={styles.input}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <div className={styles.buttonBannerUpdate}>
                        <Button
                            type="submit"
                        >
                            Salvar Titulo
                        </Button>
                    </div>

                </form>

                <form className={styles.form} onSubmit={handleUpdateDescription}>

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

                    <div className={styles.buttonBannerUpdate}>
                        <Button
                            type="submit"
                        >
                            Salvar novo artigo
                        </Button>
                    </div>

                </form>

                <br />

                <h3 className={styles.titleTags}>Escolha 5 palavras chaves (TAGs) para seu artigo!</h3>

                <div className={styles.tagsBox}>

                    <div className={styles.tag}>
                        <div className={styles.category}>
                            <span>TAG 1 atual do artigo:</span>
                        </div>
                        <div className={styles.categoryBoxCurrent}>
                            <select className={styles.currentCategory} value={tag1Selected}>
                                {currentTag1.map((item, index) => {
                                    return (
                                        <option className={styles.current} key={item.id} value={index}>
                                            {item.tagName1}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <div className={styles.tag}>
                        <div className={styles.category}>
                            <span>TAG 2 atual do artigo:</span>
                        </div>
                        <div className={styles.categoryBoxCurrent}>
                            <select className={styles.currentCategory} value={tag2Selected}>
                                {currentTag2.map((item, index) => {
                                    return (
                                        <option className={styles.current} key={item.id} value={index}>
                                            {item.tagName2}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <div className={styles.tag}>
                        <div className={styles.category}>
                            <span>TAG 3 atual do artigo:</span>
                        </div>
                        <div className={styles.categoryBoxCurrent}>
                            <select className={styles.currentCategory} value={tag3Selected}>
                                {currentTag3.map((item, index) => {
                                    return (
                                        <option className={styles.current} key={item.id} value={index}>
                                            {item.tagName3}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <div className={styles.tag}>
                        <div className={styles.category}>
                            <span>TAG 4 atual do artigo:</span>
                        </div>
                        <div className={styles.categoryBoxCurrent}>
                            <select className={styles.currentCategory} value={tag4Selected}>
                                {currentTag4.map((item, index) => {
                                    return (
                                        <option className={styles.current} key={item.id} value={index}>
                                            {item.tagName4}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <div className={styles.tag}>
                        <div className={styles.category}>
                            <span>TAG 5 atual do artigo:</span>
                        </div>
                        <div className={styles.categoryBoxCurrent}>
                            <select className={styles.currentCategory} value={tag5Selected}>
                                {currentTag5.map((item, index) => {
                                    return (
                                        <option className={styles.current} key={item.id} value={index}>
                                            {item.tagName5}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                </div>

                <form className={styles.form} onSubmit={handleUpdateTags}>

                    <div className={styles.boxTags}>
                        <select value={tag1Selected} onChange={handleChangeTag1}>
                            {tag1.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.tagName1}
                                    </option>
                                )
                            })}
                        </select>
                        <select value={tag2Selected} onChange={handleChangeTag2}>
                            {tag2.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.tagName2}
                                    </option>
                                )
                            })}
                        </select>
                        <select value={tag3Selected} onChange={handleChangeTag3}>
                            {tag3.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.tagName3}
                                    </option>
                                )
                            })}
                        </select>
                        <select value={tag4Selected} onChange={handleChangeTag4}>
                            {tag4.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.tagName4}
                                    </option>
                                )
                            })}
                        </select>
                        <select value={tag5Selected} onChange={handleChangeTag5}>
                            {tag5.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.tagName5}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className={styles.buttonBannerUpdate}>
                        <Button
                            type="submit"
                        >
                            Salvar Tags
                        </Button>
                    </div>
                </form>

                <Link href="/newsTags">
                    <div className={styles.categoryCadastre}>
                        <FiEdit color='var(--red)' size={20} />
                        <span>Cadastre aqui um novo grupo de 5 TAGs.</span>
                    </div>
                </Link>

                <br />

            </main>
            <FooterPainel />
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/category');
    const responseTag1 = await apiClient.get('/tag1');
    const responseTag2 = await apiClient.get('/tag2');
    const responseTag3 = await apiClient.get('/tag3');
    const responseTag4 = await apiClient.get('/tag4');
    const responseTag5 = await apiClient.get('/tag5');

    console.log(responseTag1)

    return {
        props: {
            categoryList: response.data,
            tags1List: responseTag1.data,
            tags2List: responseTag2.data,
            tags3List: responseTag3.data,
            tags4List: responseTag4.data,
            tags5List: responseTag5.data,
        }
    }
})
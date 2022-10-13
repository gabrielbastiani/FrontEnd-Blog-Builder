import React, { useState, ChangeEvent, FormEvent, useContext, useEffect, useCallback } from 'react'
import Head from "next/head"
import { HeaderPainel } from '../../components/HeaderPainel/index'
import styles from './styles.module.scss'
import { FiUpload, FiEdit } from 'react-icons/fi'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { FooterPainel } from '../../components/FooterPainel/index'
import { toast } from 'react-toastify'
import { Editor } from '@tinymce/tinymce-react';
import Link from '../../../node_modules/next/link'
import Router from 'next/router'
import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../services/apiClient';



type ItemProps = {
   id: string;
   categoryName: string;
}

interface CategoryProps {
   categoryList: ItemProps[];
}

export default function Article({ categoryList }: CategoryProps) {

   const { user } = useContext(AuthContext)

   const [name, setName] = useState('');
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('Digite aqui seu artigo...');

   const [bannerUrl, setBannerUrl] = useState('');
   const [imageBanner, setImageBanner] = useState(null);

   const [categories, setCategories] = useState(categoryList || [])
   const [categorySelected, setCategorySelected] = useState(0)

   const [tags1, setTags1] = useState([])
   const [tagSelected1, setTagSelected1] = useState(0)
   const [tags2, setTags2] = useState([])
   const [tagSelected2, setTagSelected2] = useState(0)
   const [tags3, setTags3] = useState([])
   const [tagSelected3, setTagSelected3] = useState(0)
   const [tags4, setTags4] = useState([])
   const [tagSelected4, setTagSelected4] = useState(0)
   const [tags5, setTags5] = useState([])
   const [tagSelected5, setTagSelected5] = useState(0)


   const [text, setText] = useState('');

   useEffect(() => {
      const loadTags = async () => {
         try {
            const responseTag1 = await api.get('/tag1');
            const responseTag2 = await api.get('/tag2');
            const responseTag3 = await api.get('/tag3');
            const responseTag4 = await api.get('/tag4');
            const responseTag5 = await api.get('/tag5');

            const tagsList1 = await responseTag1.data;
            const tagsList2 = await responseTag2.data;
            const tagsList3 = await responseTag3.data;
            const tagsList4 = await responseTag4.data;
            const tagsList5 = await responseTag5.data;

            setTags1(tagsList1)
            setTags2(tagsList2)
            setTags3(tagsList3)
            setTags4(tagsList4)
            setTags5(tagsList5)

         } catch (error) {
            console.log('Error call api list tags');
         }
      }

      loadTags();
   }, [])


   function handleFile(e: ChangeEvent<HTMLInputElement>) {

      if (!e.target.files) {
         return;
      }

      const image = e.target.files[0];

      if (!image) {
         return;
      }

      if (image.type === 'image/jpeg' || image.type === 'image/png') {

         setImageBanner(image);
         setBannerUrl(URL.createObjectURL(e.target.files[0]))

      }

   }

   function handleChangeCategory(event) {
      setCategorySelected(event.target.value)
   }



   function handleChangeTags1(event) {
      setTagSelected1(event.target.value)
   }

   function handleChangeTags2(event) {
      setTagSelected2(event.target.value)
   }

   function handleChangeTags3(event) {
      setTagSelected3(event.target.value)
   }

   function handleChangeTags4(event) {
      setTagSelected4(event.target.value)
   }

   function handleChangeTags5(event) {
      setTagSelected5(event.target.value)
   }

   async function handleRegister(event: FormEvent) {
      event.preventDefault();

      try {
         const data = new FormData();

         if (title === '' || description === '' || imageBanner === null) {
            toast.error("Preencha todos os campos!");
            return;
         }

         data.append('name', user.name);
         data.append('title', title);
         data.append('description', description);
         data.append('categoryName', categories[categorySelected].categoryName);
         data.append('file', imageBanner);

         data.append('tagName1', tags1[tagSelected1].tagName1);
         data.append('tagName2', tags2[tagSelected2].tagName2);
         data.append('tagName3', tags3[tagSelected3].tagName3);
         data.append('tagName4', tags4[tagSelected4].tagName4);
         data.append('tagName5', tags5[tagSelected5].tagName5);

         const apiClient = setupAPIClient();

         await apiClient.post('/article', data);

         toast.success('Cadastrado com sucesso!')

         setName('');
         setTitle('');
         setDescription('');
         setImageBanner(null);
         setBannerUrl('');

         Router.push('/dashboard')

      } catch (err) {
         console.log(err);
         toast.error("Ops erro ao cadastrar!")
      }

   }




   return (
      <>
         <Head>
            <title>Novo artigo - Builder Seu Negócio Online</title>
         </Head>
         <div>
            <HeaderPainel />

            <main className={styles.container}>


               <Link href={'/dashboard'}>
                  <BsFillArrowLeftSquareFill className={styles.return} size={30} />
               </Link>

               <h1>Novo artigo</h1>

               <form className={styles.form} onSubmit={handleRegister}>

                  <input
                     type="hidden"
                     className={styles.input}
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />

                  <br />

                  <h3>Insira o banner do artigo</h3>
                  <span>(dimensão recomendada 1120 x 528)</span>

                  <br />

                  <label className={styles.labelBanner}>
                     <span>
                        <FiUpload size={30} color="#FFF" />
                     </span>

                     <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

                     {bannerUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                           className={styles.preview}
                           src={bannerUrl}
                           alt="Foto do artigo"
                           width={250}
                           height={250}
                        />
                     )}

                  </label>

                  <h3>Escolha a categoria do artigo</h3>

                  <br />

                  <select value={categorySelected} onChange={handleChangeCategory} >
                     {categories.map((item, index) => {
                        return (
                           <option key={item.id} value={index}>
                              {item?.categoryName}
                           </option>
                        )
                     })}
                  </select>


                  <Link href="/newCategory">
                     <div className={styles.categoryCadastre}>
                        <FiEdit color='var(--red)' size={20} />
                        <span>Cadastre aqui a categoria se não encontrar.</span>
                     </div>
                  </Link>

                  <h3>De um titulo ao artigo</h3>

                  <br />

                  <input
                     type="text"
                     placeholder="Digite o titulo do artigo"
                     className={styles.input}
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />

                  <Editor
                     apiKey='3uadxc7du623dpn0gcvz8d1520ngvsigncyxnuj5f580qyz4'
                     value={description}
                     onInit={(evt, editor) => {
                        setText(editor.getContent({ format: 'text' }));
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
                        setText(editor.getContent({ format: 'text' }));
                     }}
                  />

                  <br />

                  <h3 className={styles.titleTags}>Escolha 5 palavras chaves (TAGs) para seu artigo!</h3>

                  <div className={styles.boxTags}>

                     <select value={tagSelected1} onChange={handleChangeTags1} >
                        {tags1.map((item, index) => {
                           return (
                              <option key={item.id} value={index}>
                                 {item?.tagName1}
                              </option>
                           )
                        })}
                     </select>

                     <select value={tagSelected2} onChange={handleChangeTags2} >
                        {tags2.map((item, index) => {
                           return (
                              <option key={item.id} value={index}>
                                 {item?.tagName2}
                              </option>
                           )
                        })}
                     </select>

                     <select value={tagSelected3} onChange={handleChangeTags3} >
                        {tags3.map((item, index) => {
                           return (
                              <option key={item.id} value={index}>
                                 {item?.tagName3}
                              </option>
                           )
                        })}
                     </select>

                     <select value={tagSelected4} onChange={handleChangeTags4} >
                        {tags4.map((item, index) => {
                           return (
                              <option key={item.id} value={index}>
                                 {item?.tagName4}
                              </option>
                           )
                        })}
                     </select>

                     <select value={tagSelected5} onChange={handleChangeTags5} >
                        {tags5.map((item, index) => {
                           return (
                              <option key={item.id} value={index}>
                                 {item?.tagName5}
                              </option>
                           )
                        })}
                     </select>

                  </div>

                  <Link href="/newsTags">
                     <div className={styles.categoryCadastre}>
                        <FiEdit color='var(--red)' size={20} />
                        <span>Cadastre aqui novas Tags se não encontrar.</span>
                     </div>
                  </Link>

                  <br />

                  <button
                     className={styles.buttonAdd}
                     type="submit"
                  >
                     Cadastrar Artigo
                  </button>
               </form>
            </main>
            <FooterPainel />
         </div>
      </>
   )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
   const apliClient = setupAPIClient(ctx)

   const response = await apliClient.get('/category');

   return {
      props: {
         categoryList: response.data
      }
   }
})
import React, { useState, ChangeEvent, FormEvent, useRef } from 'react'
import Head from "next/head"
import { HeaderPainel } from '../../components/HeaderPainel/index'
import styles from './styles.module.scss'
import { FiUpload } from 'react-icons/fi'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { FooterPainel } from '../../components/FooterPainel/index'
import { toast } from 'react-toastify'
import { Editor } from '@tinymce/tinymce-react';
import Link from '../../../node_modules/next/link'


type ItemProps = {
   id: string;
   name: string;
}

type ArticleProps = {
   id: string;
   title: string;
   description: string;
   banner: string;
}

interface CategoryProps {
   categoryList: ItemProps[];
   articleList: ArticleProps[];
}


export default function Article({ categoryList, articleList }: CategoryProps) {

   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('Digite aqui seu artigo...');

   const [bannerUrl, setBannerUrl] = useState('');
   const [imageBanner, setImageBanner] = useState(null);

   const [categories, setCategories] = useState(categoryList || [])
   const [categorySelected, setCategorySelected] = useState(0)

   const [article, setArticles] = useState(articleList || [])

   const [text, setText] = useState('');

   const editorRef = useRef(null);
   
   const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
   }

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

   //Quando você seleciona uma nova categoria na lista
   function handleChangeCategory(event) {
      // console.log("POSICAO DA CATEGORIA SELECIONADA ", event.target.value)
      //console.log('Categoria selecionada ', categories[event.target.value])

      setCategorySelected(event.target.value)

   }

   async function handleRegister(event: FormEvent) {
      event.preventDefault();

      try {
         const data = new FormData();

         if (title === '' || description === '' || imageBanner === null) {
            toast.error("Preencha todos os campos!");
            return;
         }

         data.append('title', title);
         data.append('description', description);
         data.append('category_id', categories[categorySelected].id);
         data.append('file', imageBanner);


         const apiClient = setupAPIClient();

         await apiClient.post('/article', data);

         toast.success('Cadastrado com sucesso!')

      } catch (err) {
         console.log(err);
         toast.error("Ops erro ao cadastrar!")
      }

      setTitle('');
      setDescription('')
      setImageBanner(null);
      setBannerUrl('');

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

                     <br />

                     <h3>Insira o banner do artigo</h3>

                     <br />

                  <label className={styles.labelBanner}>
                     <span>
                        <FiUpload size={30} color="#FFF" />
                     </span>

                     <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

                     {bannerUrl && (
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
                              {item.name}
                           </option>
                        )
                     })}
                  </select>

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
                     tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                     apiKey='3uadxc7du623dpn0gcvz8d1520ngvsigncyxnuj5f580qyz4'
                     value={description}
                     onInit={(evt, editor) => {
                        setText(editor.getContent({format: 'text'}));
                      }}
                     className={styles.input}
                     init={{
                        selector : "textarea.editor",
                        mode: 'textarea',
                        height: 900,
                        menubar: true,
                           plugins: [
                           'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                           'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                           'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                        ],
                           toolbar1: 'undo redo | blocks | ' +
                           'bold italic forecolor | alignleft aligncenter ' +
                           'alignright alignjustify | bullist numlist outdent indent | ' +
                           'removeformat | help',
                           toolbar2: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                           toolbar3: "print preview media | forecolor backcolor emoticons",
                           image_advtab: true,
                           templates: [
                              {title: 'Test template 1', content: 'Test 1'},
                              {title: 'Test template 2', content: 'Test 2'}
                          ],
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
                           customformat: { inline: 'span', styles: { color: '#00ff00', fontSize: '20px' }, attributes: { title: 'My custom format'} , classes: 'example1'}
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
                        setText(editor.getContent({format: 'text'}));
                      }}
                  />

                  <button onClick={log}>Log editor content</button>

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
   const responseArticle = await apliClient.get('/category/article');
   /* console.log(responseArticle.data); */

   return {
      props: {
         categoryList: response.data,
         articleList: responseArticle.data,
      }
   }
})
import React, { useState, ChangeEvent, FormEvent, useRef } from 'react'
import Head from "next/head"
import { HeaderPainel } from '../../components/HeaderPainel/index'
import styles from './styles.module.scss'
import { FiUpload } from 'react-icons/fi'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import Router from 'next/router'
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { FooterPainel } from '../../components/FooterPainel/index'
import { toast } from 'react-toastify'

import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
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
   const [description, setDescription] = useState('');

   const [bannerUrl, setBannerUrl] = useState('');
   const [imageBanner, setImageBanner] = useState(null);

   const [categories, setCategories] = useState(categoryList || [])
   const [categorySelected, setCategorySelected] = useState(0)

   const [article, setArticles] = useState(articleList || [])

   const editorRef = useRef<TinyMCEEditor | null>(null);

 /*   const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    }; */


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

                  <select value={categorySelected} onChange={handleChangeCategory} >
                     {categories.map((item, index) => {
                        return (
                           <option key={item.id} value={index}>
                              {item.name}
                           </option>
                        )
                     })}
                  </select>

                  <input
                     type="text"
                     placeholder="Digite o titulo do artigo"
                     className={styles.input}
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />

                  <textarea
                     id='article'
                     placeholder="Escreva seu artigo aqui..."
                     className={styles.input}
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  />


                  {/* <Editor
                     apiKey='3uadxc7du623dpn0gcvz8d1520ngvsigncyxnuj5f580qyz4'
                     id='article'
                     onInit={(evt, editor) => editorRef.current = editor}
                     initialValue='<p>This is the initial content of the editor.</p>'
                     className={styles.input}
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     init={{
                       height: 500,
                       menubar: false,
                       plugins: [
                         'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                         'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                         'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                       ],
                       toolbar: 'undo redo | blocks | ' +
                         'bold italic forecolor | alignleft aligncenter ' +
                         'alignright alignjustify | bullist numlist outdent indent | ' +
                         'removeformat | help',
                       content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                     }}
                  /> */}


                  <button
                     className={styles.buttonAdd}
                     type="submit"
                  >
                     Cadastrar
                  </button>

               </form>

               

               <section className={styles.categorysSectionMain}>
                  <div className={styles.categorysSection}>
                     {article.map((item) => {
                        return (
                           <>
                              <div key={item.id} className={styles.categoryBox}>
                                 <span>{item.title}</span>
                                 <span>{item.description}</span>
                              </div>
                           </>
                        )
                     })}
                  </div>
               </section>

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
   console.log(responseArticle.data);

   return {
      props: {
         categoryList: response.data,
         articleList: responseArticle.data,
      }
   }
})
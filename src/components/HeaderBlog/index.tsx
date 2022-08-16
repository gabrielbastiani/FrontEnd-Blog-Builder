import { useState, useEffect } from 'react'
import { api } from '../../services/apiClient';
import styles from './styles.module.scss'
import Link from 'next/link'


export function HeaderBlog() {

   const [categorys, setCategorys] = useState([]);
   

   useEffect(() => {
      async function loadCategorys() {
         const response = await api.get('/category');

         setCategorys(response.data)
      }

      

      loadCategorys();
   }, [])

   return (
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <Link href="/">
               <img src="LogoBuilderWhite.png" width={170} height={50} />
            </Link>
            <nav className={styles.menuNav}>
               <ul>
                  <li><Link href="/"><a>Inicio</a></Link></li>
                  <li><a>Categorias</a>
                  {categorys.length !== 0 && (
                     <ul>
                     {categorys.map((category) => {
                        return (
                           <>
                              <Link href={`/categoryArticles?category_id=${category.id}`}>
                                 <li><a>{category?.name}</a></li>
                              </Link>
                           </>
                        )
                     })}
                  </ul>
                  )}
                  </li>
                  <li><Link href="https://builderseunegocioonline.com.br" target="_blank"><a>Nossos Serviços</a></Link></li>
                  <li><Link href="/sobre"><a>Sobre</a></Link></li>
               </ul>
            </nav>
         </div>
      </header>
   )
}
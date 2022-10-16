import { useState, useEffect } from 'react'
import { api } from '../../services/apiClient';
import styles from './styles.module.scss'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import Image from '../../../node_modules/next/image';


export function HeaderBlog() {

   const [categorys, setCategorys] = useState([]);

   const [showMenu, setShowMenu] = useState(false);


   useEffect(() => {
      async function loadCategorys() {
         const response = await api.get('/category');

         setCategorys(response.data)
      }

      loadCategorys();
   }, [])

   const showOrHide = () => {
      setShowMenu(!showMenu)
   }


   return (
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <Link href="/">
               <Image src="/LogoBuilderWhite.png" width={170} height={50} alt="logomarca" />
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
                                    <Link href={`/categoryPage?categoryName=${category.categoryName}`}>
                                       <li><a>{category?.categoryName}</a></li>
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


            <GiHamburgerMenu className={styles.iconMobile} color='var(--white)' size={35} onClick={showOrHide} />


            {showMenu ? <nav className={styles.menuNavMobile}>
               <ul>
                  <li><Link href="/"><a>Inicio</a></Link></li>
                  <li><a>Categorias</a>
                     {categorys.length !== 0 && (
                        <ul>
                           {categorys.map((category) => {
                              return (
                                 <>
                                    <Link href={`/categoryPage?categoryName=${category.categoryName}`}>
                                       <li><a>{category?.categoryName}</a></li>
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
            </nav> : null}
         </div>
      </header>
   )
}
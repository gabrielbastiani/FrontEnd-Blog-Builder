import { useContext, useState } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'

import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'

export function HeaderPainel() {

   const { user } = useContext(AuthContext)

   const { signOut } = useContext(AuthContext)

   const [showMenu, setShowMenu] = useState(false);


   const showOrHide = () => {
      setShowMenu(!showMenu)
   }


   return (
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <Link href="/">
               <img src="LogoBuilderWhite.png" width={170} height={50} />
            </Link>

            <div className={styles.dataUser}>
               <Link href="/detailUser">
                  <span>{user?.name}</span>
               </Link>

               <div className={styles.userImg}>
                  <Link href="/detailUser">
                     <img src={"http://localhost:3333/files/" + user?.photo} alt="foto usuario" />
                  </Link>
               </div>
               
            </div>

            <nav className={styles.menuNav}>
               <Link href="/dashboard">
                  <a>Painel</a>
               </Link>

               <Link href="/newCategory">
                  <a>Categorias</a>
               </Link>

               <Link href="/newsTags">
                  <a>Tags</a>
               </Link>

               <Link href="/newArticle">
                  <a>Artigo</a>
               </Link>

               <Link href="/comments">
                  <a>Comentarios</a>
               </Link>

               <button onClick={signOut}>
                  <FiLogOut color="#FFF" size={24} />
               </button>

            </nav>

            <button className={styles.buttonSignOutMobile} onClick={signOut}>
               <FiLogOut color="#FFF" size={24} />
            </button>

            <div className={styles.iconMobile}>
               <GiHamburgerMenu color='var(--white)' size={35} onClick={showOrHide} />
            </div>

            {showMenu ? <div className={styles.menuNavMobile}>
               <nav>
                  <Link href="/dashboard">
                     <a>Painel</a>
                  </Link>

                  <Link href="/newCategory">
                     <a>Categorias</a>
                  </Link>

                  <Link href="/newsTags">
                     <a>Tags</a>
                  </Link>

                  <Link href="/newArticle">
                     <a>Artigo</a>
                  </Link>

                  <Link href="/comments">
                     <a>Comentarios</a>
                  </Link>
               </nav>

            </div> : null}

         </div>
      </header>
   )
}
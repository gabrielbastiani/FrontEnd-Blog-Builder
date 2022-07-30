import { useContext } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

import {FiLogOut} from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'

export function HeaderPainel(){

   const {user} = useContext(AuthContext)

   const {signOut} = useContext(AuthContext)

   return(
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <Link href="/">
               <img src="LogoBuilderWhite.png" width={170} height={50} />
            </Link>

            <Link href="/detailUser">
               <span>{user?.name}</span>
            </Link>

            <Link href="/detailUser">
               <img className={styles.userImg} src={"http://localhost:3333/files/" + user?.photo} alt="foto usuario" />
            </Link>

            <nav className={styles.menuNav}>
               <Link href="/dashboard">
                  <a>Painel</a>
               </Link>

               <Link href="/newCategory">
                  <a>Categorias</a>
               </Link>

               <Link href="/newArticle">
                  <a>Artigos</a>
               </Link>

               <button onClick={signOut}>
                  <FiLogOut color="#FFF" size={24} />
               </button>
            </nav>
         </div>
      </header>
   )
}
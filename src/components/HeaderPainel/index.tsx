import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../services/apiClient'
import Image from '../../../node_modules/next/image'


export function HeaderPainel() {

   const { user } = useContext(AuthContext)
   const { signOut } = useContext(AuthContext)
   const [showMenu, setShowMenu] = useState(false);


   const showOrHide = () => {
      setShowMenu(!showMenu)
   }

   const [currentAdmin, setCurrentAdmin] = useState('');
   const roleADMIN = "ADMIN";


   useEffect(() => {
      async function loadUser(){
         const response = await api.get('/me');
         setCurrentAdmin(response.data.role);
      }
      loadUser()
   }, [])


   return (
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <Link href="/">
               <Image className={styles.imgLogo} src="/LogoBuilderWhite.png" width={170} height={50} alt="logomarca" />
            </Link>

            <div className={styles.dataUser}>
               <Link href="/detailUser">
                  <span>{user?.name}</span>
               </Link>

               <div className={styles.userImg}>
                  <Link href="/detailUser">
                     <Image className={styles.img} src={"https://apiblog.builderseunegocioonline.com.br/files/" + user?.photo} width={40} height={50} alt="foto usuario" />
                  </Link>
               </div>
               
            </div>

            {currentAdmin != roleADMIN && (
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

               <button onClick={signOut}>
                  <FiLogOut color="#FFF" size={24} />
               </button>

            </nav>
            )}

            {currentAdmin === roleADMIN && (
            <nav className={styles.menuNav}>
               <Link href="/dashboard">
                  <a>Painel</a>
               </Link>

               <Link href="/usersAll">
                  <a>Usúarios</a>
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

               <Link href={'https://disqus.com/admin/moderate/pending'}>
                  <a>Comentarios</a>
               </Link>

               <Link href="/contacts">
                  <a>Contatos</a>
               </Link>

               <Link href="/newslatters">
                  <a>Lista de E-mails</a>
               </Link>

               <button onClick={signOut}>
                  <FiLogOut color="#FFF" size={24} />
               </button>

            </nav>
            )}

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

                  <Link href="/usersAll">
                  <a>Usúarios</a>
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

                  <Link href="/contacts">
                     <a>Contatos</a>
                  </Link>

                  <Link href="/newslatters">
                     <a>Lista de E-mails</a>
                  </Link>
               </nav>

            </div> : null}

         </div>
      </header>
   )
}
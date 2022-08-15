import styles from './styles.module.scss'
import Link from 'next/link'

export function HeaderBlog(){


   return(
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <Link href="/">
               <img src="LogoBuilderWhite.png" width={170} height={50} />
            </Link>
            
            <nav className={styles.menuNav}>
               <Link href="/">
                  <a>Inicio</a>
               </Link>

               <a>Categorias</a>

               <Link href="https://builderseunegocioonline.com.br" target="_blank">
                  <a>Nossos Serviços</a>
               </Link>

               <Link href="/sobre">
                  <a>Sobre</a>
               </Link>
            </nav>
         </div>
      </header>
   )
}
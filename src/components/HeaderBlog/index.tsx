import styles from './styles.module.scss'
import Link from 'next/link'

export function HeaderBlog() {


   return (
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <Link href="/">
               <img src="LogoBuilderWhite.png" width={170} height={50} />
            </Link>

            <nav className={styles.menuNav}>
               <ul>
                  <li><Link href="/"><a>Inicio</a></Link></li>
                  <li><a>Categorias</a></li>
                     <ul className={styles.submenu}>
                        <li><a>hghghghghg</a></li>
                        <li><a>hghghghghg</a></li>
                        <li><a>hghghghghg</a></li>
                        <li><a>hghghghghg</a></li>
                        <li><a>hghghghghg</a></li>
                        <li><a>hghghghghg</a></li>
                        <li><a>hghghghghg</a></li>
                     </ul>
                  <li><Link href="https://builderseunegocioonline.com.br" target="_blank"><a>Nossos Serviços</a></Link></li>
                  <li><Link href="/sobre"><a>Sobre</a></Link></li>
               </ul>
            </nav>
         </div>
      </header>
   )
}
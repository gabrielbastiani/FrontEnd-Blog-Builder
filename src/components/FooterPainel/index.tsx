import styles from './styles.module.scss'
import Link from 'next/link'

export function FooterPainel(){

   const anoAtual = new Date().getFullYear();

   return(
      <footer className={styles.footerContainer}>
         <div className={styles.footerContent}>
            <Link href="/">
               <img src="LogoBuilderWhite.png" width={170} height={50} />
            </Link>

            <div className={styles.textFooter}>
               <h4>Copyright {anoAtual} © Todos os direitos reservados. Desenvolvido por Gabriel Campos de Bastiani.</h4>
            </div>
         
         </div>
      </footer>
   )
}
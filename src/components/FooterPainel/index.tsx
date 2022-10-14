import styles from './styles.module.scss'
import Link from 'next/link'
import Image from '../../../node_modules/next/image';

export function FooterPainel() {

   const anoAtual = new Date().getFullYear();

   return (
      <footer className={styles.footerContainer}>
         <div className={styles.contentFooter}>

            <Link href="/">
               <Image className={styles.logo} src="/LogoBuilderWhite.png" width={170} height={50} alt="logomarca" />
            </Link>
         
            <h5>Copyright {anoAtual} © Todos os direitos reservados. Desenvolvido por Gabriel Campos de Bastiani.</h5>

         </div>
      </footer>
   )
}
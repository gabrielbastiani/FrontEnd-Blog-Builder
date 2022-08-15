import styles from './styles.module.scss'
import Link from 'next/link'
import { AiFillPhone } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr'
import { FaMapMarker } from 'react-icons/fa'

export function FooterBlog() {

   const anoAtual = new Date().getFullYear();

   return (
      <footer className={styles.footerContainer}>
         <section className={styles.sectionContentFooter}>
            <div className={styles.contentFooter}>
               <h3>Sobre</h3>
               <hr />
               <br />
               <br />
               <Link href="/">
                  <img src="LogoBuilderWhite.png" width={170} height={50} />
               </Link>
               <br />
               <br />
               <p>Insira aqui informações úteis sobre a seu negócio, como uma breve descrição do que você faz e meios de contato.</p>
               <br />
               <br />
               <div className={styles.contactsFooter}>
                  <p><AiFillPhone color='var(--orange)' size={25} /> (54) 99686-0104</p>
                  <p><GrMail color='var(--orange)' size={25} /> contato@builderseunegocioonline.com.br</p>
                  <p><FaMapMarker color='var(--orange)' size={25} /> Rua José Soares de Oliveira 2417 Caxias do Sul-RS CEP: 95034-100</p>
               </div>
            </div>
            <div className={styles.contentFooter}>
               <h3>Postagens Recentes</h3>
               <hr />
            </div>
            <div className={styles.contentFooter}>
               <h3>Menu</h3>
               <hr />
            </div>
            <div className={styles.contentFooter}>
               <h3>Redes Sociais</h3>
               <hr />
            </div>
         </section>

         <div className={styles.copyrightFooter}>
            <h5>Copyright {anoAtual} © Todos os direitos reservados. Desenvolvido por Gabriel Campos de Bastiani.</h5>
         </div>

      </footer>
   )
}
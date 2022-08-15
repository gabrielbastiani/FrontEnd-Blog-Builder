import styles from './styles.module.scss'
import Link from 'next/link'
import { AiFillPhone } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr'
import { FaMapMarker, FaGithubSquare } from 'react-icons/fa'
import { AiFillInstagram, AiFillLinkedin, AiFillFacebook } from 'react-icons/ai'

export function FooterBlog() {

   const anoAtual = new Date().getFullYear();

   return (
      <footer className={styles.footerContainer}>
         <section className={styles.sectionContentFooter}>
            <div className={styles.contentFooter}>
               <h2>Sobre</h2>
               <hr />
               <br />
               <br />
               <Link href="/">
                  <img src="LogoBuilderWhite.png" width={190} height={70} />
               </Link>
               <br />
               <br />
               <p>Desenvolvemos ferramentas e soluções online para o seu negócio.</p>
               <br />
               <br />
               <br />
               <div className={styles.contactsFooter}>
                  <div className={styles.containerContacts}>
                  <span><AiFillPhone color='var(--orange)' size={38} /></span>
                  <p> (54) 99686-0104</p>
                  </div>
                  <div className={styles.containerContacts}>
                  <span><GrMail color='var(--orange)' size={38} /></span>
                  <p> contato@builderseunegocioonline.com.br</p>
                  </div>
                  <div className={styles.containerContacts}>
                  <span><FaMapMarker color='var(--orange)' size={38} /></span>
                  <p>Rua José Soares de Oliveira 2417 Caxias do Sul-RS CEP: 95034-100</p>
                  </div>
               </div>
            </div>
            <div className={styles.contentFooter}>
               <h2>Postagens Recentes</h2>
               <hr />

            </div>
            <div className={styles.contentFooter}>
               <h2>Menu</h2>
               <hr />
               <br />
               <br />
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
            </div>
            <div className={styles.contentFooter}>
               <h2>Redes Sociais</h2>
               <hr />
               <br/>
               <br/>
               <Link href="https://www.facebook.com/builderseunegocioonline" target="_blank">
                  <AiFillFacebook color='var(--orange)' size={45}/>
               </Link>
               <Link href="https://www.instagram.com/builderseunegocioonline" target="_blank">
                  <AiFillInstagram color='var(--orange)' size={45}/>
               </Link>
               <Link href="https://www.linkedin.com/in/gabriel-campos-de-bastiani" target="_blank">
                  <AiFillLinkedin color='var(--orange)' size={45}/>
               </Link>
               <Link href="https://github.com/gabrielbastiani" target="_blank">
                  <FaGithubSquare color='var(--orange)' size={45}/>
               </Link>
            </div>
         </section>

         <div className={styles.copyrightFooter}>
            <h5>Copyright {anoAtual} © Todos os direitos reservados. Desenvolvido por Gabriel Campos de Bastiani.</h5>
         </div>

      </footer>
   )
}
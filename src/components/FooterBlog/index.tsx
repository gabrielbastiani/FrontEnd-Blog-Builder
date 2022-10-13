import { useState, useEffect } from 'react';
import { api } from '../../services/apiClient';
import styles from './styles.module.scss'
import Link from 'next/link'
import { AiFillPhone } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr'
import { FaMapMarker, FaGithubSquare } from 'react-icons/fa'
import { AiFillInstagram, AiFillLinkedin, AiFillFacebook } from 'react-icons/ai'
import moment from 'moment';
import { ContactForm } from '../ContactForm/index';
import Image from '../../../node_modules/next/image';

export function FooterBlog() {

   const [articles, setArticles] = useState([]);
   const [total, setTotal] = useState(0);
   const [limit, setLimit] = useState(4);
   const [currentPage, setCurrentPage] = useState(1);

   const [categorys, setCategorys] = useState([]);

   useEffect(() => {
      async function loadArticles() {
         try {
            const { data } = await api.get(`/article/published/blog?page=${currentPage}&limit=${limit}`);
            setTotal(data?.total);
            const totalPages = Math.ceil(total / limit);

            const arrayPages = [];
            for (let i = 1; i <= totalPages; i++) {
               arrayPages.push(i);

               setArticles(data?.articles || []);
            }
         } catch (error) {
            console.error(error);
            alert('Error call api list article');
         }
      }

      loadArticles();
   }, [currentPage, limit, total]);


   useEffect(() => {
      async function loadCategorys() {
         const response = await api.get('/category');

         setCategorys(response.data)
      }

      loadCategorys();
   }, [])

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
                  <Image src="/LogoBuilderWhite.png" width={190} height={70} alt="logomarca" />
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
                     <Link href="https://api.whatsapp.com/send?phone=5554996860104" target="_blank"><p> (54) 99686-0104</p></Link>
                  </div>
                  <div className={styles.containerContacts}>
                     <span><GrMail color='var(--orange)' size={38} /></span>
                     <Link href="mailto:contato@builderseunegocioonline.com.br"><p> contato@builderseunegocioonline.com.br</p></Link>
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
               <br />
               <br />
               {articles.length === 0 && (
                  <span className={styles.emptyList}>
                     Nenhum artigo cadastrado...
                  </span>
               )}
               
                  {articles.map((artic) => {
                     return (
                        <>
                           <ul key={artic.id}>
                           <Link href={`/articlePage?article_id=${artic.id}`}>
                              <li>{artic?.title}</li>
                           </Link>
                              <span className={styles.dateArticles}>{moment(artic?.created_at).format('DD/MM/YYYY')}</span>
                           </ul>
                        </>
                     )
                  })}
               
            </div>
            <div className={styles.contentFooter}>
               <h2>Menu</h2>
               <hr />
               <br />
               <br />
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
                     <li><Link href="/politicasDePrivacidade"><a>Politicas de Privacidade</a></Link></li>
                  </ul>
               </nav>
            </div>
            <div className={styles.contentFooter}>
               <h2>Redes Sociais</h2>
               <hr />
               <br />
               <br />
               <Link href="https://www.facebook.com/builderseunegocioonline" target="_blank">
                  <AiFillFacebook color='var(--orange)' size={45} />
               </Link>
               <Link href="https://www.instagram.com/builderseunegocioonline" target="_blank">
                  <AiFillInstagram color='var(--orange)' size={45} />
               </Link>
               <Link href="https://www.linkedin.com/in/gabriel-campos-de-bastiani" target="_blank">
                  <AiFillLinkedin color='var(--orange)' size={45} />
               </Link>
               <Link href="https://github.com/gabrielbastiani" target="_blank">
                  <FaGithubSquare color='var(--orange)' size={45} />
               </Link>

               <br />
               <br />

               <h3>Entre em contato</h3>
               <hr />
               
               <ContactForm />
               
            </div>
         </section>

         <div className={styles.copyrightFooter}>
            <h5>Copyright {anoAtual} © Todos os direitos reservados. Desenvolvido por Gabriel Campos de Bastiani.</h5>
         </div>

      </footer>
   )
}
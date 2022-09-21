import React, { useEffect, useCallback, useState } from 'react'
import Head from '../../../node_modules/next/head'
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { api } from '../../services/apiClient';
import { FooterPainel } from '../../components/FooterPainel/index'
import { HeaderPainel } from '../../components/HeaderPainel/index'
import styles from './styles.module.scss'
import { FaTrashAlt, FaFileExport } from 'react-icons/fa'
import { RiMailSendLine } from 'react-icons/ri'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { FiRefreshCcw } from 'react-icons/fi'
import Link from '../../../node_modules/next/link';
import moment from 'moment';
import { useRouter } from 'next/router'
import { Input } from '../../components/ui/Input/index';



export default function Contacts() {

   const router = useRouter()

   const [contact, setContact] = useState([]);
   const [totalContact, setTotalContact] = useState(0);
   const [limitContact, setLimitContact] = useState(4);
   const [pagesContact, setPagesContact] = useState([]);
   const [currentPageContact, setCurrentPageContact] = useState(1);

   const [initialFilter, setInitialFilter] = useState();
   const [search, setSearch] = useState([]);


   useEffect(() => {
      async function loadContactForm() {
         try {
            const { data } = await api.get(`/contactform/page?pageContact=${currentPageContact}&limitContact=${limitContact}`);
            setTotalContact(data?.totalContact);
            const totalPages = Math.ceil(totalContact / limitContact);

            const arrayPagesContact = [];
            for (let i = 1; i <= totalPages; i++) {
               arrayPagesContact.push(i);
            }

            setPagesContact(arrayPagesContact);
            setContact(data?.contact || []);

         } catch (error) {

            console.error(error);
            alert('Error call api list contacts');

         }
      }

      loadContactForm();
   }, [currentPageContact, limitContact, totalContact]);

   const limitsContact = useCallback((e) => {
      setLimitContact(e.target.value);
      setCurrentPageContact(1);
   }, []);

   async function handleRefreshNewslatters() {
      const apiClient = setupAPIClient();

      const response = await apiClient.get('/contactform/all')
      setContact(response.data);

      router.reload()

   }

   const handleChange = ({ target }) => {
      if (!target.value) {
         setSearch(initialFilter);

         return;
      }

      const filterArticles = contact.filter((filt) => filt.textContact.toLowerCase().includes(target.value));
      setContact(filterArticles);
   }

   async function handleRefreshFilter() {
      const apiClient = setupAPIClient();

      const response = await apiClient.get('/contactform/all')
      setContact(response.data);

   }

   async function handleExportContacts() {
      const apiClient = setupAPIClient();

      const response = await apiClient.get('/contactform/export')

   }



   return (
      <>
         <Head>
            <title>Contatos - Blog Builder Seu Negócio Online</title>
         </Head>
         <main>

            <HeaderPainel />

            <section className={styles.sectionReturn}>

               <Link href={'/dashboard'}>
                  <BsFillArrowLeftSquareFill className={styles.return} size={30} />
               </Link>

               <h1>Central de contatos</h1>

            </section>

            <section className={styles.sectionChangePage}>

               <h5>Total de contatos por página: </h5>

               <br />

               <select onChange={limitsContact}>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="12">12</option>
                  <option value="999999">Todas</option>
               </select>

            </section>

            <section className={styles.refresh}>
               <button className={styles.buttonRefresh} onClick={handleRefreshNewslatters}>
                  <FiRefreshCcw size={22} />Atualizar Lista de Contatos
               </button>
            </section>

            <section className={styles.boxSearch}>
               <Input
                  placeholder='Busca por mensagem'
                  type="search"
                  onChange={handleChange}
               />

               <button
                  onClick={handleRefreshFilter}>Limpar filtro
               </button>
            </section>

            <section className={styles.refresh}>
               <button className={styles.buttonRefresh} onClick={handleExportContacts}>
                  <FaFileExport size={22} />Exportar Lista de Contatos
               </button>
            </section>

            <br />

            <section className={styles.sectionContact}>

               <div className={styles.contactformSection}>

                  {contact.length === 0 && (
                     <span className={styles.emptyList}>
                        Nenhum contato por enquanto...
                     </span>
                  )}

                  {contact.map((contato) => {
                     return (
                        <>
                           <div key={contato.id} className={styles.contactForm}>
                              <div className={styles.iconsContainer}>
                                 <div className={styles.trashLink}>
                                    <Link href={`/contactDelete?contactform_id=${contato.id}`}>
                                       <FaTrashAlt className={styles.trash} color='var(--red)' size={25} />
                                    </Link>
                                 </div>
                                 <div className={styles.sendemailIcon}>
                                    <Link href={`mailto:${contato.emailContact}?subject=${contato.nameContact} falo do blog Builder Seu Negócio Online`}>
                                       <RiMailSendLine className={styles.sendMail} color='var(--red)' size={30} />
                                    </Link>
                                 </div>
                              </div>
                              <div className={styles.dataContact}>
                                 <span>Mensagem recebida: {moment(contato?.created_at).format('DD/MM/YYYY - HH:mm')}</span>
                              </div>
                              <label>Nome</label>
                              <div className={styles.nameContact}>
                                 <span className={styles.name}>{contato.nameContact}</span>
                              </div>
                              <label>E-mail</label>
                              <div className={styles.emailContact}>
                                 <span className={styles.email}>{contato.emailContact}</span>
                              </div>
                              <label>Mensagem</label>
                              <textarea className={styles.textContact}>
                                 {contato.textContact}
                              </textarea>
                           </div>
                        </>
                     )
                  })}
               </div>

            </section>

            <section className={styles.containerPagination}>
               <div className={styles.totalCategorys}>
                  <span>Total de categorias: {totalContact}</span>
               </div>

               <div className={styles.containerCategorysPages}>
                  {currentPageContact > 1 && (
                     <div className={styles.previus}>
                        <button onClick={() => setCurrentPageContact(currentPageContact - 1)}>
                           Voltar
                        </button>
                     </div>
                  )}

                  {pagesContact.map((numberPage) => (
                     <span
                        className={styles.page}
                        key={numberPage}
                        onClick={() => setCurrentPageContact(numberPage)}
                     >
                        {numberPage}
                     </span>
                  ))}

                  {currentPageContact < contact.length && (
                     <div className={styles.next}>
                        <button onClick={() => setCurrentPageContact(currentPageContact + 1)}>
                           Avançar
                        </button>
                     </div>
                  )}

               </div>
            </section>

         </main>
         <FooterPainel />
      </>
   )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
   const apliClient = setupAPIClient(ctx)

   return {
      props: {}
   }
})
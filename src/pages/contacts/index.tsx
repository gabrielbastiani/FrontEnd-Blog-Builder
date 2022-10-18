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
import { BiMailSend } from 'react-icons/bi'
import Link from '../../../node_modules/next/link';
import moment from 'moment';
import { Input } from '../../components/ui/Input/index';
import { toast } from 'react-toastify'
import Modal from 'react-modal';
import { ModalDeleteContactForm } from '../../components/ModalDeleteContactForm/index';



export type DeleteContactFormProps = {
   id: string;
}

export default function Contacts() {

   const [contact, setContact] = useState([]);
   const [totalContact, setTotalContact] = useState(0);
   const [limitContact, setLimitContact] = useState(4);
   const [pagesContact, setPagesContact] = useState([]);
   const [currentPageContact, setCurrentPageContact] = useState(1);

   const [initialFilter, setInitialFilter] = useState();
   const [search, setSearch] = useState([]);

   const [modalItem, setModalItem] = useState<DeleteContactFormProps[]>();
   const [modalVisible, setModalVisible] = useState(false);


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
      const { data } = await api.get(`/contactform/page?pageContact=${currentPageContact}&limitContact=${limitContact}`);
      setTotalContact(data?.totalContact);
      const totalPages = Math.ceil(totalContact / limitContact);
      const arrayPagesContact = [];
      for (let i = 1; i <= totalPages; i++) {
         arrayPagesContact.push(i);
      }
      setPagesContact(arrayPagesContact);
      setContact(data?.contact || []);
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
      const { data } = await api.get(`/contactform/page?pageContact=${currentPageContact}&limitContact=${limitContact}`);
      setTotalContact(data?.totalContact);
      const totalPages = Math.ceil(totalContact / limitContact);
      const arrayPagesContact = [];
      for (let i = 1; i <= totalPages; i++) {
         arrayPagesContact.push(i);
      }
      setPagesContact(arrayPagesContact);
      setContact(data?.contact || []);
   }

   async function handleExportContacts() {
      const apiClient = setupAPIClient();

      await apiClient.get('/contactform/export');

      toast.success('Lista de mensagens gerada com sucesso!')

   }

   async function handleExportContactsEmail() {
      const apiClient = setupAPIClient();

      await apiClient.get('/contactform/sendlist');

      toast.success('Lista de mensagens exportada para seu EMAIL com sucesso!')

   }

   function handleCloseModal() {
      setModalVisible(false);
   }

   async function handleOpenModal(id: string) {
      const apiClient = setupAPIClient();
      const resposeData = await apiClient.get('/contactform', {
         params: {
            contactform_id: id,
         }
      });
      setModalItem(resposeData.data);
      setModalVisible(true);
   }

   Modal.setAppElement('#__next');



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
                  <FaFileExport size={22} />Gerar Lista de Contatos
               </button>
               <button className={styles.buttonRefresh} onClick={handleExportContactsEmail}>
                  <BiMailSend size={27} />Enviar Lista de Contatos no E-mail
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
                                    <FaTrashAlt className={styles.trash} color='var(--red)' size={25} onClick={() => handleOpenModal(contato.id)}/>
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
                  <span>Total de contatos: {totalContact}</span>
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

         {modalVisible && (
            <ModalDeleteContactForm
               isOpen={modalVisible}
               onRequestClose={handleCloseModal}
               contactform={modalItem}
            />
         )}

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
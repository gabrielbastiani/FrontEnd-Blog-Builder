import React, { useEffect, useCallback, useState } from 'react'
import Head from '../../../node_modules/next/head'
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { api } from '../../services/apiClient';
import { FooterPainel } from '../../components/FooterPainel/index'
import { HeaderPainel } from '../../components/HeaderPainel/index'
import styles from '../usersAll/styles.module.scss'
import { FaTrashAlt, FaFileExport } from 'react-icons/fa'
import { RiMailSendLine } from 'react-icons/ri'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { FiRefreshCcw, FiEdit } from 'react-icons/fi'
import { BiMailSend } from 'react-icons/bi'
import Link from '../../../node_modules/next/link';
import moment from 'moment';
import { useRouter } from 'next/router'
import { Input } from '../../components/ui/Input/index';
import { toast } from 'react-toastify'
import Modal from 'react-modal';
import { ModalDeleteUser } from '../../components/ModalDeleteUser/index';
import Image from '../../../node_modules/next/image';


export type DeleteUserProps = {
  id: string;
}

export default function Contacts() {

  const router = useRouter()

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(4);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [initialFilter, setInitialFilter] = useState();
  const [search, setSearch] = useState([]);

  const [modalItem, setModalItem] = useState<DeleteUserProps[]>();
  const [modalVisible, setModalVisible] = useState(false);



  useEffect(() => {
    async function loadUsersAll() {
      try {

        const { data } = await api.get(`/users/pagesusers?page=${currentPage}&limit=${limit}`);
        setTotal(data?.total);
        const totalPages = Math.ceil(total / limit);

        const arrayPages = [];
        for (let i = 1; i <= totalPages; i++) {
          arrayPages.push(i);
        }

        setPages(arrayPages);
        setUsers(data?.users || []);

      } catch (error) {

        console.error(error);
        alert('Error call api list users');

      }
    }

    loadUsersAll();
  }, [currentPage, limit, total]);

  const limits = useCallback((e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, []);

  async function handleRefreshUsers() {
    const { data } = await api.get(`/users/pagesusers?page=${currentPage}&limit=${limit}`);
    setTotal(data?.total);
    const totalPages = Math.ceil(total / limit);
    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }
    setPages(arrayPages);
    setUsers(data?.users || []);
  }

  const handleChange = ({ target }) => {
    if (!target.value) {
      setSearch(initialFilter);

      return;
    }

    const filterArticles = users.filter((filt) => filt.name.toLowerCase().includes(target.value));
    setUsers(filterArticles);
  }

  async function handleRefreshFilter() {
    const { data } = await api.get(`/users/pagesusers?page=${currentPage}&limit=${limit}`);
    setTotal(data?.total);
    const totalPages = Math.ceil(total / limit);
    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }
    setPages(arrayPages);
    setUsers(data?.users || []);
  }

  async function handleExportUsers() {
    const apiClient = setupAPIClient();

    await apiClient.get('/users/export');

    toast.success('Lista de usúarios gerada com sucesso!')

  }

  async function handleExportUsersEmail() {
    const apiClient = setupAPIClient();

    await apiClient.get('/users/sendlistuser');

    toast.success('Lista de usúarios exportado para seu EMAIL com sucesso!')

  }

  function handleCloseModal() {
    setModalVisible(false);
 }

 async function handleOpenModal(id: string) {
    const apiClient = setupAPIClient();
    const responseDate = await apiClient.get('/users/all', {
       params: {
          user_id: id,
       }
    });
    setModalItem(responseDate.data);
    setModalVisible(true);
 }

 Modal.setAppElement('#__next');



  return (
    <>
      <Head>
        <title>Usúarios - Blog Builder Seu Negócio Online</title>
      </Head>
      <main>

        <HeaderPainel />

        <section className={styles.sectionReturn}>

          <Link href={'/dashboard'}>
            <BsFillArrowLeftSquareFill className={styles.return} size={30} />
          </Link>

          <h1>Central de usúarios</h1>

        </section>

        <section className={styles.sectionChangePage}>

          <h5>Total de usúarios por página: </h5>

          <br />

          <select onChange={limits}>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="999999">Todas</option>
          </select>

        </section>

        <section className={styles.refresh}>
          <button className={styles.buttonRefresh} onClick={handleRefreshUsers}>
            <FiRefreshCcw size={22} />Atualizar Lista de Usúarios
          </button>
        </section>

        <section className={styles.boxSearch}>
          <Input
            placeholder='Busca por usúarios'
            type="search"
            onChange={handleChange}
          />

          <button
            onClick={handleRefreshFilter}>Limpar filtro
          </button>
        </section>

        <section className={styles.refresh}>
          <button className={styles.buttonRefresh} onClick={handleExportUsers}>
            <FaFileExport size={22} />Gerar Lista de Usúarios
          </button>
          <button className={styles.buttonRefresh} onClick={handleExportUsersEmail}>
            <BiMailSend size={27} />Enviar Lista de Usúarios para seu E-mail
          </button>
        </section>

        <section className={styles.sectionContact}>

          <div className={styles.contactformSection}>

            {users.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum usúario por enquanto...
              </span>
            )}

            {users.map((use) => {
              return (
                <>
                  <div key={use.id} className={styles.contactForm}>
                    <div className={styles.iconsContainer}>
                      <div className={styles.trashLink}>
                        <Link href={`/updateUser?user_id=${use.id}`}>
                          <FiEdit className={styles.trash} color='var(--red)' size={25} />
                        </Link>
                      </div>
                      <div className={styles.trashLink}>
                        <FaTrashAlt className={styles.trash} color='var(--red)' size={25} onClick={() => handleOpenModal(use.id)}/>
                      </div>
                      <div className={styles.sendemailIcon}>
                        <Link href={`mailto:${use.email}?subject=${use.name} Sou administrador do blog Builder Seu Negócio Online`}>
                          <RiMailSendLine className={styles.sendMail} color='var(--red)' size={30} />
                        </Link>
                      </div>
                    </div>
                    <div className={styles.dataContact}>
                      <span>Data cadastro do usúario: {moment(use?.created_at).format('DD/MM/YYYY - HH:mm')}</span>
                    </div>
                    <label>Nome do usúario</label>
                    <div className={styles.nameContact}>
                      <span className={styles.name}>{use.name}</span>
                    </div>
                    <label>E-mail do usúario</label>
                    <div className={styles.emailContact}>
                      <span className={styles.email}>{use.email}</span>
                    </div>
                    <label>Permissão do usúario</label>
                    <div className={styles.emailContact}>
                      <span className={styles.email}>{use.role}</span>
                    </div>
                    <label>Foto do usúario</label>
                    <div className={styles.userImg}>
                      <Image className={styles.img} src={"http://localhost:3333/files/" + use?.photo} width={130} height={130} alt="foto usuario" />
                    </div>
                  </div>
                </>
              )
            })}
          </div>

        </section>

        <section className={styles.containerPagination}>
          <div className={styles.totalCategorys}>
            <span>Total de usúarios: {total}</span>
          </div>

          <div className={styles.containerCategorysPages}>
            {currentPage > 1 && (
              <div className={styles.previus}>
                <button onClick={() => setCurrentPage(currentPage - 1)}>
                  Voltar
                </button>
              </div>
            )}

            {pages.map((numberPage) => (
              <span
                className={styles.page}
                key={numberPage}
                onClick={() => setCurrentPage(numberPage)}
              >
                {numberPage}
              </span>
            ))}

            {currentPage < users.length && (
              <div className={styles.next}>
                <button onClick={() => setCurrentPage(currentPage + 1)}>
                  Avançar
                </button>
              </div>
            )}

          </div>
        </section>

      </main>

      {modalVisible && (
          <ModalDeleteUser
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            user={modalItem}
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
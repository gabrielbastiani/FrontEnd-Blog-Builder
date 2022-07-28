import { useState, FormEvent } from 'react'
import Head from "next/head"
import { HeaderPainel } from '../../components/HeaderPainel/index'
import styles from './styles.module.scss'
import Router from 'next/router'
import { FiRefreshCcw } from 'react-icons/fi'
import { FaTrashAlt } from 'react-icons/fa'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'

import Link from 'next/link';
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { FooterPainel } from '../../components/FooterPainel/index'
import { toast } from 'react-toastify'
import Modal from 'react-modal';
import {ModalCategoryDelete} from '../../components/ModalCategoryDelete/index'

type CategoryItems = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface CategoryProps {
  categorysList: CategoryItems[];
}

export type Category = {
  category_id: string;
  name: string;
}

export default function Category({ categorysList }: CategoryProps) {

  const [name, setName] = useState('')

  const [categorys, setCategorys] = useState(categorysList || [])

  const [modalItem, setModalItem] = useState<Category[]>()
  const [modalVisible, setModalVisible] = useState(false);

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === '') {

      toast.error('Digite algum nome para sua categoria!')

      return;
    }

    const apiClient = setupAPIClient();
    await apiClient.post('/category', {
      name: name
    })

    toast.success('Categoria cadastrada com sucesso!')
    setName('');

    handleRefreshCategory()

    Router.push('/newCategory')

  }

  async function handleRefreshCategory() {
    const apiClient = setupAPIClient()
    const categorys = await apiClient.get('/category/')
    setCategorys(categorys.data)
  }

  async function handleDeleteCategory(id: string) {
    const apiClient = setupAPIClient();
    await apiClient.put('/category/remove', {
      category_id: id,
    })

    const response = await apiClient.get('/category/all');

    setCategorys(response.data);
    setModalVisible(false);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string) {

    const apiClient = setupAPIClient();

    const response = await apiClient.get('/category', {
      params: {
        category_id: id,
      }
    })

    setModalItem(response.data);
    setModalVisible(true)
  }

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Nova categoria - Builder Seu Negócio Online</title>
      </Head>
      <div>

        <HeaderPainel />

        <main className={styles.container}>

          <Link href={'/dashboard'}>
            <BsFillArrowLeftSquareFill className={styles.return} size={30} />
          </Link>

          <h1>Cadastrar categorias</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>

          </form>

          <h3>Categorias Cadastradas</h3>

          <button className={styles.buttonRefresh} onClick={handleRefreshCategory}>
            <FiRefreshCcw className={styles.refresh} size={22} />Atualizar Lista de Categorias
          </button>

          {categorysList.length > 0 && (
            <h4>Clique sobre uma categoria para atualiza-la.</h4>
          )}

          {categorysList.length === 0 && (
            <span className={styles.emptyList}>
              Nenhuma categoria cadastrada...
            </span>
          )}

          <section className={styles.categorysSectionMain}>
            <div className={styles.categorysSection}>
              {categorys.map((item) => {
                return (
                  <Link className={styles.nameCategory} key={item.id} href={`/categoryUpdate?category_id=${item.id}`}>
                    <div className={styles.listCategories}>
                      <div className={styles.nameCategory}>{item.name}</div>
                      <div className={styles.dates}>
                        <span>Data de criação: {item.created_at}</span>
                        <span>Data da última atualização: {item.updated_at}</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className={styles.categorysDelete}>
              {categorys.map((item) => {
                return (
                  <div key={item.id} className={styles.deleteCategory} onClick={() => handleOpenModalView(item.id)}>
                    <FaTrashAlt className={styles.trash} color='var(--red)' size={22} />
                  </div>
                )
              })}
            </div>
          </section>
        </main>
        { modalVisible && (
        <ModalCategoryDelete
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          categoryModal={modalItem}
          handleDeleteCategory={ handleDeleteCategory }
        />
      )}
      </div>
      <FooterPainel />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apliClient = setupAPIClient(ctx)

  const categorys = await apliClient.get('/category/all');

  return {
    props: {
      categorysList: categorys.data
    }
  }
})
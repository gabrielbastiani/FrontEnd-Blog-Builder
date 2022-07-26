import { useState, FormEvent, ChangeEvent, useContext } from 'react'
import Head from "next/head"
import { HeaderPainel } from '../../components/HeaderPainel/index'
import styles from './styles.module.scss'
import Router from 'next/router'
import { FiRefreshCcw } from 'react-icons/fi'
import { FaTrashAlt } from 'react-icons/fa'

import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { FooterPainel } from '../../components/FooterPainel/index'
import { toast } from 'react-toastify'

import {ModalCategory} from '../../components/ModalCategory/index'
import {ModalCategoryDelete} from '../../components/ModalCategoryDelete/index'

import Modal from 'react-modal';


type CategoryItems = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface CategoryProps {
  categoryList: CategoryItems[];
}

export type CategoryNameProps = {
  id: string;
  name: string;
  updated_at: string;
    categoryName:{
      category_id: string;
      name: string;
      updated_at: string;
    }
}

export type DeleteProps = {
  id: string;
    deleteCategory:{
      id: string;
      category_id: string;
    }
}

export default function Category({ categoryList }: CategoryProps) {

  const [name, setName] = useState('')

  const [categorysList, setCategorysList] = useState(categoryList || [])

  const [modalItem, setModalItem] = useState<CategoryNameProps>()
  const [modaDel, setmMdaDel] = useState<DeleteProps>()

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDel, setModalVisibleDel] = useState(false);

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

    Router.push('/category')

  }

  function handleCloseModal(){
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string){
   
    const apiClient = setupAPIClient(); 

    const response = await apiClient.get('/category', {
      params:{
       category_id: id,
      }
    })

    setModalItem(response.data);

    setModalVisible(true);
 }

  async function handleRefreshCategory() {
    const apiClient = setupAPIClient()
    const response = await apiClient.get('/category')
    setCategorysList(response.data)
  }

  function handleCloseModalDel(){
    setModalVisibleDel(false);
  }

  async function handleOpenModalViewDelete(id: string){
   
    const apiClient = setupAPIClient(); 

    const response = await apiClient.get('/category', {
      params:{
       category_id: id,
      }
    })

    setmMdaDel(response.data);

    setModalVisibleDel(true);
 }

  /* async function handleDeleteCategory(id: string){
    const apiClient = setupAPIClient(); 

    await apiClient.delete('/category/remove', {
      params:{
       category_id: id,
      }
    })

    handleRefreshCategory()
  } */
  

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Nova categoria - Builder Seu Negócio Online</title>
      </Head>
      <div>
        
        <HeaderPainel />

        <main className={styles.container}>
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

          <h4>Clique sobre uma categoria para atualiza-la.</h4>

          {categorysList.length === 0 && (
            <span className={styles.emptyList}>
              Nenhuma categoria cadastrada...
            </span>
          )}

          {categorysList.map( item => (
            <div key={item.id} className={styles.listCategories}>
              <div className={styles.nameCategory} onClick={ () => handleOpenModalView(item.id)}>{item.name}</div>
              <div className={styles.dates}>
                <span>Data de criação: {item.created_at}</span>
                <span>Data da última atualização: {item.updated_at}</span>
              </div>
              <div className={styles.deleteCategory} onClick={ () => handleOpenModalViewDelete(item.id) }>
                <FaTrashAlt className={styles.trash} color='var(--red)' size={22} />
              </div>
            </div>
          ))}

        </main>

        { modalVisible && (
          <ModalCategory
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            categoryName={modalItem}
          />
        )}

        { modalVisibleDel && (
          <ModalCategoryDelete
            isOpen={modalVisibleDel}
            onRequestClose={handleCloseModalDel}
            deleteCategory={modaDel}
          />
        )}

      </div>
      <FooterPainel />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apliClient = setupAPIClient(ctx)

  const response = await apliClient.get('/category');

  return {
    props: {
      categoryList: response.data
    }
  }
})
import React, { useState, FormEvent } from 'react'
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
import moment from 'moment';

type CategoryItems = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface CategoryProps {
  categorysList: CategoryItems[];
}

export default function Category({ categorysList }: CategoryProps) {

  const [name, setName] = useState('')

  const [categorys, setCategorys] = useState(categorysList || [])

  const dateFormat = categorys.map(i => {
    return {
      ...i,
      created_at: moment(i.created_at).format('DD/MM/YYYY HH:mm:ss'),
      updated_at: moment(i.updated_at).format('DD/MM/YYYY HH:mm:ss')
    }
  })

  console.log(dateFormat)


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
                  <>
                    <div>
                    <Link className={styles.nameCategory} key={item.id} href={`/categoryUpdate?category_id=${item.id}`}>
                      <div className={styles.listCategories}>
                        <div className={styles.nameCategory}>{item.name}</div>
                        <div className={styles.dates}>
                          <span>Data de criação: {moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}</span>
                        </div>
                      </div>
                    </Link>
                    </div>
                    <div>
                    <Link className={styles.deleteCategory} href={`/categoryDelete?category_id=${item.id}`}>
                      <FaTrashAlt className={styles.trash} color='var(--red)' size={22} />
                    </Link>
                    </div>
                  </>
                )
              })}
            </div>
          </section>
        </main>
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
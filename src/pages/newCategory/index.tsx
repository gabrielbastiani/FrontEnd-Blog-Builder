import React, { useState, FormEvent, useEffect, useCallback } from 'react'
import Head from "next/head"
import { HeaderPainel } from '../../components/HeaderPainel/index'
import styles from './styles.module.scss'
import Router from 'next/router'
import { FiRefreshCcw } from 'react-icons/fi'
import { FaTrashAlt } from 'react-icons/fa'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { api } from '../../services/apiClient';
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

  const [categs, setCategs] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(4);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  console.log(categs)

  useEffect(() => {
    async function loadCategorys() {
      try {
        const { data } = await api.get(`/category/all?page=${currentPage}&limit=${limit}`);
        setTotal(data?.total);
        const totalPages = Math.ceil(total / limit);

        const arrayPages = [];
        for (let i = 1; i <= totalPages; i++) {
          arrayPages.push(i);
        }

        setPages(arrayPages);
        setCategs(data?.categs || []);

      } catch (error) {

        console.error(error);
        alert('Error call api list category');

      }
    }

    loadCategorys();
  }, [currentPage, limit, total]);

  const limits = useCallback((e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, []);

  const dateFormat = categorys.map(i => {
    return {
      ...i,
      created_at: moment(i.created_at).format('DD/MM/YYYY HH:mm'),
      updated_at: moment(i.updated_at).format('DD/MM/YYYY HH:mm')
    }
  })

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
    const categorys = await apiClient.get('/category')
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

          <br />

          <select onChange={limits}>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>

          < br />

          {categs.length > 0 && (
            <h4>Clique sobre uma categoria para atualiza-la.</h4>
          )}

          {categs.length === 0 && (
            <span className={styles.emptyList}>
              Nenhuma categoria cadastrada...
            </span>
          )}

          <section className={styles.categorysSectionMain}>
            <div className={styles.categorysSection}>
              {categs.map((categ) => {
                return (
                  <>
                    <div className={styles.categoryBox}>
                      <div className={styles.category} key={categ.id}>
                        <Link className={styles.nameCategory} href={`/categoryUpdate?category_id=${categ.id}`}>
                          <div className={styles.listCategories}>
                            <div className={styles.nameCategory}>{categ?.name}</div>
                            <div className={styles.dates}>
                              <span>Data de criação: {moment(categ?.created_at).format('DD/MM/YYYY HH:mm')}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className={styles.categoryDelete}>
                        <Link className={styles.deleteCategory} href={`/categoryDelete?category_id=${categ.id}`}>
                          <FaTrashAlt className={styles.trash} color='var(--red)' size={20} />
                        </Link>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>

            <br />

            <div className={styles.containerPagination}>
              <div className={styles.totalCategorys}>
                <span>Total de categorias: {total}</span>
              </div>

              <div className={styles.containerCategorysPages}>
                {currentPage > 1 && (
                  <div className={styles.previus}>
                    <button onClick={() => setCurrentPage(currentPage - 1)}>
                      Voltar
                    </button>
                  </div>
                )}

                {pages.map((page) => (
                  <span
                    className={styles.page}
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </span>
                ))}

                {currentPage < categs.length && (
                  <div className={styles.next}>
                    <button onClick={() => setCurrentPage(currentPage + 1)}>
                      Avançar
                    </button>
                  </div>
                )}

              </div>
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
  const categorys = await apliClient.get('/category');

  return {
    props: {
      categorysList: categorys.data
    }
  }
})
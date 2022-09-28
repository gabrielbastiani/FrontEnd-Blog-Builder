import React, { useState, FormEvent, useEffect, useCallback, useContext } from 'react'
import Head from "next/head"
import { HeaderPainel } from '../../components/HeaderPainel/index'
import styles from './styles.module.scss'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { FiRefreshCcw } from 'react-icons/fi'
import { api } from '../../services/apiClient';
import Link from 'next/link';
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { FooterPainel } from '../../components/FooterPainel/index'
import { toast } from 'react-toastify'
import moment from 'moment';
import { Input } from '../../components/ui/Input/index'
import { Button } from '../../components/ui/Button/index'
import { useRouter } from 'next/router'
import { AuthContext } from '../../contexts/AuthContext'


export default function Category() {

  const { user } = useContext(AuthContext);

  const [categoryName, setCategoryName] = useState('');

  const [allcategorys, setAllCategorys] = useState([]);

  const [categs, setCategs] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(4);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialFilter, setInitialFilter] = useState();
  const [search, setSearch] = useState([]);

  const [categsAdmin, setCategsAdmin] = useState([]);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [limitAdmin, setLimitAdmin] = useState(4);
  const [pagesAdmin, setPagesAdmin] = useState([]);
  const [currentPageAdmin, setCurrentPageAdmin] = useState(1);
  const [initialFilterAdmin, setInitialFilterAdmin] = useState();
  const [searchAdmin, setSearchAdmin] = useState([]);

  const [currentAdmin, setCurrentAdmin] = useState('');
  const roleADMIN = "ADMIN";


  useEffect(() => {
    async function loadAllCategorys() {
      const all = await api.get('/category');
      setAllCategorys(all.data);
    }
    loadAllCategorys();
  }, [])

  useEffect(() => {
    async function loadCategoryAdmin() {
      try {
        const response = await api.get('/me');
        setCurrentAdmin(response.data.role);

        const { data } = await api.get(`/category/admin?pageAdmin=${currentPageAdmin}&limitAdmin=${limitAdmin}`);
        setTotalAdmin(data?.totalAdmin);
        const totalPagesAdmin = Math.ceil(totalAdmin / limitAdmin);

        const arrayPagesAdmin = [];
        for (let i = 1; i <= totalPagesAdmin; i++) {
          arrayPagesAdmin.push(i);
        }

        setPagesAdmin(arrayPagesAdmin);
        setCategsAdmin(data?.categsAdmin || []);

      } catch (error) {

        console.error(error);
        alert('Error call api list category ADMIN');

      }
    }

    loadCategoryAdmin();
  }, [currentPageAdmin, limitAdmin, totalAdmin]);

  const limitsAdmin = useCallback((e) => {
    setLimitAdmin(e.target.value);
    setCurrentPageAdmin(1);
  }, []);


  useEffect(() => {
    async function loadCategorys() {
      try {
        const response = await api.get('/me');
        setCurrentAdmin(response.data.role);
        const name = response.data.name;

        const { data } = await api.get(`/category/all?page=${currentPage}&limit=${limit}&name=${name}`);
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

  async function handleRefreshCategory() {
    const response = await api.get('/me');
    setCurrentAdmin(response.data.role);
    const name = response.data.name;

    const { data } = await api.get(`/category/all?page=${currentPage}&limit=${limit}&name=${name}`);
    setTotal(data?.total);
    const totalPages = Math.ceil(total / limit);

    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }

    setPages(arrayPages);
    setCategs(data?.categs || []);

  }

  async function handleRefreshCategoryAdmin() {
    const response = await api.get('/me');
    setCurrentAdmin(response.data.role);

    const { data } = await api.get(`/category/admin?pageAdmin=${currentPageAdmin}&limitAdmin=${limitAdmin}`);
    setTotalAdmin(data?.totalAdmin);
    const totalPagesAdmin = Math.ceil(totalAdmin / limitAdmin);

    const arrayPagesAdmin = [];
    for (let i = 1; i <= totalPagesAdmin; i++) {
      arrayPagesAdmin.push(i);
    }

    setPagesAdmin(arrayPagesAdmin);
    setCategsAdmin(data?.categsAdmin || []);

  }

  async function handleRefreshFilter() {
    const response = await api.get('/me');
    setCurrentAdmin(response.data.role);
    const name = response.data.name;

    const { data } = await api.get(`/category/all?page=${currentPage}&limit=${limit}&name=${name}`);
    setTotal(data?.total);
    const totalPages = Math.ceil(total / limit);

    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }

    setPages(arrayPages);
    setCategs(data?.categs || []);

  }

  async function handleRefreshFilterAdmin() {
    const response = await api.get('/me');
    setCurrentAdmin(response.data.role);

    const { data } = await api.get(`/category/admin?pageAdmin=${currentPageAdmin}&limitAdmin=${limitAdmin}`);
    setTotalAdmin(data?.totalAdmin);
    const totalPagesAdmin = Math.ceil(totalAdmin / limitAdmin);

    const arrayPagesAdmin = [];
    for (let i = 1; i <= totalPagesAdmin; i++) {
      arrayPagesAdmin.push(i);
    }

    setPagesAdmin(arrayPagesAdmin);
    setCategsAdmin(data?.categsAdmin || []);

  }

  const handleChange = ({ target }) => {
    if (!target.value) {
      setSearch(initialFilter);

      return;
    }

    const filterArticles = categs.filter((filt) => filt.categoryName.toLowerCase().includes(target.value));
    setCategs(filterArticles);
  }

  const handleChangeAdmin = ({ target }) => {
    if (!target.value) {
      setSearchAdmin(initialFilterAdmin);

      return;
    }

    const filterArticlesAdmin = categsAdmin.filter((filtAdmin) => filtAdmin.categoryName.toLowerCase().includes(target.value));
    setCategsAdmin(filterArticlesAdmin);
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (categoryName === '') {
      toast.error('Digite algum nome para sua categoria!')
      return;
    }

    const apiClient = setupAPIClient();
    await apiClient.post('/category', {
      categoryName: categoryName,
      name: user.name
    })

    toast.success('Categoria cadastrada com sucesso!')
    setCategoryName('');

    handleRefreshCategory()
    handleRefreshCategoryAdmin()

  }



  return (
    <>
      <Head>
        <title>Nova categoria - Builder Seu Negócio Online</title>
      </Head>
      <main>

        <HeaderPainel />

        <section className={styles.container}>

          <Link href={'/dashboard'}>
            <BsFillArrowLeftSquareFill className={styles.return} size={30} />
          </Link>

          <h1>Cadastrar categorias</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>

          </form>

          {currentAdmin != roleADMIN && (
            <button className={styles.buttonRefresh} onClick={handleRefreshCategory}>
              <FiRefreshCcw className={styles.refresh} size={22} />Atualizar Lista de Categorias
            </button>
          )}

          {currentAdmin === roleADMIN && (
            <button className={styles.buttonRefresh} onClick={handleRefreshCategoryAdmin}>
              <FiRefreshCcw className={styles.refresh} size={22} />Atualizar Lista de Categorias
            </button>
          )}

          <h3>Categorias Cadastradas</h3>

          <br />

          {currentAdmin != roleADMIN && (
            <section className={styles.sectionBoxSearch}>
              <div className={styles.sectionBoxContainer}>
                <Input
                  placeholder='Buscar uma categoria'
                  type="search"
                  onChange={handleChange}
                />

                <Button
                  onClick={handleRefreshFilter}>Limpar filtro
                </Button>

              </div>

            </section>
          )}

          {currentAdmin === roleADMIN && (
            <section className={styles.sectionBoxSearch}>
              <div className={styles.sectionBoxContainer}>
                <Input
                  placeholder='Buscar uma categoria'
                  type="search"
                  onChange={handleChangeAdmin}
                />

                <Button
                  onClick={handleRefreshFilterAdmin}>Limpar filtro
                </Button>

              </div>

            </section>
          )}

          <br />
          <br />

          <h5>Total de categorias por página</h5>

          <br />

          {currentAdmin != roleADMIN && (<section>
            <select onChange={limits}>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="12">12</option>
            </select>

            < br />

            {categs.length > 0 && (
              <div>
                <h3>Abaixo suas categorias que cadastrou.</h3>
                <br />
                <h4>Clique sobre uma categoria para atualiza-la.</h4>
              </div>
            )}

            {categs.length === 0 && (
              <span className={styles.emptyList}>
                Nenhuma categoria cadastrada...
              </span>
            )}

            <div className={styles.categorysSectionMain}>
              <div className={styles.categorysSection}>
                {categs.map((categ) => {
                  return (
                    <>
                      <div className={styles.categoryBox}>
                        <div className={styles.category} key={categ.id}>
                          <Link className={styles.nameCategory} href={`/categoryUpdate?category_id=${categ.id}`}>
                            <div className={styles.listCategories}>
                              <div className={styles.nameCategory}>{categ?.categoryName}</div>
                              <div className={styles.dates}>
                                <span>Data de criação: {moment(categ?.created_at).format('DD/MM/YYYY HH:mm')}</span>
                              </div>
                            </div>
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
                  <span>Total das suas categorias cadastradas: {total}</span>
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

            </div>
          </section>)}

          {currentAdmin != roleADMIN && (
          <section className={styles.allCategorysSection}>
            <h3>Abaixo, todas as categorias disponiveis para uso em seus artigos.</h3>
            <br />
            <div className={styles.allCategorys}>
              {allcategorys.map((all) => {
                return(
                  <>
                    <div key={all.id} className={styles.allCategorysBox}>
                      <span>{all?.categoryName}</span>
                    </div>
                  </>
                )
              })}
            </div>
          </section>)}

          {currentAdmin === roleADMIN && (<section>
            <select onChange={limitsAdmin}>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="12">12</option>
            </select>

            < br />

            {categsAdmin.length > 0 && (
              <h4>Clique sobre uma categoria para atualiza-la.</h4>
            )}

            {categsAdmin.length === 0 && (
              <span className={styles.emptyList}>
                Nenhuma categoria cadastrada...
              </span>
            )}

            <div className={styles.categorysSectionMain}>
              <div className={styles.categorysSection}>
                {categsAdmin.map((categAdmin) => {
                  return (
                    <>
                      <div className={styles.categoryBox}>
                        <div className={styles.category} key={categAdmin.id}>
                          <Link className={styles.nameCategory} href={`/categoryUpdate?category_id=${categAdmin.id}`}>
                            <div className={styles.listCategories}>
                              <div className={styles.nameCategory}>{categAdmin?.categoryName}</div>
                              <div className={styles.dates}>
                                <span>Data de criação: {moment(categAdmin?.created_at).format('DD/MM/YYYY HH:mm')}</span>
                              </div>
                            </div>
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
                  <span>Total de categorias: {totalAdmin}</span>
                </div>

                <div className={styles.containerCategorysPages}>
                  {currentPageAdmin > 1 && (
                    <div className={styles.previus}>
                      <button onClick={() => setCurrentPageAdmin(currentPageAdmin - 1)}>
                        Voltar
                      </button>
                    </div>
                  )}

                  {pagesAdmin.map((pageAdmin) => (
                    <span
                      className={styles.page}
                      key={pageAdmin}
                      onClick={() => setCurrentPageAdmin(pageAdmin)}
                    >
                      {pageAdmin}
                    </span>
                  ))}

                  {currentPageAdmin < categsAdmin.length && (
                    <div className={styles.next}>
                      <button onClick={() => setCurrentPageAdmin(currentPageAdmin + 1)}>
                        Avançar
                      </button>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </section>)}
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
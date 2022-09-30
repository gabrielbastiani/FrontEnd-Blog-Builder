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
import { AuthContext } from '../../contexts/AuthContext'
import Router from '../../../node_modules/next/router'
import { Input } from '../../components/ui/Input/index'
import { Button } from '../../components/ui/Button/index'


export default function NewsTags() {

  const { user } = useContext(AuthContext);

  const [tagName1, setTagName1] = useState('')
  const [tagName2, setTagName2] = useState('')
  const [tagName3, setTagName3] = useState('')
  const [tagName4, setTagName4] = useState('')
  const [tagName5, setTagName5] = useState('')

  //-- PAGE TAG 1
  const [tags1, setTags1] = useState([]);
  const [totalTag1, setTotalTag1] = useState(0);
  const [limitTag1, setLimitTag1] = useState(3);
  const [pagesTag1, setPagesTag1] = useState([]);
  const [currentPageTag1, setCurrentPageTag1] = useState(1);

  const [tags1Admin, setTags1Admin] = useState([]);
  const [totalTag1Admin, setTotalTag1Admin] = useState(0);
  const [limitTag1Admin, setLimitTag1Admin] = useState(3);
  const [pagesTag1Admin, setPagesTag1Admin] = useState([]);
  const [currentPageTag1Admin, setCurrentPageTag1Admin] = useState(1);

  //-- PAGE TAG 2
  const [tags2, setTags2] = useState([]);
  const [totalTag2, setTotalTag2] = useState(0);
  const [limitTag2, setLimitTag2] = useState(3);
  const [pagesTag2, setPagesTag2] = useState([]);
  const [currentPageTag2, setCurrentPageTag2] = useState(1);

  const [tags2Admin, setTags2Admin] = useState([]);
  const [totalTag2Admin, setTotalTag2Admin] = useState(0);
  const [limitTag2Admin, setLimitTag2Admin] = useState(3);
  const [pagesTag2Admin, setPagesTag2Admin] = useState([]);
  const [currentPageTag2Admin, setCurrentPageTag2Admin] = useState(1);

  //-- PAGE TAG 3
  const [tags3, setTags3] = useState([]);
  const [totalTag3, setTotalTag3] = useState(0);
  const [limitTag3, setLimitTag3] = useState(3);
  const [pagesTag3, setPagesTag3] = useState([]);
  const [currentPageTag3, setCurrentPageTag3] = useState(1);

  const [tags3Admin, setTags3Admin] = useState([]);
  const [totalTag3Admin, setTotalTag3Admin] = useState(0);
  const [limitTag3Admin, setLimitTag3Admin] = useState(3);
  const [pagesTag3Admin, setPagesTag3Admin] = useState([]);
  const [currentPageTag3Admin, setCurrentPageTag3Admin] = useState(1);

  //-- PAGE TAG 4
  const [tags4, setTags4] = useState([]);
  const [totalTag4, setTotalTag4] = useState(0);
  const [limitTag4, setLimitTag4] = useState(3);
  const [pagesTag4, setPagesTag4] = useState([]);
  const [currentPageTag4, setCurrentPageTag4] = useState(1);

  const [tags4Admin, setTags4Admin] = useState([]);
  const [totalTag4Admin, setTotalTag4Admin] = useState(0);
  const [limitTag4Admin, setLimitTag4Admin] = useState(3);
  const [pagesTag4Admin, setPagesTag4Admin] = useState([]);
  const [currentPageTag4Admin, setCurrentPageTag4Admin] = useState(1);

  //-- PAGE TAG 5
  const [tags5, setTags5] = useState([]);
  const [totalTag5, setTotalTag5] = useState(0);
  const [limitTag5, setLimitTag5] = useState(3);
  const [pagesTag5, setPagesTag5] = useState([]);
  const [currentPageTag5, setCurrentPageTag5] = useState(1);

  const [tags5Admin, setTags5Admin] = useState([]);
  const [totalTag5Admin, setTotalTag5Admin] = useState(0);
  const [limitTag5Admin, setLimitTag5Admin] = useState(3);
  const [pagesTag5Admin, setPagesTag5Admin] = useState([]);
  const [currentPageTag5Admin, setCurrentPageTag5Admin] = useState(1);

  const [currentAdmin, setCurrentAdmin] = useState('');
  const roleADMIN = "ADMIN";

  const [allTags1, setAllTags1] = useState([]);
  const [allTags2, setAllTags2] = useState([]);
  const [allTags3, setAllTags3] = useState([]);
  const [allTags4, setAllTags4] = useState([]);
  const [allTags5, setAllTags5] = useState([]);



  useEffect(() => {
    async function loadTags() {
      const all1 = await api.get('/tag1');
      const all2 = await api.get('/tag2');
      const all3 = await api.get('/tag3');
      const all4 = await api.get('/tag4');
      const all5 = await api.get('/tag5');

      setAllTags1(all1.data);
      setAllTags2(all2.data);
      setAllTags3(all3.data);
      setAllTags4(all4.data);
      setAllTags5(all5.data);
    }
    loadTags();
  }, [])

  useEffect(() => {
    async function loadTags1() {
      try {
        const response = await api.get('/me');
        setCurrentAdmin(response.data.role);
        const name = response.data.name;

        const { data } = await api.get(`/tag1/page?pageTag1=${currentPageTag1}&limitTag1=${limitTag1}&name=${name}`);
        setTotalTag1(data?.totalTag1);
        const totalPagesTag1 = Math.ceil(totalTag1 / limitTag1);

        const arrayPagesTag1 = [];
        for (let i = 1; i <= totalPagesTag1; i++) {
          arrayPagesTag1.push(i);
        }

        setPagesTag1(arrayPagesTag1);
        setTags1(data?.tags1 || []);

      } catch (error) {

        console.error(error);
        alert('Error call api list tag 1');

      }
    }

    loadTags1();
  }, [currentPageTag1, limitTag1, totalTag1]);

  const limitsTag1 = useCallback((e) => {
    setLimitTag1(e.target.value);
    setCurrentPageTag1(1);
  }, []);

  useEffect(() => {
    async function loadTags1Admin() {
      try {
        const response = await api.get('/me');
        setCurrentAdmin(response.data.role);

        const { data } = await api.get(`/tag1/pageAdmin?pageTag1Admin=${currentPageTag1Admin}&limitTag1Admin=${limitTag1Admin}`);
        setTotalTag1Admin(data?.totalTag1Admin);
        const totalPagesTag1Admin = Math.ceil(totalTag1Admin / limitTag1Admin);

        const arrayPagesTag1Admin = [];
        for (let i = 1; i <= totalPagesTag1Admin; i++) {
          arrayPagesTag1Admin.push(i);
        }

        setPagesTag1Admin(arrayPagesTag1Admin);
        setTags1Admin(data?.tags1Admin || []);

      } catch (error) {

        console.error(error);
        alert('Error call api list tag 1 Admin');

      }
    }

    loadTags1Admin();
  }, [currentPageTag1Admin, limitTag1Admin, totalTag1Admin]);

  const limitsTag1Admin = useCallback((e) => {
    setLimitTag1Admin(e.target.value);
    setCurrentPageTag1Admin(1);
  }, []);

  useEffect(() => {
    async function loadTags2() {
      try {
        const response = await api.get('/me');
        setCurrentAdmin(response.data.role);
        const name = response.data.name;

        const { data } = await api.get(`/tag2/page?pageTag2=${currentPageTag2}&limitTag2=${limitTag2}&name=${name}`);
        setTotalTag2(data?.totalTag2);
        const totalPagesTag2 = Math.ceil(totalTag2 / limitTag2);

        const arrayPagesTag2 = [];
        for (let i = 1; i <= totalPagesTag2; i++) {
          arrayPagesTag2.push(i);
        }

        setPagesTag2(arrayPagesTag2);
        setTags2(data?.tags2 || []);

      } catch (error) {

        console.error(error);
        alert('Error call api list tag 2');

      }
    }

    loadTags2();
  }, [currentPageTag2, limitTag2, totalTag2]);

  const limitsTag2 = useCallback((e) => {
    setLimitTag2(e.target.value);
    setCurrentPageTag2(1);
  }, []);

  useEffect(() => {
    async function loadTags2Admin() {
      try {
        const response = await api.get('/me');
        setCurrentAdmin(response.data.role);

        const { data } = await api.get(`/tag2/pageAdmin?pageTag2Admin=${currentPageTag2Admin}&limitTag2Admin=${limitTag2Admin}`);
        setTotalTag2Admin(data?.totalTag2Admin);
        const totalPagesTag2Admin = Math.ceil(totalTag2Admin / limitTag2Admin);

        const arrayPagesTag2Admin = [];
        for (let i = 1; i <= totalPagesTag2Admin; i++) {
          arrayPagesTag2Admin.push(i);
        }

        setPagesTag2Admin(arrayPagesTag2Admin);
        setTags2Admin(data?.tags2Admin || []);

      } catch (error) {

        console.error(error);
        alert('Error call api list tag 2 Admin');

      }
    }

    loadTags2Admin();
  }, [currentPageTag2Admin, limitTag2Admin, totalTag2Admin]);

  const limitsTag2Admin = useCallback((e) => {
    setLimitTag2Admin(e.target.value);
    setCurrentPageTag2Admin(1);
  }, []);

  useEffect(() => {
    async function loadTags3() {
      try {
        const response = await api.get('/me');
        setCurrentAdmin(response.data.role);
        const name = response.data.name;

        const { data } = await api.get(`/tag3/page?pageTag3=${currentPageTag3}&limitTag3=${limitTag3}&name=${name}`);
        setTotalTag3(data?.totalTag3);
        const totalPagesTag3 = Math.ceil(totalTag3 / limitTag3);

        const arrayPagesTag3 = [];
        for (let i = 1; i <= totalPagesTag3; i++) {
          arrayPagesTag3.push(i);
        }

        setPagesTag3(arrayPagesTag3);
        setTags3(data?.tags3 || []);

      } catch (error) {

        console.error(error);
        alert('Error call api list tag 3');

      }
    }

    loadTags3();
  }, [currentPageTag3, limitTag3, totalTag3]);

  const limitsTag3 = useCallback((e) => {
    setLimitTag3(e.target.value);
    setCurrentPageTag3(1);
  }, []);

  useEffect(() => {
    async function loadTags3Admin() {
      try {
        const response = await api.get('/me');
        setCurrentAdmin(response.data.role);

        const { data } = await api.get(`/tag3/pageAdmin?pageTag3Admin=${currentPageTag3Admin}&limitTag3Admin=${limitTag3Admin}`);
        setTotalTag3Admin(data?.totalTag3Admin);
        const totalPagesTag3Admin = Math.ceil(totalTag3Admin / limitTag3Admin);

        const arrayPagesTag3Admin = [];
        for (let i = 1; i <= totalPagesTag3Admin; i++) {
          arrayPagesTag3Admin.push(i);
        }

        setPagesTag3Admin(arrayPagesTag3Admin);
        setTags3Admin(data?.tags3Admin || []);

      } catch (error) {

        console.error(error);
        alert('Error call api list tag 3 Admin');

      }
    }

    loadTags3Admin();
  }, [currentPageTag3Admin, limitTag3Admin, totalTag3Admin]);

  const limitsTag3Admin = useCallback((e) => {
    setLimitTag3Admin(e.target.value);
    setCurrentPageTag3Admin(1);
  }, []);

  useEffect(() => {
    async function loadTags4() {
      try {
        const response = await api.get('/me');
        setCurrentAdmin(response.data.role);
        const name = response.data.name;

        const { data } = await api.get(`/tag4/page?pageTag4=${currentPageTag4}&limitTag4=${limitTag4}&name=${name}`);
        setTotalTag4(data?.totalTag4);
        const totalPagesTag4 = Math.ceil(totalTag4 / limitTag4);

        const arrayPagesTag4 = [];
        for (let i = 1; i <= totalPagesTag4; i++) {
          arrayPagesTag4.push(i);
        }

        setPagesTag4(arrayPagesTag4);
        setTags4(data?.tags4 || []);

      } catch (error) {

        console.error(error);
        alert('Error call api list tag 4');

      }
    }

    loadTags4();
  }, [currentPageTag4, limitTag4, totalTag4]);

  const limitsTag4 = useCallback((e) => {
    setLimitTag4(e.target.value);
    setCurrentPageTag4(1);
  }, []);

  useEffect(() => {
    async function loadTags4Admin() {
      try {
        const response = await api.get('/me');
        setCurrentAdmin(response.data.role);

        const { data } = await api.get(`/tag4/pageAdmin?pageTag4Admin=${currentPageTag4Admin}&limitTag4Admin=${limitTag4Admin}`);
        setTotalTag4Admin(data?.totalTag4Admin);
        const totalPagesTag4Admin = Math.ceil(totalTag4Admin / limitTag4Admin);

        const arrayPagesTag4Admin = [];
        for (let i = 1; i <= totalPagesTag4Admin; i++) {
          arrayPagesTag4Admin.push(i);
        }

        setPagesTag4Admin(arrayPagesTag4Admin);
        setTags4Admin(data?.tags4Admin || []);

      } catch (error) {

        console.error(error);
        alert('Error call api list tag 4 Admin');

      }
    }

    loadTags4Admin();
  }, [currentPageTag4Admin, limitTag4Admin, totalTag4Admin]);

  const limitsTag4Admin = useCallback((e) => {
    setLimitTag4Admin(e.target.value);
    setCurrentPageTag4Admin(1);
  }, []);

  useEffect(() => {
    async function loadTags5() {
      try {
        const response = await api.get('/me');
        setCurrentAdmin(response.data.role);
        const name = response.data.name;

        const { data } = await api.get(`/tag5/page?pageTag5=${currentPageTag5}&limitTag5=${limitTag5}&name=${name}`);
        setTotalTag5(data?.totalTag5);
        const totalPagesTag5 = Math.ceil(totalTag5 / limitTag5);

        const arrayPagesTag5 = [];
        for (let i = 1; i <= totalPagesTag5; i++) {
          arrayPagesTag5.push(i);
        }

        setPagesTag5(arrayPagesTag5);
        setTags5(data?.tags5 || []);

      } catch (error) {

        console.error(error);
        alert('Error call api list tag 5');

      }
    }

    loadTags5();
  }, [currentPageTag5, limitTag5, totalTag5]);

  const limitsTag5 = useCallback((e) => {
    setLimitTag5(e.target.value);
    setCurrentPageTag5(1);
  }, []);

  useEffect(() => {
    async function loadTags5Admin() {
      try {
        const response = await api.get('/me');
        setCurrentAdmin(response.data.role);

        const { data } = await api.get(`/tag5/pageAdmin?pageTag5Admin=${currentPageTag5Admin}&limitTag5Admin=${limitTag5Admin}`);
        setTotalTag5Admin(data?.totalTag5Admin);
        const totalPagesTag5Admin = Math.ceil(totalTag5Admin / limitTag5Admin);

        const arrayPagesTag5Admin = [];
        for (let i = 1; i <= totalPagesTag5Admin; i++) {
          arrayPagesTag5Admin.push(i);
        }

        setPagesTag5Admin(arrayPagesTag5Admin);
        setTags5Admin(data?.tags5Admin || []);

      } catch (error) {

        console.error(error);
        alert('Error call api list tag 5 Admin');

      }
    }

    loadTags5Admin();
  }, [currentPageTag5Admin, limitTag5Admin, totalTag5Admin]);

  const limitsTag5Admin = useCallback((e) => {
    setLimitTag5Admin(e.target.value);
    setCurrentPageTag5Admin(1);
  }, []);

  async function handleRefreshCategory() {

    Router.reload();

  }

  async function handleRegisterTag(event: FormEvent) {
    event.preventDefault();

    try {
      const apiClient = setupAPIClient();

      if (tagName1 === '') {
        toast.warning('1º TAG cadastrado em branco!')
      } else {
        await apiClient.post('/tag1', {
          tagName1: tagName1,
          name: user.name
        })
        toast.success('1º TAG cadastrada com sucesso!')
      }

      if (tagName2 === '') {
        toast.warning('2º TAG cadastrado em branco!')
      } else {
        await apiClient.post('/tag2', {
          tagName2: tagName2,
          name: user.name
        })
        toast.success('2º TAG cadastrada com sucesso!')
      }

      if (tagName3 === '') {
        toast.warning('3º TAG cadastrado em branco!')
      } else {
        await apiClient.post('/tag3', {
          tagName3: tagName3,
          name: user.name
        })
        toast.success('3º TAG cadastrada com sucesso!')
      }

      if (tagName4 === '') {
        toast.warning('4º TAG cadastrado em branco!')
      } else {
        await apiClient.post('/tag4', {
          tagName4: tagName4,
          name: user.name
        })
        toast.success('4º TAG cadastrada com sucesso!')
      }

      if (tagName5 === '') {
        toast.warning('5º TAG cadastrado em branco!')
      } else {
        await apiClient.post('/tag5', {
          tagName5: tagName5,
          name: user.name
        })
        toast.success('5º TAG cadastrada com sucesso!')
      }

      toast.success('Grupo de TAGs cadastrada com sucesso!')

      setTagName1('');
      setTagName2('');
      setTagName3('');
      setTagName4('');
      setTagName5('');

      handleRefreshCategory()

    } catch (error) {

      console.log(error);
      toast.error('Ops problemas ao cadastrar as TAGs!')

    }
  }



  return (
    <>
      <Head>
        <title>TAGs - Builder Seu Negócio Online</title>
      </Head>
      <main className={styles.containerMain}>

        <HeaderPainel />

        <section className={styles.container}>

          <Link href={'/dashboard'}>
            <BsFillArrowLeftSquareFill className={styles.return} size={30} />
          </Link>

          <h1>Cadastrar grupos de TAGs (palavras chaves)</h1>

          <form className={styles.form} onSubmit={handleRegisterTag}>
            <input
              type="text"
              placeholder="Digite 1º TAG"
              className={styles.input}
              value={tagName1}
              onChange={(e) => setTagName1(e.target.value)}
            />

            <input
              type="text"
              placeholder="Digite 2º TAG"
              className={styles.input}
              value={tagName2}
              onChange={(e) => setTagName2(e.target.value)}
            />

            <input
              type="text"
              placeholder="Digite 3º TAG"
              className={styles.input}
              value={tagName3}
              onChange={(e) => setTagName3(e.target.value)}
            />

            <input
              type="text"
              placeholder="Digite 4º TAG"
              className={styles.input}
              value={tagName4}
              onChange={(e) => setTagName4(e.target.value)}
            />

            <input
              type="text"
              placeholder="Digite 5º TAG"
              className={styles.input}
              value={tagName5}
              onChange={(e) => setTagName5(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar TAGs
            </button>

          </form>

          {currentAdmin != roleADMIN && (
            <h3>Abaixo suas TAG's que cadastrou.</h3>
          )}

          {currentAdmin === roleADMIN && (
            <h3>Abaixo TAG's cadastradas.</h3>
          )}

          <br />

          <button className={styles.buttonRefresh} onClick={handleRefreshCategory}>
            <FiRefreshCcw className={styles.refresh} size={22} />Atualizar Lista de TAGs
          </button>





          {currentAdmin != roleADMIN && (
            <div className={styles.sectionBoxTags}>

              <div className={styles.tagsBox}>

                <div className={styles.selectBox}>

                  <h5>Total do 1º grupo de TAGs por página</h5>

                  <select onChange={limitsTag1}>
                    <option value="3">3</option>
                    <option value="7">7</option>
                    <option value="10">10</option>
                    <option value="999999">Todas</option>
                  </select>

                </div>

                {tags1.length > 0 && (
                  <h4>Clique sobre uma TAG para atualiza-la.</h4>
                )}

                {tags1.length === 0 && (
                  <span className={styles.emptyList}>
                    Nenhuma TAG do grupo 1 cadastrada...
                  </span>
                )}

                <div className={styles.tagsSectionMain}>
                  <div className={styles.tagsSection}>
                    {tags1.map((tag1s) => {
                      return (
                        <>
                          <div className={styles.tagBox}>
                            <div className={styles.tag} key={tag1s.id}>
                              <Link className={styles.nameTag} href={`/tag1Update?tag1_id=${tag1s.id}`}>
                                <div className={styles.listTags}>
                                  <div className={styles.nameTag}>{tag1s?.tagName1}</div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>

                  <div className={styles.containerPagination}>
                    <div className={styles.totalTags}>
                      <span>Total de TAGs no 1º grupo: {totalTag1}</span>
                    </div>

                    <div className={styles.containerTagsPages}>
                      {currentPageTag1 > 1 && (
                        <div className={styles.previus}>
                          <button onClick={() => setCurrentPageTag1(currentPageTag1 - 1)}>
                            Voltar
                          </button>
                        </div>
                      )}

                      {currentPageTag1 < tags1.length && (
                        <div className={styles.next}>
                          <button onClick={() => setCurrentPageTag1(currentPageTag1 + 1)}>
                            Avançar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.tagsBox}>

                <div className={styles.selectBox}>

                  <h5>Total do 2º grupo de TAGs por página</h5>

                  <select onChange={limitsTag2}>
                    <option value="3">3</option>
                    <option value="7">7</option>
                    <option value="10">10</option>
                    <option value="999999">Todas</option>
                  </select>

                </div>

                {tags2.length > 0 && (
                  <h4>Clique sobre uma TAG para atualiza-la.</h4>
                )}

                {tags2.length === 0 && (
                  <span className={styles.emptyList}>
                    Nenhuma TAG do grupo 2 cadastrada...
                  </span>
                )}

                <div className={styles.tagsSectionMain}>
                  <div className={styles.tagsSection}>
                    {tags2.map((tag2s) => {
                      return (
                        <>
                          <div className={styles.tagBox}>
                            <div className={styles.tag} key={tag2s.id}>
                              <Link className={styles.nameTag} href={`/tag2Update?tag2_id=${tag2s.id}`}>
                                <div className={styles.listTags}>
                                  <div className={styles.nameTag}>{tag2s?.tagName2}</div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>

                  <div className={styles.containerPagination}>
                    <div className={styles.totalTags}>
                      <span>Total de TAGs no 2º grupo: {totalTag2}</span>
                    </div>

                    <div className={styles.containerTagsPages}>
                      {currentPageTag2 > 1 && (
                        <div className={styles.previus}>
                          <button onClick={() => setCurrentPageTag2(currentPageTag2 - 1)}>
                            Voltar
                          </button>
                        </div>
                      )}

                      {currentPageTag2 < tags2.length && (
                        <div className={styles.next}>
                          <button onClick={() => setCurrentPageTag2(currentPageTag2 + 1)}>
                            Avançar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.tagsBox}>

                <div className={styles.selectBox}>

                  <h5>Total do 3º grupo de TAGs por página</h5>

                  <select onChange={limitsTag3}>
                    <option value="3">3</option>
                    <option value="7">7</option>
                    <option value="10">10</option>
                    <option value="999999">Todas</option>
                  </select>

                </div>

                {tags3.length > 0 && (
                  <h4>Clique sobre uma TAG para atualiza-la.</h4>
                )}

                {tags3.length === 0 && (
                  <span className={styles.emptyList}>
                    Nenhuma TAG do grupo 3 cadastrada...
                  </span>
                )}

                <div className={styles.tagsSectionMain}>
                  <div className={styles.tagsSection}>
                    {tags3.map((tag3s) => {
                      return (
                        <>
                          <div className={styles.tagBox}>
                            <div className={styles.tag} key={tag3s.id}>
                              <Link className={styles.nameTag} href={`/tag3Update?tag3_id=${tag3s.id}`}>
                                <div className={styles.listTags}>
                                  <div className={styles.nameTag}>{tag3s?.tagName3}</div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>

                  <div className={styles.containerPagination}>
                    <div className={styles.totalTags}>
                      <span>Total de TAGs no 3º grupo: {totalTag3}</span>
                    </div>

                    <div className={styles.containerTagsPages}>
                      {currentPageTag3 > 1 && (
                        <div className={styles.previus}>
                          <button onClick={() => setCurrentPageTag3(currentPageTag3 - 1)}>
                            Voltar
                          </button>
                        </div>
                      )}

                      {currentPageTag3 < tags3.length && (
                        <div className={styles.next}>
                          <button onClick={() => setCurrentPageTag3(currentPageTag3 + 1)}>
                            Avançar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.tagsBox}>

                <div className={styles.selectBox}>

                  <h5>Total do 4º grupo de TAGs por página</h5>

                  <select onChange={limitsTag4}>
                    <option value="3">3</option>
                    <option value="7">7</option>
                    <option value="10">10</option>
                    <option value="999999">Todas</option>
                  </select>

                </div>

                {tags4.length > 0 && (
                  <h4>Clique sobre uma TAG para atualiza-la.</h4>
                )}

                {tags4.length === 0 && (
                  <span className={styles.emptyList}>
                    Nenhuma TAG do grupo 4 cadastrada...
                  </span>
                )}

                <div className={styles.tagsSectionMain}>
                  <div className={styles.tagsSection}>
                    {tags4.map((tag4s) => {
                      return (
                        <>
                          <div className={styles.tagBox}>
                            <div className={styles.tag} key={tag4s.id}>
                              <Link className={styles.nameTag} href={`/tag4Update?tag4_id=${tag4s.id}`}>
                                <div className={styles.listTags}>
                                  <div className={styles.nameTag}>{tag4s?.tagName4}</div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>

                  <div className={styles.containerPagination}>
                    <div className={styles.totalTags}>
                      <span>Total de TAGs no 4º grupo: {totalTag4}</span>
                    </div>

                    <div className={styles.containerTagsPages}>
                      {currentPageTag4 > 1 && (
                        <div className={styles.previus}>
                          <button onClick={() => setCurrentPageTag4(currentPageTag4 - 1)}>
                            Voltar
                          </button>
                        </div>
                      )}

                      {currentPageTag4 < tags4.length && (
                        <div className={styles.next}>
                          <button onClick={() => setCurrentPageTag4(currentPageTag4 + 1)}>
                            Avançar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.tagsBox}>

                <div className={styles.selectBox}>

                  <h5>Total do 5º grupo de TAGs por página</h5>

                  <select onChange={limitsTag5}>
                    <option value="3">3</option>
                    <option value="7">7</option>
                    <option value="10">10</option>
                    <option value="999999">Todas</option>
                  </select>

                </div>

                {tags5.length > 0 && (
                  <h4>Clique sobre uma TAG para atualiza-la.</h4>
                )}

                {tags5.length === 0 && (
                  <span className={styles.emptyList}>
                    Nenhuma TAG do grupo 5 cadastrada...
                  </span>
                )}

                <div className={styles.tagsSectionMain}>
                  <div className={styles.tagsSection}>
                    {tags5.map((tag5s) => {
                      return (
                        <>
                          <div className={styles.tagBox}>
                            <div className={styles.tag} key={tag5s.id}>
                              <Link className={styles.nameTag} href={`/tag5Update?tag5_id=${tag5s.id}`}>
                                <div className={styles.listTags}>
                                  <div className={styles.nameTag}>{tag5s?.tagName5}</div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>

                  <div className={styles.containerPagination}>
                    <div className={styles.totalTags}>
                      <span>Total de TAGs no 5º grupo: {totalTag5}</span>
                    </div>

                    <div className={styles.containerTagsPages}>
                      {currentPageTag5 > 1 && (
                        <div className={styles.previus}>
                          <button onClick={() => setCurrentPageTag5(currentPageTag5 - 1)}>
                            Voltar
                          </button>
                        </div>
                      )}

                      {currentPageTag5 < tags5.length && (
                        <div className={styles.next}>
                          <button onClick={() => setCurrentPageTag5(currentPageTag5 + 1)}>
                            Avançar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}







          {currentAdmin === roleADMIN && (
            <div className={styles.sectionBoxTags}>

              <div className={styles.tagsBox}>

                <div className={styles.selectBox}>

                  <h5>Total do 1º grupo de TAGs por página</h5>

                  <select onChange={limitsTag1Admin}>
                    <option value="3">3</option>
                    <option value="7">7</option>
                    <option value="10">10</option>
                    <option value="999999">Todas</option>
                  </select>

                </div>

                {tags1Admin.length > 0 && (
                  <h4>Clique sobre uma TAG para atualiza-la.</h4>
                )}

                {tags1Admin.length === 0 && (
                  <span className={styles.emptyList}>
                    Nenhuma TAG do grupo 1 cadastrada...
                  </span>
                )}

                <div className={styles.tagsSectionMain}>
                  <div className={styles.tagsSection}>
                    {tags1Admin.map((adminTag1s) => {
                      return (
                        <>
                          <div className={styles.tagBox}>
                            <div className={styles.tag} key={adminTag1s.id}>
                              <Link className={styles.nameTag} href={`/tag1Update?tag1_id=${adminTag1s.id}`}>
                                <div className={styles.listTags}>
                                  <div className={styles.nameTag}>{adminTag1s?.tagName1}</div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>

                  <div className={styles.containerPagination}>
                    <div className={styles.totalTags}>
                      <span>Total de TAGs no 1º grupo: {totalTag1Admin}</span>
                    </div>

                    <div className={styles.containerTagsPages}>
                      {currentPageTag1Admin > 1 && (
                        <div className={styles.previus}>
                          <button onClick={() => setCurrentPageTag1Admin(currentPageTag1Admin - 1)}>
                            Voltar
                          </button>
                        </div>
                      )}

                      {currentPageTag1Admin < tags1Admin.length && (
                        <div className={styles.next}>
                          <button onClick={() => setCurrentPageTag1Admin(currentPageTag1Admin + 1)}>
                            Avançar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.tagsBox}>

                <div className={styles.selectBox}>

                  <h5>Total do 2º grupo de TAGs por página</h5>

                  <select onChange={limitsTag2Admin}>
                    <option value="3">3</option>
                    <option value="7">7</option>
                    <option value="10">10</option>
                    <option value="999999">Todas</option>
                  </select>

                </div>

                {tags2Admin.length > 0 && (
                  <h4>Clique sobre uma TAG para atualiza-la.</h4>
                )}

                {tags2Admin.length === 0 && (
                  <span className={styles.emptyList}>
                    Nenhuma TAG do grupo 2 cadastrada...
                  </span>
                )}

                <div className={styles.tagsSectionMain}>
                  <div className={styles.tagsSection}>
                    {tags2Admin.map((adminTag2s) => {
                      return (
                        <>
                          <div className={styles.tagBox}>
                            <div className={styles.tag} key={adminTag2s.id}>
                              <Link className={styles.nameTag} href={`/tag2Update?tag2_id=${adminTag2s.id}`}>
                                <div className={styles.listTags}>
                                  <div className={styles.nameTag}>{adminTag2s?.tagName2}</div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>

                  <div className={styles.containerPagination}>
                    <div className={styles.totalTags}>
                      <span>Total de TAGs no 2º grupo: {totalTag2Admin}</span>
                    </div>

                    <div className={styles.containerTagsPages}>
                      {currentPageTag2Admin > 1 && (
                        <div className={styles.previus}>
                          <button onClick={() => setCurrentPageTag2Admin(currentPageTag2Admin - 1)}>
                            Voltar
                          </button>
                        </div>
                      )}

                      {currentPageTag2Admin < tags2Admin.length && (
                        <div className={styles.next}>
                          <button onClick={() => setCurrentPageTag2Admin(currentPageTag2Admin + 1)}>
                            Avançar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.tagsBox}>

                <div className={styles.selectBox}>

                  <h5>Total do 3º grupo de TAGs por página</h5>

                  <select onChange={limitsTag3Admin}>
                    <option value="3">3</option>
                    <option value="7">7</option>
                    <option value="10">10</option>
                    <option value="999999">Todas</option>
                  </select>

                </div>

                {tags3Admin.length > 0 && (
                  <h4>Clique sobre uma TAG para atualiza-la.</h4>
                )}

                {tags3Admin.length === 0 && (
                  <span className={styles.emptyList}>
                    Nenhuma TAG do grupo 3 cadastrada...
                  </span>
                )}

                <div className={styles.tagsSectionMain}>
                  <div className={styles.tagsSection}>
                    {tags3Admin.map((adminTag3s) => {
                      return (
                        <>
                          <div className={styles.tagBox}>
                            <div className={styles.tag} key={adminTag3s.id}>
                              <Link className={styles.nameTag} href={`/tag3Update?tag3_id=${adminTag3s.id}`}>
                                <div className={styles.listTags}>
                                  <div className={styles.nameTag}>{adminTag3s?.tagName3}</div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>

                  <div className={styles.containerPagination}>
                    <div className={styles.totalTags}>
                      <span>Total de TAGs no 3º grupo: {totalTag3Admin}</span>
                    </div>

                    <div className={styles.containerTagsPages}>
                      {currentPageTag3Admin > 1 && (
                        <div className={styles.previus}>
                          <button onClick={() => setCurrentPageTag3Admin(currentPageTag3Admin - 1)}>
                            Voltar
                          </button>
                        </div>
                      )}

                      {currentPageTag3Admin < tags3Admin.length && (
                        <div className={styles.next}>
                          <button onClick={() => setCurrentPageTag3Admin(currentPageTag3Admin + 1)}>
                            Avançar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.tagsBox}>

                <div className={styles.selectBox}>

                  <h5>Total do 4º grupo de TAGs por página</h5>

                  <select onChange={limitsTag4Admin}>
                    <option value="3">3</option>
                    <option value="7">7</option>
                    <option value="10">10</option>
                    <option value="999999">Todas</option>
                  </select>

                </div>

                {tags4Admin.length > 0 && (
                  <h4>Clique sobre uma TAG para atualiza-la.</h4>
                )}

                {tags4Admin.length === 0 && (
                  <span className={styles.emptyList}>
                    Nenhuma TAG do grupo 4 cadastrada...
                  </span>
                )}

                <div className={styles.tagsSectionMain}>
                  <div className={styles.tagsSection}>
                    {tags4Admin.map((adminTag4s) => {
                      return (
                        <>
                          <div className={styles.tagBox}>
                            <div className={styles.tag} key={adminTag4s.id}>
                              <Link className={styles.nameTag} href={`/tag4Update?tag4_id=${adminTag4s.id}`}>
                                <div className={styles.listTags}>
                                  <div className={styles.nameTag}>{adminTag4s?.tagName4}</div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>

                  <div className={styles.containerPagination}>
                    <div className={styles.totalTags}>
                      <span>Total de TAGs no 4º grupo: {totalTag4Admin}</span>
                    </div>

                    <div className={styles.containerTagsPages}>
                      {currentPageTag4Admin > 1 && (
                        <div className={styles.previus}>
                          <button onClick={() => setCurrentPageTag4Admin(currentPageTag4Admin - 1)}>
                            Voltar
                          </button>
                        </div>
                      )}

                      {currentPageTag4Admin < tags4Admin.length && (
                        <div className={styles.next}>
                          <button onClick={() => setCurrentPageTag4Admin(currentPageTag4Admin + 1)}>
                            Avançar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.tagsBox}>

                <div className={styles.selectBox}>

                  <h5>Total do 5º grupo de TAGs por página</h5>

                  <select onChange={limitsTag5Admin}>
                    <option value="3">3</option>
                    <option value="7">7</option>
                    <option value="10">10</option>
                    <option value="999999">Todas</option>
                  </select>

                </div>

                {tags5Admin.length > 0 && (
                  <h4>Clique sobre uma TAG para atualiza-la.</h4>
                )}

                {tags5Admin.length === 0 && (
                  <span className={styles.emptyList}>
                    Nenhuma TAG do grupo 5 cadastrada...
                  </span>
                )}

                <div className={styles.tagsSectionMain}>
                  <div className={styles.tagsSection}>
                    {tags5Admin.map((adminTag5s) => {
                      return (
                        <>
                          <div className={styles.tagBox}>
                            <div className={styles.tag} key={adminTag5s.id}>
                              <Link className={styles.nameTag} href={`/tag5Update?tag5_id=${adminTag5s.id}`}>
                                <div className={styles.listTags}>
                                  <div className={styles.nameTag}>{adminTag5s?.tagName5}</div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>

                  <div className={styles.containerPagination}>
                    <div className={styles.totalTags}>
                      <span>Total de TAGs no 5º grupo: {totalTag5Admin}</span>
                    </div>

                    <div className={styles.containerTagsPages}>
                      {currentPageTag5Admin > 1 && (
                        <div className={styles.previus}>
                          <button onClick={() => setCurrentPageTag5Admin(currentPageTag5Admin - 1)}>
                            Voltar
                          </button>
                        </div>
                      )}

                      {currentPageTag5Admin < tags5Admin.length && (
                        <div className={styles.next}>
                          <button onClick={() => setCurrentPageTag5Admin(currentPageTag5Admin + 1)}>
                            Avançar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <section className={styles.allCategorysSection}>
            <h3>Abaixo, todas as TAG's disponiveis para uso em seus artigos.</h3>
            <br />
            <div className={styles.allCategorys}>
              {allTags1.map((all1) => {
                return (
                  <>
                    <div key={all1.id} className={styles.allCategorysBox}>
                      <span>{all1?.tagName1}</span>
                    </div>
                  </>
                )
              })}

              {allTags2.map((all2) => {
                return (
                  <>
                    <div key={all2.id} className={styles.allCategorysBox}>
                      <span>{all2?.tagName2}</span>
                    </div>
                  </>
                )
              })}

              {allTags3.map((all3) => {
                return (
                  <>
                    <div key={all3.id} className={styles.allCategorysBox}>
                      <span>{all3?.tagName3}</span>
                    </div>
                  </>
                )
              })}

              {allTags4.map((all4) => {
                return (
                  <>
                    <div key={all4.id} className={styles.allCategorysBox}>
                      <span>{all4?.tagName4}</span>
                    </div>
                  </>
                )
              })}

              {allTags5.map((all5) => {
                return (
                  <>
                    <div key={all5.id} className={styles.allCategorysBox}>
                      <span>{all5?.tagName5}</span>
                    </div>
                  </>
                )
              })}
            </div>
          </section>
        </section>
        <br />
        <br />
        <br />
        <br />
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
import React, { useState, FormEvent, useEffect, useCallback } from 'react'
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



export default function NewsTags() {

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

  //-- PAGE TAG 2
  const [tags2, setTags2] = useState([]);
  const [totalTag2, setTotalTag2] = useState(0);
  const [limitTag2, setLimitTag2] = useState(3);
  const [pagesTag2, setPagesTag2] = useState([]);
  const [currentPageTag2, setCurrentPageTag2] = useState(1);

  //-- PAGE TAG 3
  const [tags3, setTags3] = useState([]);
  const [totalTag3, setTotalTag3] = useState(0);
  const [limitTag3, setLimitTag3] = useState(3);
  const [pagesTag3, setPagesTag3] = useState([]);
  const [currentPageTag3, setCurrentPageTag3] = useState(1);

  //-- PAGE TAG 4
  const [tags4, setTags4] = useState([]);
  const [totalTag4, setTotalTag4] = useState(0);
  const [limitTag4, setLimitTag4] = useState(3);
  const [pagesTag4, setPagesTag4] = useState([]);
  const [currentPageTag4, setCurrentPageTag4] = useState(1);

  //-- PAGE TAG 5
  const [tags5, setTags5] = useState([]);
  const [totalTag5, setTotalTag5] = useState(0);
  const [limitTag5, setLimitTag5] = useState(3);
  const [pagesTag5, setPagesTag5] = useState([]);
  const [currentPageTag5, setCurrentPageTag5] = useState(1);



  useEffect(() => {
    async function loadTags1() {
      try {
        const { data } = await api.get(`/tag1/page?pageTag1=${currentPageTag1}&limitTag1=${limitTag1}`);
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
    async function loadTags2() {
      try {
        const { data } = await api.get(`/tag2/page?pageTag2=${currentPageTag2}&limitTag2=${limitTag2}`);
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
    async function loadTags3() {
      try {
        const { data } = await api.get(`/tag3/page?pageTag3=${currentPageTag3}&limitTag3=${limitTag3}`);
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
    async function loadTags4() {
      try {
        const { data } = await api.get(`/tag4/page?pageTag4=${currentPageTag4}&limitTag4=${limitTag4}`);
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
    async function loadTags5() {
      try {
        const { data } = await api.get(`/tag5/page?pageTag5=${currentPageTag5}&limitTag5=${limitTag5}`);
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



  async function handleRegisterTag(event: FormEvent) {
    event.preventDefault();

    try {
      const apiClient = setupAPIClient();

      if (tagName1 === '') {
        toast.warning('1º TAG cadastrado em branco!')
      } else {
        await apiClient.post('/tag1', {
          tagName1: tagName1
        })
        toast.success('1º TAG cadastrada com sucesso!')
      }

      if (tagName2 === '') {
        toast.warning('2º TAG cadastrado em branco!')
      } else {
        await apiClient.post('/tag2', {
          tagName2: tagName2
        })
        toast.success('2º TAG cadastrada com sucesso!')
      }

      if (tagName3 === '') {
        toast.warning('3º TAG cadastrado em branco!')
      } else {
        await apiClient.post('/tag3', {
          tagName3: tagName3
        })
        toast.success('3º TAG cadastrada com sucesso!')
      }

      if (tagName4 === '') {
        toast.warning('4º TAG cadastrado em branco!')
      } else {
        await apiClient.post('/tag4', {
          tagName4: tagName4
        })
        toast.success('4º TAG cadastrada com sucesso!')
      }

      if (tagName5 === '') {
        toast.warning('5º TAG cadastrado em branco!')
      } else {
        await apiClient.post('/tag5', {
          tagName5: tagName5
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

  async function handleRefreshCategory() {
    const apiClient = setupAPIClient();

    const response1 = await apiClient.get('/tag1')
    const response2 = await apiClient.get('/tag2')
    const response3 = await apiClient.get('/tag3')
    const response4 = await apiClient.get('/tag4')
    const response5 = await apiClient.get('/tag5')

    setTags1(response1.data)
    setTags2(response2.data)
    setTags3(response3.data)
    setTags4(response4.data)
    setTags5(response5.data)
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

          <h3>TAGs cadastradas</h3>

          <br />
          <br />

          <button className={styles.buttonRefresh} onClick={handleRefreshCategory}>
            <FiRefreshCcw className={styles.refresh} size={22} />Atualizar Lista de TAGs
          </button>

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
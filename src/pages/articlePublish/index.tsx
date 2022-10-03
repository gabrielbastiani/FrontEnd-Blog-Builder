import React, { useCallback, useState } from 'react'
import Head from "next/head"
import styles from './style.module.scss';
import { useRouter } from 'next/router'
import Router from 'next/router'
import { Button } from '../../components/ui/Button/index';
import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupAPIClient } from '../../services/api'
import Link from '../../../node_modules/next/link';
import { toast } from 'react-toastify'
import moment from 'moment';


export default function ArticlePublish() {

    const router = useRouter();

    const [days, setDays] = useState('01');
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [month, setMonth] = useState('01');
    const [year, setYear] = useState('2050');

    const [hourNow, setHourNow] = useState(Number);
    const [minuteNow, setMinuteNow] = useState(Number);
    const [secondNow, setSecondNow] = useState(Number);


    async function handleArticlePublish() {
        try {
            const apiClient = setupAPIClient();
            const article_id = router.query.article_id
            await apiClient.put(`/article/cron?article_id=${article_id}`)
            toast.success('Artigo publicado com sucesso no blog.')

            Router.push('/dashboard')

        } catch (err) {
            toast.error('Ops erro ao publicar no blog')
        }
    }

    const hoje = new Date();
    const dia = hoje.getDate().toString().padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;

    const getHours = () => {
        const date = new Date()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        const hourNow = hours < 10 ? `0${hours}` : hours
        const minuteNow = minutes < 10 ? `0${minutes}` : minutes
        const secondNow = seconds < 10 ? `0${seconds}` : seconds

        setHourNow(hourNow);
        setMinuteNow(minuteNow);
        setSecondNow(secondNow);

    }

    setInterval(() => {
        getHours()
    }, 1000)


    const countDownDate = new moment(Date()).format(`${days}/${month}/${year} ${hours}:${minutes}`);

    const publishedArticle = setInterval(function () {

        const now = new moment(Date()).format('DD/MM/YYYY HH:mm');

        if (countDownDate === now) {
            clearInterval(publishedArticle);
            handleArticlePublish();
        }
    }, 1000);


    const months = useCallback((e) => {
        setMonth(e.target.value);
    }, []);

    const day = useCallback((e) => {
        setDays(e.target.value);
    }, []);

    const years = useCallback((e) => {
        setYear(e.target.value);
    }, []);

    const hour = useCallback((e) => {
        setHours(e.target.value);
    }, []);

    const minute = useCallback((e) => {
        setMinutes(e.target.value);
    }, []);


    return (
        <>

            <Head>
                <title>Publicar Artigo - Builder Seu Negócio Online</title>
            </Head>

            <main className={styles.container}>

                <section className={styles.containerContent}>

                    <h2>Deseja mesmo publicar esse artigo no blog?</h2>

                    <section className={styles.sectionDates}>

                        <div className={styles.boxClock}>

                            <p>Aqui você pode programar a publicação desse artigo</p>

                            <br />

                            <p>Data que será publicado o artigo</p>

                            <br />

                            <span>{hourNow}:{minuteNow}:{secondNow}</span>&nbsp;-&nbsp;
                            <span>{dataAtual}/</span>

                            <br />

                            <div className={styles.clock}>
                                <span>{hours}</span>:
                                <span>{minutes}</span>&nbsp;&nbsp;-&nbsp;&nbsp;
                                <span>{days}</span>/
                                <span>{month}</span>/
                                <span>{year}</span>
                            </div>

                        </div>

                        <br />

                        <div className={styles.boxDates}>

                            <div className={styles.hour}>

                                <span>Hora:</span>

                                <select onChange={hour}>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="00">00</option>
                                </select>
                            </div>

                            <div className={styles.minute}>

                                <span>Minuto:</span>

                                <select onChange={minute}>
                                    <option value="00">00</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                    <option value="32">32</option>
                                    <option value="33">33</option>
                                    <option value="34">34</option>
                                    <option value="35">35</option>
                                    <option value="36">36</option>
                                    <option value="37">37</option>
                                    <option value="38">38</option>
                                    <option value="39">39</option>
                                    <option value="40">40</option>
                                    <option value="41">41</option>
                                    <option value="42">42</option>
                                    <option value="43">43</option>
                                    <option value="44">44</option>
                                    <option value="45">45</option>
                                    <option value="46">46</option>
                                    <option value="47">47</option>
                                    <option value="48">48</option>
                                    <option value="49">49</option>
                                    <option value="50">50</option>
                                    <option value="51">51</option>
                                    <option value="52">52</option>
                                    <option value="53">53</option>
                                    <option value="54">54</option>
                                    <option value="55">55</option>
                                    <option value="56">56</option>
                                    <option value="57">57</option>
                                    <option value="58">58</option>
                                    <option value="59">59</option>
                                    <option value="60">60</option>
                                </select>
                            </div>

                            <div className={styles.day}>

                                <span>Dia:</span>

                                <select onChange={day}>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                            </div>

                            <div className={styles.months}>

                                <span>Mês:</span>

                                <select onChange={months}>
                                    <option value="01">Janeiro</option>
                                    <option value="02">Fevereiro</option>
                                    <option value="03">Março</option>
                                    <option value="04">Abril</option>
                                    <option value="05">Maio</option>
                                    <option value="06">Junho</option>
                                    <option value="07">Julho</option>
                                    <option value="08">Agosto</option>
                                    <option value="09">Setembro</option>
                                    <option value="10">Outubro</option>
                                    <option value="11">Novembro</option>
                                    <option value="12">Dezembro</option>
                                </select>
                            </div>

                            <div className={styles.years}>

                                <span>Ano:</span>

                                <select onChange={years}>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                    <option value="2031">2031</option>
                                    <option value="2032">2032</option>
                                    <option value="2033">2033</option>
                                    <option value="2034">2034</option>
                                    <option value="2035">2035</option>
                                    <option value="2036">2036</option>
                                    <option value="2037">2037</option>
                                    <option value="2038">2038</option>
                                    <option value="2039">2039</option>
                                    <option value="2040">2040</option>
                                    <option value="2041">2041</option>
                                    <option value="2042">2042</option>
                                    <option value="2043">2043</option>
                                    <option value="2044">2044</option>
                                    <option value="2045">2045</option>
                                    <option value="2046">2046</option>
                                    <option value="2047">2047</option>
                                    <option value="2048">2048</option>
                                    <option value="2049">2049</option>
                                    <option value="2050">2050</option>
                                </select>
                            </div>

                        </div>

                        <div className={styles.buttonProgram}>
                            <Link href={'/dashboard'}>
                                <Button
                                    className={styles.buttonUpdate}
                                >
                                    Ativar programação
                                </Button>
                            </Link>
                        </div>

                    </section>

                    <Button
                        className={styles.buttonUpdate}
                        onClick={() => handleArticlePublish()}
                    >
                        Publicar Agora
                    </Button>

                    <Link href={'/dashboard'}>
                        <Button
                            className={styles.buttonUpdate}
                        >
                            Cancelar
                        </Button>
                    </Link>

                </section>

            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    return {
        props: {}
    }
})
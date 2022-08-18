

import Head from '../../../node_modules/next/head'
import { FooterBlog } from '../../components/FooterBlog/index'
import { HeaderBlog } from '../../components/HeaderBlog/index'
import styles from './styles.module.scss'


export default function PoliticasDePrivacidade(){


    return(
        <>
            <Head>
                <title>Politicas de Privacidade - Blog Builder Seu Negócio Online</title>
            </Head>
            <main>
                <HeaderBlog />

                <section>
                    <h1>Politicas de Privacidade</h1>
                </section>
            </main>
            <FooterBlog />
        </>
    )
}
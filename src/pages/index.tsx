import Head from 'next/head'
import { FooterBlog } from '../components/FooterBlog/index'
import { HeaderBlog } from '../components/HeaderBlog/index'
import styles from '../../styles/home.module.scss'

export default function Home() {
  return (
    <>
    <Head>
      <title>Blog Builder Seu Negócio Online - Home</title>
    </Head>
    <main>
      <HeaderBlog />
      <h1>BLOG</h1>
    </main>
    <FooterBlog/>
    </>
  )
}
import Head from 'next/head'
import { FooterBlog } from '../components/FooterBlog/index'
import { HeaderBlog } from '../components/HeaderBlog/index'
import { ArticleHome } from '../components/ArticlesHome/index'
import { SearchBar } from '../components/SearchBar/index'
import styles from '../../styles/home.module.scss'

export default function Home() {




  return (
    <>
      <Head>
        <title>Blog Builder Seu Negócio Online - Home</title>
      </Head>
      <main>
        <HeaderBlog />
        <section className={styles.sectionContent}>
          <nav>
            <SearchBar />
          </nav>
          <article>
            <ArticleHome />
          </article>
        </section>

      </main>
      <FooterBlog />
    </>
  )
}
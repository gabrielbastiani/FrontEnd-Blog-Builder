import Head from 'next/head'
import { FooterBlog } from '../components/FooterBlog/index'
import { HeaderBlog } from '../components/HeaderBlog/index'
import { ArticleHome } from '../components/ArticlesHome/index'
import { SearchBar } from '../components/SearchBar/index'
import { RecentPosts } from '../components/RecentPosts/index'
import styles from '../../styles/home.module.scss'
import { Newslatter } from '../components/Newslatter/index'

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
            <RecentPosts />
          </nav>
          <article>
            <Newslatter />
            <ArticleHome />
          </article>
        </section>

      </main>
      <FooterBlog />
    </>
  )
}
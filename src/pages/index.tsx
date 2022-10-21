import Head from 'next/head'
import { FooterBlog } from '../components/FooterBlog/index'
import { HeaderBlog } from '../components/HeaderBlog/index'
import { ArticleHome } from '../components/ArticlesHome/index'
import { SearchBar } from '../components/SearchBar/index'
import { RecentPosts } from '../components/RecentPosts/index'
import styles from '../../styles/home.module.scss'
import { Newslatter } from '../components/Newslatter/index'
import { Ads } from '../components/Ads/index'
import { AdsFooter } from '../components/AdsFooter/index'


export default function Home() {

  return (
    <>
      <Head>
        <title>Blog Builder Seu Negócio Online - Home</title>
      </Head>
      <main className={styles.mainContent}>
        <HeaderBlog />
        <section className={styles.sectionContent}>
          <nav>
            <SearchBar />
            <RecentPosts />
            <br />
            <Ads />
          </nav>
          <article>
            <Newslatter />
            <ArticleHome />
            <AdsFooter />
          </article>
        </section>
        
      </main>
      <FooterBlog />
    </>
  )
}
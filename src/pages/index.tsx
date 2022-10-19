import Head from 'next/head'
import { FooterBlog } from '../components/FooterBlog/index'
import { HeaderBlog } from '../components/HeaderBlog/index'
import { ArticleHome } from '../components/ArticlesHome/index'
import { SearchBar } from '../components/SearchBar/index'
import { RecentPosts } from '../components/RecentPosts/index'
import styles from '../../styles/home.module.scss'
import { Newslatter } from '../components/Newslatter/index'
import CookieConsent from "react-cookie-consent";


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
          </nav>
          <article>
            <Newslatter />
            <ArticleHome />
          </article>
        </section>
        <CookieConsent
            location="bottom"
            buttonText="Aceito"
            declineButtonText="Não aceito"
            cookieName="myAwesomeCookieName2"
            style={{ background: "var(--orange)" }}
            buttonStyle={{ color: "var(--white)", fontSize: "15px", background: "var(--black)" }}
            expires={150}
            enableDeclineButton
            onDecline={() => {
              /* alert("nay!"); */
            }}
          >
            Este site usa cookies para melhorar a experiência do usuário.{" "}
        </CookieConsent>
      </main>
      <FooterBlog />
    </>
  )
}
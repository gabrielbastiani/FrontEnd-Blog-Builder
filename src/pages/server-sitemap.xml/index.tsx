import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { api } from '../../services/apiClient'; // Importar a api que cria as páginas dinamicas. Method to source urls from cms

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Vou pegar os primeiros 100 posts do meu blog
  const allPosts = await api.get('/article', { per_page: 100 })

 const articles = allPosts.data;

 console.log(articles)

  // Vou criar um fields, onde busco o slug da minha resposta
  // E com o slug vou preenchendo dinamicamente cada post que tenho
  const fields = articles.map(({ title }) => ({
    loc: `http://localhost:3000/articlePage/${title}`,
    lastmod: new Date().toISOString(),
    // changefreq
    // priority
  }))

  console.log(fields)

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
// eslint-disable-next-line @typescript-eslint/no-empty-function
export default () => {}
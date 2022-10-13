import Head from '../../../node_modules/next/head'
import { FooterBlog } from '../../components/FooterBlog/index'
import { HeaderBlog } from '../../components/HeaderBlog/index'
import styles from './styles.module.scss'
import { BsWhatsapp } from 'react-icons/bs'
import Link from '../../../node_modules/next/link'
import Image from '../../../node_modules/next/image'

export default function Sobre() {

   return (
      <>
         <Head>
            <title>Sobre - Blog Builder Seu Negócio Online</title>
         </Head>
         <main>

            <HeaderBlog />

            <section className={styles.userSection}>
               <div className={styles.userBox}>

               <Image src="gabriel.png" width={220} height={200} alt="gabriel de bastiani" />

                  <h1>Gabriel Campos de Bastiani</h1>

                  <div className={styles.userDescription}>
                     <p>
                        Me chamo Gabriel Campos de Bastiani, formado em Gestão Comercial pelo centro universitário UNIFTEC da cidade de Caxias do Sul-RS; Junto ao conhecimento obtido na faculdade, e principalmente pelo conhecimento de longa data em Web Design (criação e desenvolvimento de sites e lojas virtuais), aliando tudo isso com técnicas de Marketing Digital; Fundei a Builder Seu Negócio Online, vislumbrando o mercado de pequenas e médias empresas, e os profissionais autônomos e liberais.
                     </p>

                     <h2>Minha Missão</h2>

                     <p>
                        Ajudar pequenas e médias empresas, como também profissionais autônomos e liberais, a colocarem seus negócios aqui na internet, para assim aumentarem consideravelmente as procuras por orçamentos e, consecutivamente, vendas.
                     </p>

                     <Link className={styles.whatsButton} href={`https://api.whatsapp.com/send?phone=5554996860104`}>
                        <span><BsWhatsapp size={30} color="green" />Entre em contato comigo! (54)99686-0104</span>
                     </Link>

                  </div>
               </div>
            </section>

         </main>
         <FooterBlog />
      </>
   )
}
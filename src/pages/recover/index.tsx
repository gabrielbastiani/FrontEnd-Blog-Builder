import { FormEvent, useState, useRef } from 'react'
import { canSSRGuest } from '../../utils/canSSRGuest'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../login/styles.module.scss'
import logoLoginImg from '../../../public/LogoBuilderBlack.png'
import { Input } from '../../components/ui/Input/index'
import { Button } from '../../components/ui/Button/index'
import { toast } from 'react-toastify'
import Link from 'next/link';
import Router from 'next/router'
import { useRouter } from '../../../node_modules/next/router'
import { setupAPIClient } from '../../services/api'



export default function Recover() {

   const router = useRouter()

   const [newPassword, setNewPassword] = useState('')
   const [password, setPassword] = useState('');


   async function handleLogin(event: FormEvent) {
      event.preventDefault();

      try {

         if (newPassword != password) {

            toast.error('Senhas diferentes')

            return;
        }

         const recovery_id = router.query.recovery_id

         const apiClient = setupAPIClient()

         await apiClient.put(`/recover?recovery_id=${recovery_id}`, { password })

         toast.success('Senha atualizada com sucesso.')


      } catch (err) {
         console.log(err);
         toast.error('Erro ao atualizar a sua senha')
      }

      Router.push('/login')

   }


   return (
      <>
         <Head>
            <title>Recuperar minha senha - Blog Builder Seu Negócio Online</title>
         </Head>
         <div className={styles.containerCenter}>
            <Image src={logoLoginImg} width={440} height={150} alt="Logo Builder Seu Negocio Online" />

            <div className={styles.login}>
               <form onSubmit={handleLogin}>

                  <Input
                     placeholder='Digite nova senha'
                     type='password'
                     value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)}
                  />

                  <Input
                     placeholder='Repetir a nova senha'
                     type='password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />

                  <Button
                     type="submit"
                  >
                     Alterar senha
                  </Button>

               </form>

               <Link href="/signup">
                  <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
               </Link>

               <Link href="/">
                  <a className={styles.text}>Ir para o Blog</a>
               </Link>

            </div>
         </div>
      </>
   )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
   return {
      props: {}
   }
})
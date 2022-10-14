import { useContext, FormEvent, useState, useRef } from 'react'
import { canSSRGuest } from '../../utils/canSSRGuest'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../login/styles.module.scss'
import logoLoginImg from '../../../public/LogoBuilderBlack.png'
import { Input } from '../../components/ui/Input/index'
import { Button } from '../../components/ui/Button/index'
import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import Link from 'next/link';
import ReCAPTCHA from "react-google-recaptcha";



export default function Login() {

   const { signIn } = useContext(AuthContext)

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState(false);
   const [loading, setLoading] = useState(false);
   const [userValid, setUserValid] = useState(false);
   const captcha = useRef(null);


   async function handleLogin(event: FormEvent) {
      event.preventDefault();

      if (captcha.current.getValue()) {
         console.log('Usuario válido!')
         setUserValid(true)
      } else {
         console.log('Por favor, acerte o recaptcha!')
         toast.error('Por favor, acerte o recaptcha!')

         return;
      }

      if (email === '' || password === '') {
         toast.warning('Preencha os campos! (Email e Senha)')
         return;
      }

      setLoading(true)

      let data = {
         email,
         password
      }

      await signIn(data)

      setLoading(false)

   }

   const onChange = () => {
      if (captcha.current.getValue()) {
         console.log('Usuario não é um robo!')
      }
   }



   return (
      <>
         <Head>
            <title>Blog Builder Seu Negócio Online - Login</title>
         </Head>
         <div className={styles.containerCenter}>
            <Image src={logoLoginImg} width={440} height={150} alt="Logo Builder Seu Negocio Online" />

            <div className={styles.login}>
               <form onSubmit={handleLogin}>
                  <Input
                     placeholder='Digite seu email'
                     type='text'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />

                  <Input
                     placeholder='Digite sua senha'
                     type='password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className={styles.recaptcha}>
                     <ReCAPTCHA
                        ref={captcha}
                        sitekey="6Lc8Hu8hAAAAAB4EHDuIsWxMk9Hfn5Wigm-RpdoB"
                        onChange={onChange}
                     />
                  </div>

                  <Button
                     type="submit"
                     loading={loading}
                  >
                     Acessar
                  </Button>

               </form>

               <Link href="/signup">
                  <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
               </Link>

               <Link href="/recoveryPassword">
                  <a className={styles.text}>Esqueceu sua senha?</a>
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
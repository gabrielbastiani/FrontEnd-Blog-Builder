import '../../styles/globals.scss'
import {AppProps} from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import CookieConsent from "react-cookie-consent";
import {AuthProvider} from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <>
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </AuthProvider>
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
    </>
  )
}

export default MyApp
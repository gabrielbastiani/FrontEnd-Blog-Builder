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
import ReCAPTCHA from "react-google-recaptcha";
import Router from 'next/router';
import { setupAPIClient } from '../../services/api'



export default function RecoveryPassword() {

    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);

    const [userValid, setUserValid] = useState(false);

    const captcha = useRef(null);


    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        try {
            if (captcha.current.getValue()) {
                console.log('Usuario válido!')
                setUserValid(true)
            } else {
                console.log('Por favor, acerte o recaptcha!')
                toast.error('Por favor, acerte o recaptcha!')

                return;
            }

            if (email === '') {
                toast.warning('Digite seu e-mail!')
                return;
            }

            setLoading(true);

            const apiClient = setupAPIClient();
            await apiClient.post('/recover', {
                email: email
            })

            toast.success('Verifique sua caixa de e-mail')
            toast.warning('NÃO DEIXE DE VERIFICAR O SPAN OU LIXEIRA!!!')

        } catch (err) {
            console.log(err);
            toast.error('Erro ao enviar e-mail!')
        }

        setLoading(false);

        Router.push('/login')

    }

    const onChange = () => {
        if (captcha.current?.getValue()) {
            console.log('Usuario não é um robo!')
        }
    }



    return (
        <>
            <Head>
                <title>Recuperar minha senha - Blog Builder Seu Negócio Online</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoLoginImg} alt="Logo Builder Seu Negocio Online" />

                <div className={styles.login}>
                    <form onSubmit={handleLogin}>
                        <Input
                            placeholder='Digite seu email cadastrado'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className={styles.recaptcha}>
                            <ReCAPTCHA
                                ref={captcha}
                                sitekey="6Lc8Hu8hAAAAAB4EHDuIsWxMk9Hfn5Wigm-RpdoB"
                                onChange={onChange}
                            />
                        </div>

                        {!userValid &&
                            <Button
                                type="submit"
                                loading={loading}
                            >
                                Enviar solicitação
                            </Button>
                        }
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
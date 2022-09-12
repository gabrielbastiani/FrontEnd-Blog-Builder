import { useState, FormEvent, ChangeEvent, useRef } from 'react'
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../pages/signup/styles.module.scss';
import logoImg from '../../../public/LogoBuilderBlack.png';
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { FiUpload } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify'
import Link from 'next/link';
import Router from 'next/router';
import ReCAPTCHA from "react-google-recaptcha";


export default function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);

  const [userValid, setUserValid] = useState(false);

  const captcha = useRef(null);

  function isEmail(emailName: string) {
    return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emailName)
  }



  function handleFile(e: ChangeEvent<HTMLInputElement>) {

    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {

      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))

    }

  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const data = new FormData();

      if (captcha.current.getValue()) {
        console.log('Usuario válido!')
        setUserValid(true)
      } else {
        console.log('Por favor, acerte o recaptcha!')
        toast.error('Por favor, acerte o recaptcha!')

        return;
      }

      if (name === '' || email === '' || password === '' || imageAvatar === null) {
        toast.warning('Preencha todos os campos! (Carregue uma foto - Digite o seu nome - Digite seu email - Digite uma senha')
        console.log("Preencha todos os campos!");
        return;
      }

      if (!isEmail(email)) {

        toast.error('Por favor digite um email valido!');

        return;
      }

      setLoading(true);

      data.append('name', name);
      data.append('email', email);
      data.append('password', password);
      data.append('file', imageAvatar);

      const apiClient = setupAPIClient();

      await apiClient.post('/users', data);

      toast.success('Cadastrado com sucesso!')

      console.log('Cadastrado com sucesso!')

    } catch (err) {
      console.log(err);
      toast.error('Erro ao cadastrar!')
      console.log("Ops erro ao cadastrar!")
    }

    setLoading(false);

    Router.push('/login')

  }

  const onChange = () => {
    if (captcha.current.getValue()) {
      console.log('Usuario não é um robo!')
    }
  }



  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Blog Builder Seu Negocio Online" />

        <div className={styles.login}>
          <h1>Crie sua conta</h1>

          <form className={styles.form} onSubmit={handleRegister}>

            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={20} color="#ff6700" />
              </span>

              <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do usuario"
                  width={150}
                  height={150}
                />
              )}

            </label>

            <p>Carregue uma foto sua</p>

            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Digite seu email"
              type="email"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <ReCAPTCHA
              ref={captcha}
              sitekey="6Lc8Hu8hAAAAAB4EHDuIsWxMk9Hfn5Wigm-RpdoB"
              onChange={onChange}
            />

            {!userValid &&
              <Button
                type="submit"
                loading={loading}
              >
                Cadastrar
              </Button>
            }
          </form>

          <Link href="/login">
            <a className={styles.text}>Já possui uma conta? Faça login!</a>
          </Link>

          <Link href="/">
            <a className={styles.text}>Ir para o Blog</a>
          </Link>

        </div>

      </div>
    </>
  )
}
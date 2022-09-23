import { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react'
import styles from '../detailUser/styles.module.scss'
import Head from 'next/head'
import { HeaderPainel } from '../../components/HeaderPainel/index'
import { AuthContext } from '../../contexts/AuthContext'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import Router from 'next/router'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { FiUpload } from 'react-icons/fi'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify'
import { FooterPainel } from '../../components/FooterPainel/index'
import Link from '../../../node_modules/next/link'
import { api } from '../../services/apiClient'


export default function DetailUser() {

  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [avatarUrl, setAvatarUrl] = useState('');
  const [photo, setPhoto] = useState(null);

  const [loading, setLoading] = useState(false);


  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return
    }

    const image = e.target.files[0]
    if (!image) {
      return
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setPhoto(image)
      setAvatarUrl(URL.createObjectURL(image))
    }

  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const data = new FormData()

      if (name === '' || email === '' || photo === null) {
        toast.warning('Preencha todos os campos! (Carregue uma foto - Digite o seu nome - Digite seu email - Digite uma senha')
        console.log("Preencha todos os campos!");
        return;
      }

      setLoading(true);

      data.append('user_id', user.id)
      data.append('file', photo)
      data.append('name', name)
      data.append('email', email)

      const apiClient = setupAPIClient()

      await apiClient.put('/users/update', data)

      toast.success('Usuario atualizado com sucesso')

    } catch (err) {
      toast.error('Ops erro ao atualizar (verifique todos os campos.)')
    }

    setLoading(false);

    Router.push('/detailUser')

  }



  return (
    <>
      <Head>
        <title>{user?.name} - Detalhes do Usuario</title>
      </Head>

      <HeaderPainel />

      <main className={styles.containerCenter}>
        <section className={styles.login}>
          <div className={styles.returnBox}>
          <Link href={'/dashboard'}>
            <BsFillArrowLeftSquareFill className={styles.return} size={30} />
          </Link>
          </div>

          <h1>Alterar dados do usuario</h1>
          <img className={styles.userImg} src={"http://localhost:3333/files/" + user?.photo} alt="foto usuario" />
          <form className={styles.form} onSubmit={handleRegister}>
            <label className={styles.labelAvatar}>

              <span>
                <FiUpload size={20} color="#ff6700" />
              </span>
              <input type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="foto usuario" />
              {avatarUrl && (
                <img
                  className={styles.userImgPreview}
                  src={avatarUrl}
                  alt="Foto do usuario"
                  width={150}
                  height={150}
                />
              )}
            </label>

            <p>Carregue uma nova foto sua</p>

            <Input
              className={styles.inputUser}
              placeholder={`${user?.name}`}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              className={styles.inputUser}
              placeholder={`${user?.email}`}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Atualizar
            </Button>
          </form>

        </section>

      </main>

      <FooterPainel />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  return {
    props: {}
  }
})
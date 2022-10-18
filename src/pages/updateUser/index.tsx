import { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react'
import Head from "next/head"
import styles from './styles.module.scss'
import Link from 'next/link';
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { toast } from 'react-toastify'
import { Button } from '../../components/ui/Button/index'
import { Input } from '../../components/ui/Input/index'
import { FiUpload } from 'react-icons/fi'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { useRouter } from '../../../node_modules/next/router'
import { HeaderPainel } from '../../components/HeaderPainel/index';
import { FooterPainel } from '../../components/FooterPainel/index';
import Image from '../../../node_modules/next/image';


export default function UpdateUser() {

    const router = useRouter()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoUrl, setPhotoUrl] = useState("/defaultImage");
    const [imagePhoto, setImagePhoto] = useState(null);
    const [role, setRole] = useState('');

  function isEmail(emailName: string) {
    return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emailName)
  }


    useEffect(() => {
        async function updateUser() {
            const apiClient = setupAPIClient()
            const data = new FormData()
            const user_id = router.query.user_id
            const responseUser = await apiClient.get(`/users/exact?user_id=${user_id}`)
            const { name, email, photo, role } = responseUser.data

            setName(name)
            setEmail(email)
            setRole(role)
            setPhotoUrl(`http://localhost:3333/files/${photo}`)

        }

        updateUser()
    }, [router.query.user_id]);

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        }

        const image = e.target.files[0]
        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImagePhoto(image)
            setPhotoUrl(URL.createObjectURL(image))
        }
    }


    async function handleRegisterPhoto(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData()

            if (imagePhoto === null) {
                toast.error('Carregue uma imagem!')
                console.log("'Carregue uma imagem!");
                return;
            }

            const user_id = router.query.user_id;

            data.append('user_id', user_id)
            data.append('file', imagePhoto)

            const apiClient = setupAPIClient()

            await apiClient.put('/users/photo', data)

            toast.success('Foto do usúario atualizada com sucesso')

        } catch (err) {
            toast.error('Ops erro ao atualizar a foto!')
        }

    }

    async function handleUpdateName(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData()
            const user_id = router.query.user_id;

            if (name === '') {
                toast.error('Preencha o nome');
                console.log("Preencha o nome");
                return;
            }

            const apiClient = setupAPIClient()
            await apiClient.put(`/users/update/name?user_id=${user_id}`, { name })

            toast.success('Nome do usúario atualizado com sucesso')

        } catch (err) {
            toast.error('Ops erro ao atualizar o nome do usúario')
        }

    }


    async function handleUpdateEmail(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData();
            const apiClient = setupAPIClient()
            const user_id = router.query.user_id;

            if (email === '') {
                toast.error('Preencha o email');
                console.log("Preencha o email");
                return;
            }

            if (!isEmail(email)) {

                toast.error('Por favor digite um email valido!');
        
                return;
            }

            await apiClient.put(`/users/update/email?user_id=${user_id}`, { email })

            toast.success('Email do usúario atualizado com sucesso')

        } catch (err) {
            toast.error('Ops erro ao atualizar o email do usúario')
        }

    }


    async function handleUserRoleAdmin() {
        try {
            const apiClient = setupAPIClient();
            const user_id = router.query.user_id
            await apiClient.put(`/users/update/role/admin?user_id=${user_id}`)
            toast.success('Permissão para ADMIN atualizada com sucesso!')
        } catch (err) {
            toast.error('Ops erro ao atualizar a permissão! ADMIN')
        }
    }

    async function handleUserRoleUser() {
        try {
            const apiClient = setupAPIClient();
            const user_id = router.query.user_id
            await apiClient.put(`/users/update/role/user?user_id=${user_id}`)
            toast.success('Permissão atualizada para USER com sucesso!')
        } catch (err) {
            toast.error('Ops erro ao atualizar a permissão! USER')
        }
    }



    return (
        <>
            <Head>
                <title>Atualizar usúario - {name} - Builder Seu Negócio Online</title>
            </Head>

            <HeaderPainel />

            <main className={styles.containerCenter}>
                <section className={styles.login}>
                    <div className={styles.returnBox}>
                        <Link href={'/usersAll'}>
                            <BsFillArrowLeftSquareFill className={styles.return} size={30} />
                        </Link>
                    </div>

                    <h1>Alterar dados do usuario</h1>

                    <Image className={styles.userImg} src={photoUrl} width={550} height={450} alt="foto usuario" />

                    <form className={styles.form} onSubmit={handleRegisterPhoto}>

                        <label className={styles.labelAvatar}>

                            <span>
                                <FiUpload size={20} color="#ff6700" />
                            </span>
                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="foto usuario" />
                            {photoUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    className={styles.userImgPreview}
                                    src={photoUrl}
                                    alt="Foto do usuario"
                                    width={150}
                                    height={150}
                                />
                            )}
                        </label>

                        <p>Carregue uma nova foto sua</p>

                        <div className={styles.buttonPhoto}>
                            <Button
                                type="submit"
                            >
                                Salvar nova foto
                            </Button>
                        </div>

                    </form>

                    <form className={styles.form} onSubmit={handleUpdateName}>

                        <Input
                            placeholder={`${name}`}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <div className={styles.buttonPhoto}>
                            <Button
                                type="submit"
                            >
                                Salvar Nome
                            </Button>
                        </div>

                    </form>

                    <form className={styles.form} onSubmit={handleUpdateEmail}>

                        <Input
                            placeholder={`${email}`}
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className={styles.buttonPhoto}>
                            <Button
                                type="submit"
                            >
                                Salvar E-mail
                            </Button>
                        </div>

                        <div className={styles.inputRole}>

                            <span>Regra atual do usúario: <b>{role}</b></span>
                            <br />
                            <p>Clique abaixo para alterar a permissão desse usúario</p>

                            <Button
                                onClick={() => handleUserRoleAdmin()}
                            >
                                Atualizar para Administrador
                            </Button>

                            <br />

                            <Button
                                onClick={() => handleUserRoleUser()}
                            >
                                Atualizar para Usúario
                            </Button>

                        </div>

                    </form>

                </section>
            </main>

            <br />
            <br />

            <FooterPainel />
        </>
    )

}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    return {
        props: {}
    }
})
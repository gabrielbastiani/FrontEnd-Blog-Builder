import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import Head from "next/head"
import styles from './styles.module.scss'
import Router from 'next/router'
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


export default function UpdateUser() {

    const router = useRouter()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [imagePhoto, setImagePhoto] = useState(null);
    const [role, setRole] = useState('');

    const [loading, setLoading] = useState(false);


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


    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData()

            const user_id = router.query.user_id;

            setLoading(true);

            data.append('user_id', user_id)
            data.append('file', imagePhoto)
            data.append('name', name)
            data.append('email', email)

            const apiClient = setupAPIClient()

            await apiClient.put(`/users/update?user_id=${user_id}`, data)

            toast.success('Usúario atualizado com sucesso')

            Router.push('/detailUser')

        } catch (err) {
            toast.error('Ops erro ao atualizar (é preciso inserir a foto do usúario novamente), se atualizou apenas a permissão do usúario, ignore essa mensagem!')
        }

        setLoading(false);
    }

    async function handleUserRoleAdmin() {
        try {
            const apiClient = setupAPIClient();
            const user_id = router.query.user_id
            await apiClient.put(`/users/update/role/admin?user_id=${user_id}`)
            toast.success('permissão para ADMIN atualizada com sucesso!')
        } catch (err) {
            toast.error('Ops erro ao atualizar a permissão! ADMIN')
        }
    }

    async function handleUserRoleUser() {
        try {
            const apiClient = setupAPIClient();
            const user_id = router.query.user_id
            await apiClient.put(`/users/update/role/user?user_id=${user_id}`)
            toast.success('permissão atualizada para USER com sucesso!')
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
                        <Link href={'/detailUser'}>
                            <BsFillArrowLeftSquareFill className={styles.return} size={30} />
                        </Link>
                    </div>

                    <h1>Alterar dados do usuario</h1>

                    <img className={styles.userImg} src={photoUrl} alt="foto usuario" />
                    <form className={styles.form} onSubmit={handleRegister}>
                        <label className={styles.labelAvatar}>

                            <span>
                                <FiUpload size={20} color="#ff6700" />
                            </span>

                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="foto usuario" />

                            {photoUrl && (
                                <img
                                    className={styles.userImgPreview}
                                    src={photoUrl}
                                    alt="Foto do usuario"
                                    width={150}
                                    height={150}
                                />
                            )}

                        </label>

                        <p>Carregue uma nova foto desse usúario</p>

                        <Input
                            placeholder={`${name}`}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            placeholder={`${email}`}
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

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
                                Atualizar para Usúario comum
                            </Button>

                        </div>

                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Atualizar
                        </Button>
                    </form>

                </section>
            </main>

            <br />
            <br />
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
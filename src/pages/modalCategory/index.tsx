import { useState, FormEvent, } from 'react'
import styles from './style.module.scss';
import { FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import Router from 'next/router'
import { useRouter } from 'next/router'
import { setupAPIClient } from '../../services/api'
import { Button } from '../../components/ui/Button/index';
import { Category } from '../newCategory/index'
import Modal from 'react-modal';


interface ModalCategoryProps {
    isOpen: boolean;
    onRequestClose: () => void;
    categoryName: Category[];
}

export function ModalCategory({ isOpen, onRequestClose, categoryName }: ModalCategoryProps) {

    const apiClient = setupAPIClient()

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--black)',
            borderRadius: '3%'
        }
    };


    const [name, setName] = useState('')

    const router = useRouter()

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData()

            if (name === '') {
                toast.warning('Não deixe o nome de categoria em branco!')
                return;
            }

            const category_id = router.query.category_id

            const apiClient = setupAPIClient()

            await apiClient.put(`/category/update?category_id=${category_id}`, { name })

            toast.success('Categoria atualizada com sucesso.')

            Router.push('/newCategory')

        } catch (err) {

            toast.error('Ops erro ao atualizar.')

        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >

            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
                style={{ background: 'transparent', border: 0 }}
            >
                <FiX size={45} color="#f34748" />
            </button>
            <main className={styles.container}>
                <h1>Atualize o nome da categoria</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder={'Digite novo nome de categoria!'}
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Button
                        type="submit"
                    >
                        Atualizar
                    </Button>

                </form>
            </main>
            </Modal>
            )
}
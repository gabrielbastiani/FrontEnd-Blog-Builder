import { useState, FormEvent, } from 'react'
import Modal from 'react-modal';
import styles from './style.module.scss';
import { FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import Router from 'next/router'
import { useRouter } from 'next/router'
import { setupAPIClient } from '../../services/api'
import { Button } from '../ui/Button/index';
import { Input } from '../ui/Input/index';
import { CategoryNameProps } from '../../pages/newCategory/index'


interface ModalCategoryProps {
    isOpen: boolean;
    onRequestClose: () => void;
    categoryName: CategoryNameProps[];
}

type RouteDetailParams = [
    category:{
        category_id: string;
        name: string;
    }
]

export function ModalCategory({ isOpen, onRequestClose, categoryName }: ModalCategoryProps) {

    const apiClient = setupAPIClient()

    const router = useRouter<RouteDetailParams>()
    const parametro = router.query.id

    console.log(parametro)

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

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData()

            if(name === ''){
              toast.warning('Preencha novo nome para categoria!')
     
              return;
            }

            data.append('category_id', parametro)
            data.append('name', name)

            await apiClient.put('/category/update', data)

            toast.success('Categoria atualizada com sucesso')

        } catch (err) {
            toast.error('Ops erro ao atualizar.')
        }

        onRequestClose()

        Router.push('/category')

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
                <FiX size={45} color="var(--red)" />
            </button>

            <div className={styles.container}>

                <h2>Alterar nome da categoria</h2>

                <form onSubmit={handleRegister}>
                    <Input
                        className={styles.inputUpdateCategory}
                        placeholder={'Digite novo nome da categoria'}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button
                        className={styles.buttonUpdate}
                        type="submit"
                    >
                        Atualizar
                    </Button>
                </form>
            </div>

        </Modal>
    )
}
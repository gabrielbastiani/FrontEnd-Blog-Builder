import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';
import { UpdateCategoryProps } from '../../pages/newCategory/index';
import { Button } from '../ui/Button/index';
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify';
import { Input } from '../ui/Input/index';


interface ModalUpdateCategory {
    isOpen: boolean;
    onRequestClose: () => void;
    onRefreshList: () => void;
    category: UpdateCategoryProps[];
}

export function ModalUpdateCategory({ isOpen, onRequestClose, onRefreshList, category }: ModalUpdateCategory) {

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'black'
        }
    };


    const [categoryName, setCategoryName] = useState('');


    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        try {
            if (categoryName === '') {
                toast.error('Digite algum nome para sua categoria!')
                return;
            }

            const category_id = category[0].id;
            const apiClient = setupAPIClient()

            await apiClient.put(`/category/update?category_id=${category_id}`, { categoryName })

            toast.success('Categoria atualizada com sucesso.')

            onRefreshList();
            onRequestClose();

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
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
                style={{ background: 'transparent', border: 0, cursor: 'pointer' }}
            >
                <FiX size={45} color="#f34748" />
            </button>

            <section className={styles.containerContent}>

                <h1>Atualize o nome da categoria</h1>

                <form onSubmit={handleRegister}>
                    <Input
                        type="text"
                        placeholder={'Digite novo nome de categoria!'}
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />

                    <div className={styles.containerButton}>
                    <Button
                        type="submit"
                    >
                        Atualizar
                    </Button>
                    </div>
                </form>

            </section>

        </Modal>
    )
}
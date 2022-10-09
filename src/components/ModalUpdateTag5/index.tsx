import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';
import { UpdateTag5Props } from '../../pages/newsTags/index';
import { Button } from '../ui/Button/index';
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify';
import { Input } from '../ui/Input/index';


interface ModalUpdateTag5 {
    isOpen: boolean;
    onRequestClose: () => void;
    tag5: UpdateTag5Props[];
}

export function ModalUpdateTag5({ isOpen, onRequestClose, tag5 }: ModalUpdateTag5) {

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


    const [tagName5, setTagName5] = useState('')


    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        try {
            if (tagName5 === '') {
                toast.error('Digite alguma palavra para atualizar essa TAG!')
                return;
            }

            const tag5_id = tag5[0].id;
            const apiClient = setupAPIClient()

            await apiClient.put(`/tag5/update?tag5_id=${tag5_id}`, { tagName5 })

            toast.success('TAG atualizada com sucesso.')

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

                <h1>Atualize o nome dessa TAG</h1>

                <form onSubmit={handleRegister}>
                    <Input
                        type="text"
                        placeholder={'Digite novo nome dessa TAG!'}
                        value={tagName5}
                        onChange={(e) => setTagName5(e.target.value)}
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
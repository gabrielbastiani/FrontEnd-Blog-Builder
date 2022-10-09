import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';
import { UpdateTag3Props } from '../../pages/newsTags/index';
import { Button } from '../ui/Button/index';
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify';
import { Input } from '../ui/Input/index';


interface ModalUpdateTag3 {
    isOpen: boolean;
    onRequestClose: () => void;
    tag3: UpdateTag3Props[];
}

export function ModalUpdateTag3({ isOpen, onRequestClose, tag3 }: ModalUpdateTag3) {

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


    const [tagName3, setTagName3] = useState('')


    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        try {
            if (tagName3 === '') {
                toast.error('Digite alguma palavra para atualizar essa TAG!')
                return;
            }

            const tag3_id = tag3[0].id;
            const apiClient = setupAPIClient()

            await apiClient.put(`/tag3/update?tag3_id=${tag3_id}`, { tagName3 })

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
                        value={tagName3}
                        onChange={(e) => setTagName3(e.target.value)}
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
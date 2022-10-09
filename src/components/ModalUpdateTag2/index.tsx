import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';
import { UpdateTag2Props } from '../../pages/newsTags/index';
import { Button } from '../ui/Button/index';
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify';
import { Input } from '../ui/Input/index';


interface ModalUpdateTag2 {
    isOpen: boolean;
    onRequestClose: () => void;
    tag2: UpdateTag2Props[];
}

export function ModalUpdateTag2({ isOpen, onRequestClose, tag2 }: ModalUpdateTag2) {

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


    const [tagName2, setTagName2] = useState('')


    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        try {
            if (tagName2 === '') {
                toast.error('Digite alguma palavra para atualizar essa TAG!')
                return;
            }

            const tag2_id = tag2[0].id;
            const apiClient = setupAPIClient()

            await apiClient.put(`/tag2/update?tag2_id=${tag2_id}`, { tagName2 })

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
                        value={tagName2}
                        onChange={(e) => setTagName2(e.target.value)}
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
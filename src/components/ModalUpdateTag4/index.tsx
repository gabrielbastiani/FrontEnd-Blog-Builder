import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';
import { UpdateTag4Props } from '../../pages/newsTags/index';
import { Button } from '../ui/Button/index';
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify';
import { Input } from '../ui/Input/index';


interface ModalUpdateTag4 {
    isOpen: boolean;
    onRequestClose: () => void;
    tag4: UpdateTag4Props[];
}

export function ModalUpdateTag4({ isOpen, onRequestClose, tag4 }: ModalUpdateTag4) {

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


    const [tagName4, setTagName4] = useState('')


    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        try {
            if (tagName4 === '') {
                toast.error('Digite alguma palavra para atualizar essa TAG!')
                return;
            }

            const tag4_id = tag4[0].id;
            const apiClient = setupAPIClient()

            await apiClient.put(`/tag4/update?tag4_id=${tag4_id}`, { tagName4 })

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
                        value={tagName4}
                        onChange={(e) => setTagName4(e.target.value)}
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
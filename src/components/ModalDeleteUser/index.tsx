import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';
import { DeleteUserProps } from '../../pages/usersAll/index';
import { Button } from '../ui/Button/index';
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify';


interface ModalDeleteUser {
    isOpen: boolean;
    onRequestClose: () => void;
    user: DeleteUserProps[];
}

export function ModalDeleteUser({ isOpen, onRequestClose, user }: ModalDeleteUser) {

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


    async function handleDeleteUser() {
        try {
            const apiClient = setupAPIClient();
            const user_id = user[0].id
            await apiClient.delete(`/users/remove?user_id=${user_id}`)

            toast.success('Usúario deletado com sucesso.')

            onRequestClose()

        } catch (err) {

            toast.error('Ops erro ao deletar')

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

            <div className={styles.containerContent}>

                <h2>Deseja mesmo deletar esse usúario?</h2>

                <div className={styles.containerButton}>
                    <Button
                        onClick={() => handleDeleteUser()}
                    >
                        Deletar
                    </Button>
                </div>

            </div>

        </Modal>
    )
}
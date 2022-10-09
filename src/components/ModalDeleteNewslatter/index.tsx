import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';
import { DeleteNewslatterProps } from '../../pages/newslatters/index';
import { Button } from '../ui/Button/index';
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify';


interface ModalDeleteNewslatter {
    isOpen: boolean;
    onRequestClose: () => void;
    onRefreshList: () => void;
    newslatter: DeleteNewslatterProps[];
}

export function ModalDeleteNewslatter({ isOpen, onRequestClose, onRefreshList, newslatter }: ModalDeleteNewslatter) {

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


    async function handleDeleteNewslatter() {
        try {
            const apiClient = setupAPIClient();
            const newslatter_id = newslatter[0].id
            await apiClient.delete(`/newslatter/remove?newslatter_id=${newslatter_id}`)

            toast.success('Newslatter deletado com sucesso.')

            onRefreshList()
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

                <h2>Deseja mesmo deletar essa newslatter?</h2>

                <div className={styles.containerButton}>
                    <Button
                        onClick={() => handleDeleteNewslatter()}
                    >
                        Deletar
                    </Button>
                </div>

            </div>

        </Modal>
    )
}
import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';
import { DeleteContactFormProps } from '../../pages/contacts/index';
import { Button } from '../ui/Button/index';
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify';


interface ModalDeleteContactForm {
    isOpen: boolean;
    onRequestClose: () => void;
    contactform: DeleteContactFormProps[];
}

export function ModalDeleteContactForm({ isOpen, onRequestClose, contactform }: ModalDeleteContactForm) {

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


    async function handleContactFormDelete() {
        try {
            const apiClient = setupAPIClient();
            const contactform_id = contactform[0].id
            await apiClient.delete(`/contactform/remove?contactform_id=${contactform_id}`)

            toast.success('Contato deletado com sucesso.')

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

                <h2>Deseja mesmo deletar esse contato?</h2>

                <div className={styles.containerButton}>
                    <Button
                        onClick={() => handleContactFormDelete()}
                    >
                        Deletar
                    </Button>
                </div>

            </div>

        </Modal>
    )
}
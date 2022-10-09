import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';
import { DeleteArticleProps } from '../../pages/dashboard/index';
import { Button } from '../ui/Button/index';
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify';


interface ModalDeleteArticle {
    isOpen: boolean;
    onRequestClose: () => void;
    onRefreshListAdmin: () => void;
    article: DeleteArticleProps[];
}

export function ModalDeleteArticle({ isOpen, onRequestClose, onRefreshListAdmin, article }: ModalDeleteArticle) {

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


    async function handleArticleDelete() {
        try {
            const apiClient = setupAPIClient();
            const article_id = article[0].id
            await apiClient.delete(`/article/remove?article_id=${article_id}`)

            toast.success('Artigo deletado com sucesso.')

            onRefreshListAdmin()
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

                <h2>Deseja mesmo deletar esse artigo?</h2>

                <div className={styles.containerButton}>
                    <Button
                        onClick={() => handleArticleDelete()}
                    >
                        Deletar
                    </Button>
                </div>

            </div>

        </Modal>
    )
}
import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';
import { DespuplishedArticleProps } from '../../pages/dashboard/index';
import { Button } from '../ui/Button/index';
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify';


interface ModalDespublishedArticle {
    isOpen: boolean;
    onRequestClose: () => void;
    onRefreshListAdmin: () => void;
    article: DespuplishedArticleProps[];
}

export function ModalDespublishedArticle({ isOpen, onRequestClose, onRefreshListAdmin, article }: ModalDespublishedArticle) {

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


    async function handleArticleDespublish() {
        try {
            const apiClient = setupAPIClient();
            const article_id = article[0].id;

            await apiClient.put(`/article/despublish?article_id=${article_id}`)

            toast.success('Artigo despublicado com sucesso no blog.')

            onRefreshListAdmin();
            onRequestClose();

        } catch (err) {

            toast.error('Ops erro ao despublicar artigo do blog')

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

                <h2>Deseja mesmo despublicar esse artigo no blog?</h2>

                <div className={styles.containerButton}>
                <Button
                    onClick={() => handleArticleDespublish()}
                >
                    Despublicar
                </Button>
                </div>
            </section>

        </Modal>
    )
}
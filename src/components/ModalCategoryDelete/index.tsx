import Modal from 'react-modal';
import styles from './style.module.scss';
import { useRouter } from 'next/router'
import { Button } from '../ui/Button/index';
import { Category } from '../../pages/newCategory/index'


interface ModalCategoryPropsDel {
    isOpen: boolean;
    onRequestClose: () => void;
    categoryDelete: Category[];
    handleDeleteCategory: (id: string) => void;
}

export function ModalCategoryDelete({ isOpen, onRequestClose, categoryDelete, handleDeleteCategory }: ModalCategoryPropsDel) {

    const router = useRouter()

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--black)',
            borderRadius: '3%'
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >

            <div className={styles.container}>

                <h2>Deseja mesmo deletar essa categoria?</h2>

                <span>Se deleta-la, ela será desvinculada do(s) artigo(s) que pertence no momento.</span>

                <Button
                    className={styles.buttonUpdate}
                    onClick={ () => handleDeleteCategory(categoryDelete[0].category_id) }
                >
                    Deletar
                </Button>
                    
                <Button
                    className={styles.buttonUpdate}
                    type="button"
                    onClick={onRequestClose}
                >
                    Cancelar
                </Button>
            </div>

        </Modal>
    )
}
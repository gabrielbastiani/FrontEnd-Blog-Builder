import { FormEvent } from 'react';
import Modal from 'react-modal';
import styles from './style.module.scss';
import { FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { api } from '../../services/apiClient';

import Router from 'next/router'
import { useRouter } from 'next/router'
import { setupAPIClient } from '../../services/api'
import { Button } from '../ui/Button/index';
import { DeleteProps } from '../../pages/newCategory/index'


interface ModalCategoryPropsDel {
    isOpen: boolean;
    onRequestClose: () => void;
    categoryDelete: DeleteProps[];
}

export function ModalCategoryDelete({ isOpen, onRequestClose, categoryDelete }: ModalCategoryPropsDel) {

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
                    onClick={deleteFunction}
                    className={styles.buttonUpdate}
                >
                    Deletar
                </Button>

                    
                <Button
                    type="button"
                >
                    Cancelar
                </Button>
            </div>

        </Modal>
    )
}
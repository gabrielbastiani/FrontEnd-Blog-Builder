import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';
import { PublishedArticleUserProps } from '../../pages/dashboard/index';
import { Button } from '../ui/Button/index';
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify';
import moment from 'moment';
import { Input } from '../ui/Input/index';


interface ModalPublishedUserArticle {
    isOpen: boolean;
    onRequestClose: () => void;
    onRefreshList: () => void;
    article: PublishedArticleUserProps[];
}

export function ModalPublishedUserArticle({ isOpen, onRequestClose, onRefreshList, article }: ModalPublishedUserArticle) {

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


    const [hourNow, setHourNow] = useState(Number);
    const [minuteNow, setMinuteNow] = useState(Number);
    const [secondNow, setSecondNow] = useState(Number);

    const [publishDate, setPublishDate] = useState('');


    const place = moment(publishDate).format('DD/MM/YYYY HH:mm');


    useEffect(() => {
        async function updateArticle() {
            const apiClient = setupAPIClient()
            const data = new FormData()
            const article_id = article[0].id
            const responseArticle = await apiClient.get(`/article/exact/id?article_id=${article_id}`)
            const { publishDate } = responseArticle.data

            setPublishDate(publishDate)

        }

        updateArticle()
    }, [article]);


    async function handleUpdateDate(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData()
            const article_id = article[0].id;

            const apiClient = setupAPIClient();
            await apiClient.put(`/article/datefuture?article_id=${article_id}`, { publishDate });

            toast.success('Data para publicação gravada com sucesso!');

        } catch (err) {
            toast.error('Ops erro ao gravar a data!')
        }
    }


    async function handleArticlePublish() {
        try {
            const apiClient = setupAPIClient();
            const article_id = article[0].id;
            await apiClient.put(`/article/published?article_id=${article_id}`)
            toast.success('Artigo publicado com sucesso no blog.')
            onRefreshList();
            onRequestClose();
        } catch (err) {
            toast.error('Ops erro ao publicar no blog')
        }
    }

    async function handleArticlePublishFuture() {
        try {
            const apiClient = setupAPIClient();
            const article_id = article[0].id
            await apiClient.get(`/article/date?article_id=${article_id}`)
            toast.success('Artigo será publicado na data e horario programada!')
            onRequestClose()
        } catch (err) {
            toast.error('Ops erro ao programar!')
        }
    }



    const hoje = new Date();
    const dia = hoje.getDate().toString().padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;

    const getHours = () => {
        const date = new Date()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        const hourNow = hours < 10 ? `0${hours}` : hours
        const minuteNow = minutes < 10 ? `0${minutes}` : minutes
        const secondNow = seconds < 10 ? `0${seconds}` : seconds

        setHourNow(hourNow);
        setMinuteNow(minuteNow);
        setSecondNow(secondNow);

    }

    setInterval(() => {
        getHours()
    }, 1000);


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

                <h2>Deseja mesmo publicar esse artigo no blog?</h2>

                <div className={styles.sectionDates}>

                    <div className={styles.boxClock}>

                        <p>Aqui você pode programar a publicação desse artigo</p>

                        <br />

                        <span>Data e Hora Atual: {hourNow}:{minuteNow}:{secondNow}</span>&nbsp;-&nbsp;
                        <span>{dataAtual}</span>

                        <br />

                        <div className={styles.clock}>
                            <span>Data e Hora Programada: {place}</span>:
                        </div>

                    </div>

                    <br />

                    <form className={styles.form} onSubmit={handleUpdateDate}>
                        <div className={styles.boxDates}>
                            <Input
                                type="datetime-local"
                                placeholder={publishDate}
                                className={styles.input}
                                value={publishDate}
                                onChange={(e) => setPublishDate(e.target.value)}
                            />
                            <Button
                            >
                                Gravar data futura
                            </Button>
                        </div>

                        <div className={styles.buttonProgram}>
                            <Button
                                onClick={() => handleArticlePublishFuture()}
                            >
                                Programar
                            </Button>
                        </div>

                    </form>
                </div>

                <div className={styles.buttonProgram}>
                    <Button
                        onClick={() => handleArticlePublish()}
                    >
                        Publicar Agora
                    </Button>
                </div>

            </section>

        </Modal>
    )
}
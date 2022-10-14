import React, { useState, FormEvent, useRef } from 'react';
import styles from "./styles.module.scss";
import { api } from '../../services/apiClient';
import { toast } from 'react-toastify'
import { Input } from '../ui/Input/index';
import { Button } from '../ui/Button/index';
import ReCAPTCHA from "react-google-recaptcha";


export function ContactForm() {

    const [nameContact, setNameContact] = useState('');
    const [emailContact, setEmailContact] = useState('');
    const [textContact, setTextContact] = useState('');

    const [userValid, setUserValid] = useState(false);

    const captcha = useRef(null);

    function isEmail(emailContact: string) {
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emailContact)
    }


    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            if (captcha.current.getValue()) {
                console.log('Usuario válido!')
                setUserValid(true)
            } else {
                console.log('Por favor, acerte o recaptcha!')
                toast.error('Por favor, acerte o recaptcha!')

                return;
            }

            if (nameContact === '') {
                toast.error('Digite seu nome!');
                return;
            }

            if (!isEmail(emailContact)) {
                toast.error('Por favor digite um email valido!');
                return;
            }

            if (textContact === '') {
                toast.error('Digite sua mensagem!');
                return;
            }

            await api.post('/contactform', {
                nameContact: nameContact,
                emailContact: emailContact,
                textContact: textContact
            });

            toast.success('Mensagem enviada com sucesso!');

            setNameContact('');
            setEmailContact('');
            setTextContact('');

            await api.post('/sendemail');

        } catch (error) {
            console.log(error)
        }

    }

    const onChange = () => {
        if (captcha.current.getValue()) {
            console.log('Usuario não é um robo!')
        }
    }

    return (
        <>
            <section className={styles.sectionNewslatter}>

                <form className={styles.formBox} onSubmit={handleRegister}>

                    <Input
                        type="text"
                        name="name"
                        placeholder="Nome"
                        value={nameContact}
                        onChange={(e) => setNameContact(e.target.value)}
                    />

                    <Input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={emailContact}
                        onChange={(e) => setEmailContact(e.target.value)}
                    />

                    <textarea
                        name="textarea"
                        placeholder="Sua mensagem..."
                        value={textContact}
                        onChange={(e) => setTextContact(e.target.value)}
                    />

                    <ReCAPTCHA
                        className={styles.recaptcha}
                        ref={captcha}
                        sitekey="6Lc8Hu8hAAAAAB4EHDuIsWxMk9Hfn5Wigm-RpdoB"
                        onChange={onChange}
                    />

                    <Button
                        type="submit"
                    >
                        Enviar
                    </Button>

                </form>

            </section>
        </>
    )
}
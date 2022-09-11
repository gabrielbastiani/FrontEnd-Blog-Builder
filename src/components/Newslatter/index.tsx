import React, { useState, FormEvent } from 'react';
import styles from "./styles.module.scss";
import { api } from '../../services/apiClient';
import { AiFillLock } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { Input } from '../ui/Input/index';
import { Button } from '../ui/Button/index';


export function Newslatter() {

    const [nameEmail, setNameEmail] = useState('');
    const [emailName, setEmailName] = useState('');

    function isEmail(emailName: string) {
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emailName)
    }


    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {

            if (nameEmail === '') {
                toast.error('Digite seu nome!');
                return;
            }

            if (!isEmail(emailName)) {
                toast.error('Por favor digite um email valido!');
                return;
            }

            const data = await api.post('/newslatter', {
                nameEmail: nameEmail,
                emailName: emailName
            });

            toast.success('Dados enviados com sucesso!');
           
            setNameEmail('');
            setEmailName('');

        } catch (error) {
            toast.error('Esse endereço de e-mail ja está cadastrado!');
            console.log(error)
        }

    }


    return (
        <>
            <section className={styles.sectionNewslatter}>

                <h2>Receba nosso conteúdo</h2>

                <form className={styles.formBox} onSubmit={handleRegister}>
                    <label>Nome*: </label>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Digite seu nome"
                        value={nameEmail}
                        onChange={(e) => setNameEmail(e.target.value)}
                    />

                    <label>E-mail*: </label>

                    <Input
                        type="email"
                        name="email"
                        placeholder="Digite seu melhor e-mail"
                        value={emailName}
                        onChange={(e) => setEmailName(e.target.value)}
                    />

                    <Button
                        type="submit"
                    >
                        Cadastrar
                    </Button>
                </form>

                <span><AiFillLock size={18} />Não enviamos spam. Seu e-mail está 100% seguro!</span>

            </section>
        </>
    )
}
import React, { useState, FormEvent, useRef } from 'react';
import styles from "./styles.module.scss";
import { api } from '../../services/apiClient';
import { AiFillLock } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { Input } from '../ui/Input/index';
import { Button } from '../ui/Button/index';


export function Newslatter() {

    const [nameEmail, setNameEmail] = useState('');
    const [emailName, setEmailName] = useState('');


    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {

            if (nameEmail === '') {
                toast.error('Digite seu nome!');
                return;
            }

            if (emailName === '') {
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

            await api.post('/sendemailnews')

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
                    

                    <div className={styles.buttonSend}>
                        <Button
                            type="submit"
                        >
                            Cadastrar
                        </Button>
                    </div>

                </form>

                <span><AiFillLock size={18} />Não enviamos spam. Seu e-mail está 100% seguro!</span>

            </section>
        </>
    )
}
import React, { useState, FormEvent } from 'react';
import styles from "./styles.module.scss";
import { api } from '../../services/apiClient';
import Link from '../../../node_modules/next/link';
import { toast } from 'react-toastify'


export function Newslatter() {

    const [nameEmail, setNameEmail] = useState('');
    const [emailName, setEmailName] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
    
        if (nameEmail === '' || emailName === '') {
          toast.error('Digite seu nome e seu melhor e-mail!')
    
          return;
        }
    
        const data = await api.post(`/newslatter`, {
            nameEmail: nameEmail,
            emailName: emailName
        });
        
        toast.success('Dados enviados com sucesso!')

        setNameEmail('');
        setEmailName('');

      }


    return (
        <>
            <section className={styles.sectionNewslatter}>

                <h2>Receba nosso conteúdo</h2>

                <form onSubmit={handleRegister}>
                    <label>Nome*: </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Digite seu nome"
                        className={styles.inputName}
                        value={nameEmail}
                        onChange={(e) => setNameEmail(e.target.value)}
                    />

                    <label>E-mail*: </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Digite seu melhor e-mail"
                        className={styles.inputEmail}
                        value={emailName}
                        onChange={(e) => setEmailName(e.target.value)}
                    />

                    <button
                        type="submit"
                        className={styles.buttonNewslatter}
                    >
                        Cadastrar
                    </button>
                </form>
            </section>
        </>
    )
}
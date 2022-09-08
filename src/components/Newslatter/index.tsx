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

    const [inputEmailErr, setInputEmailErr] = useState(false);


    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            
            if (nameEmail === '') {
                toast.error('Digite seu nome ou email valido!')
                return;
            }

            const validEmail = new RegExp("/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/");

            if (!validEmail.test(emailName)) {
                
                const data = await api.post('/newslatter', {
                    nameEmail: nameEmail,
                    emailName: emailName
                });
                
                toast.success('Dados enviados com sucesso!');
                
            } else {

                toast.error('Por favor digete um email valido!');
            }
           
            setNameEmail('');
            setEmailName('');
        } catch (error) {
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

                    {inputEmailErr && <p>Por favor digete um email valido!</p>}

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
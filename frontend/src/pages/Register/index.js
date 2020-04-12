import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from "../../assets/logo.svg";

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();
    
    async function handleRegister(e){
        e.preventDefault();
        const data = { name, email, whatsapp, city, uf };
        try{
            const resp = await api.post('ongs', data);
            alert(`Seu ID de acesso é: ${resp.data.id}`);
            history.push('/');
        }catch(err){
            alert(`Erro ao cadastrar, verifique os dados e tente novamente :/`);
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas
                        a encontrarem os casos de sua ONG.
                    </p>
                    <Link to="/" className="back-ink">
                        <FiArrowLeft width={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG" 
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input type="email" 
                        placeholder="Email da ONG"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input 
                        placeholder="WhatsApp da ONG"
                        value={whatsapp}
                        onChange={e => setWhatsApp(e.target.value)} />
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} />
                        <input 
                            className="uf" 
                            placeholder="UF" 
                            value={uf}
                            onChange={e => setUf(e.target.value)} />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
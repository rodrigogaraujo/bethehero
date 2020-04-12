import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handlerLogin(e){
        e.preventDefault();
        try{
            const resp = await api.post('sessions', {id});
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', resp.data.name);

            history.push('/profile');
        }catch(err){
            alert('Whooops.. Este ID não é válido :/')
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handlerLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)} />
                    <button type="submit" className="button">Entrar</button>
                </form>
                <Link to="/register" className="back-ink">
                    <FiLogIn width={16} color="#E02041" />
                    Não tenho cadastro
                </Link>
            </section>
            <img src={heroesImg} />
        </div>
    );
}
import React,{useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident(){
    const [title,setTitle] = useState('');
    const [descri,setDescri] = useState('');
    const [value,setValue] = useState('');
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    
    async function handleNewIncident(e){
        e.preventDefault();
        const data = {title,descri,value,};
        try{
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        }catch{
            alert('Erro ao cadastrar, tente novamente');
        }
    }
    
    return (
        <div className="register-container">

            <div className="content">
                <section>
                    <img src = {logoImg} alt="Be The Hero"/>
                    <h1> Cadastrar novo caso </h1>
                    <p> Descreva o caso detalhadamente para encontrar um herói para resolver isso. </p>
                    <Link className= "back-link" to= "/profile"> 
                    <FiArrowLeft size={16} color= "#E02041" />
                    Voltar para home </Link>
                
                </section>
                <form onSubmit={handleNewIncident} >
                    <input placeholder= "Título do caso" 
                     value = {title}
                     onChange ={e => setTitle(e.target.value)}
                    
                    />
                    <textarea placeholder= "Descrição"
                     value = {descri}
                     onChange ={e => setDescri(e.target.value)}
                    />
                    <input placeholder= "Valor em reais"
                     value = {value}
                     onChange ={e => setValue(e.target.value)}
                    />
                    <button className = "button" type= "submit" > Cadastrar </button>

                </form>
            </div>


        </div>





    );

}
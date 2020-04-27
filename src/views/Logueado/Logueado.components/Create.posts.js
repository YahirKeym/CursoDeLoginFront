import React,{useState} from 'react';
import Fetch from '../../../components/Fetch.js';
import {Link} from 'react-router-dom'
/**
 * 
 * @param {*} Titulo 
 * @param {*} Contenido 
 */
function createPost(Titulo,Contenido){
    let Options = {
        method:'POST',
        body:JSON.stringify({
            Titulo: Titulo,
            Contenido: Contenido
        }),
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        }
    }
    Fetch('create/posts',Options).then(({notification})=>{
        alert(notification.msg);
    }).catch(err=>{
        console.log(err)
    })
}
/**
 * 
 */
function Create(){
    const [Titulo,setTitulo] = useState('');
    const [Contenido,setContenido] = useState('');
    return(
        <React.Fragment>
            <Link to='/'>Regresar</Link>
            <form onSubmit={e=>{e.preventDefault(); createPost(Titulo,Contenido);}}>
                <input type="text" className="form-control" placeholder="Agrega un titulo" onChange={({target})=>{
                    setTitulo(target.value);
                }}/>
                <textarea className="form-control" placeholder="Agrega un contenido" onChange={({target})=>{
                    setContenido(target.value);
                }}/>
                <button className="btn btn-success">
                    Crear
                </button>
            </form>
        </React.Fragment>
    )
}
export default Create;
import React,{useState} from 'react';
import Fetch from '../../../components/Fetch.js';
import {useParams,Link} from 'react-router-dom';
function UpdateData(IdPost,{Titulo,Contenido}){
    let Options={
        method:'PATCH',
        headers:{
            Accept:'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            IdPosts:IdPost,
            Titulo:Titulo,
            Contenido:Contenido
        })
    }
    Fetch('update/posts',Options).then(({notification})=>{
        alert(notification.msg)
    }).catch(err=>{
        console.log(err);
    })
}
/**
 * 
 */
function GetDataPost(IdPost,setData,setPeticion){
    setPeticion(false);
    Fetch(`get/onePost/${IdPost}`).then(({data})=>{
        const {Titulo,Contenido} = data;
        setData({
            Titulo: Titulo,
            Contenido: Contenido
        })
    })
}
/**
 * 
 * @param {*} props 
 */
function UpdatePost(props){
    const [peticionData,setPeticionData]= useState(true);
    const [data, setData] = useState({
        Titulo: '',
        Contenido: ''
    })
    const {IdPost} = useParams();
    if(peticionData){
        GetDataPost(IdPost,setData,setPeticionData);
    }
    return(
        <div>
            <input type='text' placeholder="Añade un titulo" 
            name="Titulo" defaultValue={data.Titulo} onChange={({target})=>{
                setData({[target.name]:target.value})
            }}
            className="form-control" />
            <textarea name="Contenido" className="form-control" onChange={({target})=>{
                setData({...data,'Contenido':target.value})
            }}
            placeholder="Añade un contenido" defaultValue={data.Contenido} />
            <button className="btn btn-success" onClick={e=>{UpdateData(IdPost,data)}}>
                Actualizar
            </button>
            <div>
                <Link to='/'>Regresar</Link>
            </div>
        </div>
    )
}

export default UpdatePost;
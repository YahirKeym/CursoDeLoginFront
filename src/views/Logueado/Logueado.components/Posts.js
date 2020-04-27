import React,{useState} from 'react';
import Fetch from '../../../components/Fetch';
import {Link} from 'react-router-dom'
/**
 * 
 * @param {*} IdPosts 
 */
function deletePosts(IdPosts,setPeticion){
    let Options ={
        method:'DELETE',
        body:JSON.stringify({IdPosts:IdPosts}),
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        }
    }
    Fetch('delete/posts',Options).then((response)=>{
        setPeticion(true);
    }).catch(err=>{
        console.log(err);
    })
}
/**
 * 
 * @param {*} setPosts 
 * @param {*} setPeticion 
 */
function getPosts(setPosts,setPeticion){
    Fetch('get/posts').then(({data})=>{
        setPeticion(false);
        setPosts(data);
    }).catch(err=>{
        console.log(err);
    })
}
/**
 * 
 */
function Posts(){
    const [peticion,setPeticion] = useState(true);
    const [Posts,setPosts] = useState([]);
    if(peticion){
        getPosts(setPosts,setPeticion);
    }
    return(
        <div>
            <Link to="/create/posts">Crear un nuevo post</Link>
            {Posts.map(({Titulo,Contenido,HoraDeCreacion,IdPosts}, xId)=>{
                return (
                    <div key={xId} className="col-12 bg-primary text-white p-3 mb-1">
                        <div>
                            <h2>{Titulo}</h2>
                        </div>
                        <div>
                            <p>{Contenido}</p>
                        </div>
                        <div>
                            <label>{HoraDeCreacion}</label>
                            <button className="btn btn-danger" onClick={()=>{deletePosts(IdPosts,setPeticion)}}>
                                Eliminar
                            </button>
                            <Link className="btn btn-info" to={`update/${IdPosts}`}>Actualizar</Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts;
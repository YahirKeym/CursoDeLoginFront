import React,{useState} from 'react';
/**
 * 
 * @param {*} User 
 * @param {*} Password 
 */
function SendLogueo(User,Password){
    let dataUser = {
        User: User,
        Password: Password
    }
    let Options = {
        method:'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataUser)
    }
    fetch('http://localhost:9000/signin',Options)
    .then(response=> response.json())
    .then(({data,notification})=>{
        alert(notification.msg);
        const {Cookie,Nombre,Correo,loggued} = data;
        if(loggued){
            document.cookie = "usuarioLogueado= ;expires = Thu, 01 Jan 1970 00:00:00 GMT"
            let expires = new Date();
            expires.setTime(expires.getTime() + 86400000);
            let cookie = `usuarioLogueado=${
                Cookie
                };expires=${expires.toUTCString()};path=/`;
            document.cookie = cookie;
            window.location.reload();
        }
    })
    .catch(err=>{
        console.log(err);
    })

}
/**
 * 
 */
function FormularioDeLogueo(){
    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');
    return(
        <form onSubmit={(e)=>{e.preventDefault(); 
        SendLogueo(user,password)}} className="col-4">
            <input type="text"  placeholder="Usuario" onChange={({target})=>{setUser(target.value)}} className="form-control"/>
            <input type="password" placeholder="Password" onChange={({target})=>{setPassword(target.value)}} className="form-control"/>
            <button className="btn btn-success">
                Loguear
            </button>
        </form>
    )
}
export default FormularioDeLogueo;
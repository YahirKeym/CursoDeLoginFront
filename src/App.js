import React,{useState} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Loader from './components/Loader.jsx';
import Logueado from './views/Logueado/index.js';
import NoLogueado from './views/NoLogueado/index.js';
import GetCookie from './components/GetCookie.js';
import updateDataUser from './store/Usuario/action.js';
import {connect} from 'react-redux';
function userLogued(){
  /**
   * Para colocar una pantalla de carga
   */
  this.loading = true;
  /**
   * userData guardara los datos del usuario ya logueado
   */
  this.userData = {}
  /**
   * Verifica Si el usuario se encuentra logueado.
   */
  this.verifyUserLogued = (setLogueado,updateDataUser)=>{
    let Token = GetCookie();
    if(Token !== undefined){
      fetch(`http://localhost:9000/signin?Token=${Token}`)
      .then(response=>response.json())
      .then(({data})=>{
        let {loggued, Correo, User, Nombre} = data;
        this.loading = false;
        updateDataUser(data);
        setLogueado(loggued);
      })
      .catch(err=>{
        console.log(err);
        this.loading = false;
        setLogueado(false);
      })
    }else{
      this.loading = false;
      setLogueado(false);
    }
  }
}
/**
 * Mandamos a llamar nuestra función
 */
const userIsLoggued = new userLogued();
/**
 * 
 */
function App({updateDataUser}) {
  let [logueado,setLogueado] = useState(undefined);
  if(logueado === undefined){
    userIsLoggued.verifyUserLogued(setLogueado,updateDataUser)
  }
  if(userIsLoggued.loading){
    return (
      <Loader />
    )
  }
  return (
    <div className="App">
      {!logueado && (
        <NoLogueado />
      )}
      {logueado && (
        <Logueado />
      )}
    </div>
  );
}

export default connect(null,{updateDataUser})(App);

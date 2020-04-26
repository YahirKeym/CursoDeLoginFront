import React from 'react';
import {stateUser} from '../../store/Usuario/reducer.js';
import {connect} from 'react-redux';

function Logueado({setUserData}){
    const {Nombre,Correo,User} = setUserData;
    return(
        <React.Fragment>
                <h1>Estás Logueado {Nombre}</h1>
                <h3>{Correo}</h3>
                <h3>{User}</h3>
        </React.Fragment>
    )
}

const mapToStateData = (state)=>{
    return {
        ...state,
        ...stateUser
    }

}
export default connect(mapToStateData)(Logueado);
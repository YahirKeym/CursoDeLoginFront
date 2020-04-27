import React from 'react';
import Posts from './Logueado.components/Posts.js';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {stateUser} from '../../store/Usuario/reducer.js';
import {connect} from 'react-redux';
import UpdatePost from './Logueado.components/Update.posts.js';
import CreatePost from './Logueado.components/Create.posts.js';

/**
 * 
 * @param {*} param0 
 */
function Logueado({setUserData}){
    const {Nombre,Correo,User} = setUserData;
    return(
        <React.Fragment>
            <section>
                <h1>Bienvenido: {Nombre}</h1>
                <h3>{Correo}</h3>
                <h3>{User}</h3>
            </section>
            <section>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/update/:IdPost' children={
                            <UpdatePost />
                        } />
                        <Route exact path='/create/posts' children={
                            <CreatePost />
                        } />
                        <Route path='/*'  >
                            <Posts />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </section>
        </React.Fragment>
    )
}
/**
 * 
 * @param {*} state 
 */
const mapToStateData = (state)=>{
    return {
        ...state,
        ...stateUser
    }

}
export default connect(mapToStateData)(Logueado);
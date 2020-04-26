import { createStore, combineReducers } from 'redux';
import setUserData from './Usuario/reducer.js';

const reducers = combineReducers({
    setUserData
})

const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
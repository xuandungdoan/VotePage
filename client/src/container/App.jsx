import React,{Component} from 'react'
import api from '../services/api'
import {Provider} from 'react-redux'
import {store} from '../store'
import {setCurrentUser, addError, setToken} from "../store/actions"
import decode from "jwt-decode"

if(localStorage.jwtToken){
    setToken(localStorage.jwtToken);
    try {
        store.dispatch(setCurrentUser(decode(localStorage.jwtToken)))
    } catch (error) {
        store.dispatch(addError(error));
        setCurrentUser({})
    }
}
const App = () => (
    <Provider store = {store}><div>working!!</div></Provider>
)
export default App;
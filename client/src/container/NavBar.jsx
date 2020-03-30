import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logOut} from '../store/actions'
const NavBar = ({auth, logOut}) => (
   <div>
        <ul>
        <li><Link to="login">Login</Link></li>
        <li><Link to="register">register</Link></li>
        <li><a onClick= {logOut}>logout</a></li>
        
    </ul>
    {auth.isAuth && <p>has been login as {auth.user.username}</p>}
   </div>
)

export default connect(store => ({auth: store.auth}), {logOut})(NavBar);
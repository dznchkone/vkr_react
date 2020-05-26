import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


export const Navbar = (props) => {
  const auth = useContext(AuthContext)
  const history = useHistory()


  let btnAuth = <li><NavLink className="teal-text text-lighten-5" to="/login" >Войти</NavLink></li>
  
  
  
  const handleLogout= event =>{
    event.preventDefault()
    auth.logout();
    history.push('/')
  }

  if(auth.isAuthenticated){
    btnAuth = <li><NavLink to="/" className="teal-text text-lighten-5" onClick={handleLogout}>Выйти</NavLink></li>
  }

  //const links = JSON.parse(props.links)
  const navLinks = props.links.map(linksItem => <li key={Math.random()*10000}><NavLink className="teal-text text-lighten-5" to={linksItem.link}>{linksItem.text}</NavLink></li>)
  return (
    <nav>
      <div className="nav-wrapper teal lighten-2">
        <span className="brand-logo"><img src={require('../img/rtk_logo.png')} width="80px" height="50px" alt="logo"></img></span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {navLinks}
          {btnAuth}
        </ul>
      </div>
    </nav >
   
  )
}
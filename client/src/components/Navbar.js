import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


export const Navbar = (props) => {
  const auth = useContext(AuthContext)
  const history = useHistory()


  let btnAuth = <li><NavLink to="/login" >Войти</NavLink></li>
  
  
  
  const handleLogout= event =>{
    event.preventDefault()
    auth.logout();
    history.push('/')
  }

  if(auth.isAuthenticated){
    btnAuth = <li><NavLink to="/" onClick={handleLogout}>Выйти</NavLink></li>
  }

  //const links = JSON.parse(props.links)
  const navLinks = props.links.map(linksItem => <li key={Math.random()*10000}><NavLink to={linksItem.link}>{linksItem.text}</NavLink></li>)
  return (
    <nav>
      <div className="nav-wrapper">
        <span className="brand-logo"><img src={require('../img/rtk_logo.png')} width="80px" height="50px"></img></span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {navLinks}
          {btnAuth}
        </ul>
      </div>
    </nav >
   
  )
}
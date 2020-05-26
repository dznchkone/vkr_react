import React, {useState,useEffect, useContext} from 'react'
import {useHttp } from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext';


export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({email:'',password:''});


  useEffect(() => {
    
    message(error)
    clearError()
    
  }, [error, message, clearError]);

  const changeHandler = event => {
    setForm({...form, [event.target.name]:event.target.value})
  }

  const registerHandler = async ()=>{
    try {
      const data = await request('/api/auth/register', 'POST',{...form})
      message(data.message)
    } catch (e) {
      
    }
  }

  const loginHandler = async ()=>{
    try {
      const data = await request('/api/auth/login', 'POST',{...form})
      auth.login(data.token, data.userId)
    } catch (e) {
      
    }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text ">
            <span className="card-title bold">Авторизация</span>
            <div className="row">
              <div className="input-field">
                <input 
                
                id="email" 
                type="text" 
                name="email"
                className="white-text"
                onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              
            
                <div className="input-field">
                  <input
                   id="password"
                   type="password"
                   name="password"
                   className="white-text"
                   onChange={changeHandler}
                  />
                  <label htmlFor="password">Пароль</label>
                </div>
              </div>
          </div>
          <div className="card-action">
            <button
            onClick={registerHandler} 
            className="btn "
            disabled={loading}
            >Регистрация</button>
            <button 
            onClick={loginHandler}
            className="btn "
            disabled={loading}
            >Вход</button>
          </div>
        </div>
      </div>
    </div>
  )
}
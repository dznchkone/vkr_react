import React, {useState,useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {useHttp } from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext';
import {Loader} from './Loader'

export const CreatePlan = (props) => {

  const {token} = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({name:'',price:'',description:''})
  const history = useHistory()
  

  useEffect(() => {
     message(error)
    clearError()
    
  }, [error, message, clearError]);


  const changeHandler = event => {
    setForm({...form, [event.target.name]:event.target.value})
  }

  



  const createHandler = async ()=>{
    try {
      const data = await request('/api/plan/create', 'POST',{...form},{Authorization: `Bearer ${token}`})
      
      //setIsDisabled(true)

      message(data.message)
      history.push('/dashboard')

    } catch (e) {
      
    }
  }

  if(loading){
    return <Loader/>
  }

  return (

    <div className="row dashboard-container">
      <div className="col s12 m12 absolute-center">
        <div className="card blue-grey">
          <div className="card-content white-text">
            <div className="row">
              <div className="input-field col s12">
                <input 
                id="name" 
                type="text" 
                className="white-text"
                name="name" 
                onChange={changeHandler}
                
                />
                <label htmlFor="name" className="white-text">Название</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input 
                id="price" 
                type="number" 
                min="0"
                className="white-text"
                name="price"
                onChange={changeHandler}
                
                />
                <label htmlFor="price" className="white-text">Стоимость</label>
              </div>
            </div>

            <div className="row description">
              <div className="input-field col s12">
                <textarea 
                id="description" 
                rows="20"
                className="materialize-textarea" 
                name="description"
                defaultValue={""} 
                onChange={changeHandler}
                
                />
                <label htmlFor="textarea1" className="white-text">Описание</label>
              </div>
            </div>

            <div className="card-action">
              <button 
              className="btn orange darken-4"
              
              onClick={createHandler}
              >Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}
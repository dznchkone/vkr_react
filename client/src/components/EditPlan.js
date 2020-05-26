import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useMessage} from '../hooks/message.hook'
import {Loader} from '../components/Loader'





export const EditPlan = (props) => {
  const {token} = useContext(AuthContext)
  const {request, loading,error,clearError} = useHttp()
  const [plan, setPlan] = useState({})
  const [form, setForm] = useState({name:'',price:'',description:''})
  const history = useHistory()

  const message = useMessage()
  const planId = props.planId

  useEffect(() => {
    message(error)
   clearError()
   
 }, [error, message, clearError]);
 

 const changeHandler = event => {
   setForm({...form, [event.target.name]:event.target.value})
 }

  const getPlan = useCallback(async () => {
    try {
      const fetched = await request(`/api/plan/${planId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setPlan(fetched)
      
    } catch (e) {}
  }, [token, planId, request])

  useEffect(() => {
    getPlan()
  }, [getPlan])

  const editHandler = async ()=>{
    try {
      if(form.name===""){
        form.name=plan.name
      }

      if(form.price===""){
        form.price=plan.price
      }

      if(form.description===""){
        form.description=plan.description
      }
      const data = await request(`/api/plan/edit/${planId}`, 'POST',{...form},{Authorization: `Bearer ${token}`})
      
      //setIsDisabled(true)

      message(data.message)
      history.push('/dashboard')

    } catch (e) {
      
    }
  }


  if (loading) {
    return <Loader />
  }

  return (
    <div className="center">
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card">
          <div className="card-image">
            <img src={require('../img/rtk_logo.png')}/>
            <input 
            type="text" 
            placeholder={plan.name}
            name="name"
            onChange={changeHandler}
            ></input>
          </div>
          <div className="card-content">
            <input 
            type="number" 
            placeholder={plan.price}
            name="price"
            onChange={changeHandler}
            ></input>
            <textarea 
            rows="20"
            placeholder={plan.description}
            name="description"
            onChange={changeHandler}
            ></textarea>
          </div>
          <div className="card-action">
          <button 
              className="btn"
              onClick={editHandler}
              >Сохранить</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
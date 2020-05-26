import React, { useContext,useState, useCallback, useEffect } from 'react'
import {Navbar} from '../components/Navbar'
import {PlanCard} from '../components/PlanCard'
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook'
import {Loader} from '../components/Loader'


const NAVBAR_LINKS = [
  {"link": "/dashboard", "text":"Панель управления"}
]



export const MainPage = () => {
  const {token} = useContext(AuthContext)
  const message = useMessage()

  const [plans, setPlans] = useState([])
  const {loading, request} = useHttp()


  const fetchPlans = useCallback( async () => {
    try {
      const fetched = await request('/api/plan', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setPlans(fetched)
    } catch (e) {
      
    }
  },[token,request])

  useEffect(()=>{
    fetchPlans()
  },[fetchPlans])

  if(loading){
    return <Loader/>
  }

  return (
    
    <div>
      <Navbar links={NAVBAR_LINKS}></Navbar>
      <div className="row plans-wrapper">
      {plans.map(plan=>{
        return ( 
        <PlanCard plan={plan}/>
        )
      })}
      </div>
      

    </div>
  )
}
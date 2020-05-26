import React, { useContext,useState, useCallback, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook'
import {Loader} from './Loader'



export const PlansList = (props) => {
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

  if(plans.length === 0) {
    return (
      <p className="center">Тарифов пока нет</p>
    )
  }

  const deleteHandler = async (event) =>{
    try {
      const data = await request(`/api/plan/delete/${event.target.dataset.planId}`,'POST',null,{
        Authorization: `Bearer ${token}`
      })
      message(data.message)
      fetchPlans()
    } catch (e) {
      
    }
  }

  
  return (
    <div>
      <h3> Тарифы</h3>



      <table>
        <thead>
          <tr>
              <th>Название тарифа</th>
              <th>Стоимость</th>
              <th className="right-align">Действия</th>
          </tr>
        </thead>

        <tbody>
          
          {plans.map(plan =>{ return (
            <tr key={plan._id}>
              <td>{plan.name}</td>
              <td>{plan.price+'руб.'}</td>
              <td>
                
                <button 
                onClick={deleteHandler}
                data-plan-id={plan._id}
                
                className="btn btn-small right  btn--left-margin blue-grey"
                >
                  Удалить
                  <i className="material-icons small">clear</i>
                </button>
                <Link 
                to={`/dashboard/editplan/${plan._id}`}
                
                className="btn btn-small right deep-purple"
                >
                  Редактировать
                  <i className="material-icons small">edit</i>
                </Link>
              </td>
            </tr>
          )

})}
          
        </tbody>
      </table>
            


      
    </div>
   
  )
}
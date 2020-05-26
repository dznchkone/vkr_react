import React from 'react'
import {useParams} from 'react-router-dom'
import {Navbar} from '../components/Navbar'
import { PlansList } from '../components/PlansList'
import { CreatePlan } from '../components/CreatePlan'
import { EditPlan } from '../components/EditPlan'


const DASHBOARD_LINKS = [
  {"link" : "/dashboard/createPlan", "text" : "Создать тариф"},
  {"link" : "/dashboard/listPlans", "text" : "Список тарифов"},
  {"link": "/", "text":"Главная"}
]





export const Dashboard = (props) => {
  const planId = useParams().id
  let component = <PlansList/>


  switch (props.action) {
    case 'createplan':
      component = <CreatePlan/>
      break;
    case 'listplans':
      component = <PlansList/>
      break;
    case 'editplan':
      component = <EditPlan planId={planId}/>
      break;
    default:
      break;
  }

  return (
    <div>
      <Navbar links={DASHBOARD_LINKS}></Navbar>
      
         {component}
      
      
    </div>
  )
}
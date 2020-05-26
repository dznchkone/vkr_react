import React from 'react'


export const PlanCard = (props)=>{
  const plan = props.plan

  return (
    
        <div className="card blue-grey darken-1 plan">
          <div className="card-image card-panel">
            <img src={require('../img/rtk_logo.png')} alt={plan.name}/>
            <h4 className="black-text plan-name">{plan.name}</h4>
          </div>
          <div className="card-content">
            <h4 className="white-text">{plan.price+"руб."}</h4>
            <p className="card-panel card-content__text">{plan.description}</p>
          </div>
          <div className="card-action">
          <button 
              className="btn orange darken-4"
              >Подключить</button>
          </div>
        </div>
      
    

  )
}
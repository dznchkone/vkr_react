import React from 'react'


export const PlanCard = (props)=>{
  const plan = props.plan

  return (
    <div className="col s12">
        <div className="card">
          <div className="card-image">
            <img src={require('../img/rtk_logo.png')}/>
            <h3 className="black-text plan-name">{plan.name}</h3>
          </div>
          <div className="card-content">
            <h4>{plan.price+"руб."}</h4>
            <p>{plan.description}</p>
          </div>
          <div className="card-action">
          <button 
              className="btn"
              >Подключить</button>
          </div>
        </div>
      </div>
    

  )
}
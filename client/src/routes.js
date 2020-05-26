import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Dashboard} from './pages/Dashboard';
import {MainPage} from './pages/MainPage';
import {AuthPage} from './pages/AuthPage'


export const useRoutes = (isAuthentificated) =>{
  if (isAuthentificated){
    return (
      <Switch>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/dashboard/createplan" exact>
          <Dashboard action='createplan'/>
        </Route>
        <Route path="/dashboard/listplans" exact>
          <Dashboard action='listplans' />
        </Route>
        <Route path="/dashboard/editplan/:id" exact>
          <Dashboard action='editplan' />
        </Route>
        <Route path="/dashboard/deleteplan/:id" exact>
          <Dashboard action='deleteplan' />
        </Route>
        <Route path="/" exact>
          <MainPage/>
        </Route>
        
        <Redirect to="/"/>
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <MainPage/>
      </Route>
      <Route path="/login">
          <AuthPage/>
        </Route>
      <Redirect to="/"/>
    </Switch>
  )

}
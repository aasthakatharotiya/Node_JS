import React from 'react'
import Dashboard from './Component/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Component/SignIn'
import SignUp from './Component/SignUp'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={SignUp}></Route>
        <Route path='/signin' Component={SignIn}></Route>
        <Route path='/dashboard' Component={Dashboard}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

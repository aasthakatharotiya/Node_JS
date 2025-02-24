import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './Component/SignUp'
import RecipeDashboard from './Component/RecipeDashboard'
import SignIn from './Component/SignIn'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp/>}></Route>
          <Route path='/SignIn' element={<SignIn/>}></Route>
          <Route path='/RecipeDashboard' element={<RecipeDashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

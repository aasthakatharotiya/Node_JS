import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SelectRole from './Component/SelectRole'
import AdminRegister from './Component/Admin/AdminRegister'
import ManagerRegister from './Component/Manager/ManagerRegister'
import EmployeeRegister from './Component/Employee/EmployeeRegister'
import AdminLogin from './Component/Admin/AdminLogin'
import ManagerLogin from './Component/Manager/ManagerLogin'
import EmployeeLogin from './Component/Employee/EmployeeLogin'
import AdminDashboard from './Component/Admin/AdminDashboard'
import EmployeeDashboard from './Component/Employee/EmployeeDashboard'
import ManagerDashboard from './Component/Manager/ManagerDashboard'
// ./Component/Admin/
// ./Component/Manager/
// ./Component/Employee/

export default function App() {

  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, null, window.location.href)
    }

    window.history.pushState(null, null, window.location.href)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SelectRole />} />
          <Route path='/AdminRegister' element={<AdminRegister />} />
          <Route path='/AdminLogin' element={<AdminLogin />} />
          <Route path='/AdminDashboard' element={<AdminDashboard />} />
          <Route path='/ManagerRegister' element={<ManagerRegister />} />
          <Route path='/ManagerLogin' element={<ManagerLogin />} />
          <Route path='/ManagerDashboard' element={<ManagerDashboard />} />
          <Route path='/EmployeeRegister' element={<EmployeeRegister />} />
          <Route path='/EmployeeLogin' element={<EmployeeLogin />} />
          <Route path='/EmployeeDashboard' element={<EmployeeDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

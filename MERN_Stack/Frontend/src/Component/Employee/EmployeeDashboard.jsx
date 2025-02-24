import React, { useState } from 'react'
import Dashboard from './Dashboard'
import EmployeeSideBar from './EmployeeSideBar'
import EmployeeHeader from './EmployeeHeader'
import EmployeeProfile from './EmployeeProfile'
import EmpAttendance from './EmpAttendance'
import DailyReport from './DailyReport'
import MonthlyReport from './MonthlyReport'
import YearlyReport from './YearlyReport'
import EmpSalary from './EmpSalary'
import Employee from './Employee'

export default function EmployeeDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div className="admin_dashboard">
      <div className="admin_sidebar">
        <EmployeeSideBar setActiveSection={setActiveSection} activeSection={activeSection} />
      </div>

      <div className="admin_main_div">
        <div className="admin_header">
          <EmployeeHeader setActiveSection={setActiveSection} />
        </div>

        <div className="admin_page">
          {activeSection === 'dashboard' && <Dashboard/>}
          {activeSection === 'employee' && <Employee/>}
          {activeSection === 'attendance' && <EmpAttendance/>}
          {activeSection === 'salary' && <EmpSalary/>}
          {activeSection === 'Daily_reports' && <DailyReport/>}
          {activeSection === 'Monthly_reports' && <MonthlyReport/>}
          {activeSection === 'Yearly_reports' && <YearlyReport/>}
          {activeSection === 'Profile' && <EmployeeProfile />}
        </div>
      </div>

    </div>
  )
}
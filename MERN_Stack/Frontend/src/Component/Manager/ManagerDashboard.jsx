import React, { useState } from 'react'
import HRSideBar from './HRSideBar'
import HRHeader from './HRHeader'
import HRProfile from './HRProfile'
import HRSalary from './HRSalary'
import HRAttendance from './HRAttendance'
import Dashboard from './Dashboard'
import DailyReport from './DailyReport'
import MonthlyReport from './MonthlyReport'
import Manager from './Manager'
import YearlyReport from './YearlyReport'

export default function ManagerDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div className="admin_dashboard">
      <div className="admin_sidebar">
        <HRSideBar setActiveSection={setActiveSection} activeSection={activeSection} />
      </div>

      <div className="admin_main_div">
        <div className="admin_header">
          <HRHeader setActiveSection={setActiveSection} />
        </div>

        <div className="admin_page">
          {activeSection === 'dashboard' && <Dashboard/>}
          {activeSection === 'manager' && <Manager/>}
          {activeSection === 'attendance' && <HRAttendance/>}
          {activeSection === 'salary' && <HRSalary/>}
          {activeSection === 'Daily_reports' && <DailyReport/>}
          {activeSection === 'Monthly_reports' && <MonthlyReport/>}
          {activeSection === 'Yearly_reports' && <YearlyReport/>}
          {activeSection === 'Profile' && <HRProfile/>}
        </div>
      </div>

    </div>
  )
}
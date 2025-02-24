import React, { useState } from 'react'
import AdminSideBar from './AdminSideBar'
import AdminHeader from './AdminHeader'
import AdminManager from './AdminManager'
import AdminEmployee from './AdminEmployee'
import AdminHRAttendance from './HRAttendance'
import AdminEmpAttendance from './EmpAttendance'
import DailyReport from './DailyReport'
import MonthlyReport from './MonthlyReport'
import YearlyReport from './YearlyReport'
import AdminProfile from './AdminProfile'
import Dashboard from './Dashboard'

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div className="admin_dashboard">
      <div className="admin_sidebar">
        <AdminSideBar setActiveSection={setActiveSection} activeSection={activeSection} />
      </div>

      <div className="admin_main_div">
        <div className="admin_header">
          <AdminHeader setActiveSection={setActiveSection} />
        </div>

        <div className="admin_page">
          {activeSection === 'dashboard' && <Dashboard/>}
          {activeSection === 'manager' && <AdminManager />}
          {activeSection === 'employee' && <AdminEmployee />}
          {activeSection === 'HR_attendance' && <AdminHRAttendance />}
          {activeSection === 'employee_attendance' && <AdminEmpAttendance />}
          {activeSection === 'Daily_reports' && <DailyReport />}
          {activeSection === 'Monthly_reports' && <MonthlyReport />}
          {activeSection === 'Yearly_reports' && <YearlyReport />}
          {activeSection === 'Profile' && <AdminProfile />}
        </div>
      </div>

    </div>
  )
}
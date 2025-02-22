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

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div className="admin_dashboard">
      <div className="admin_sidebar">
        <AdminSideBar setActiveSection={setActiveSection} activeSection={activeSection} />
      </div>

      <div className="admin_main_div">
        <div className="admin_header">
          <AdminHeader />
        </div>

        <div className="admin_page">
          {activeSection === 'dashboard' &&
            <div>

            </div>
          }
          {activeSection === 'manager' &&
            <div>
              <AdminManager />
            </div>
          }
          {activeSection === 'employee' &&
            <div>
              <AdminEmployee />
            </div>
          }
          {activeSection === 'HR_attendance' &&
            <div>
              <AdminHRAttendance />
            </div>
          }
          {activeSection === 'employee_attendance' &&
            <div>
              <AdminEmpAttendance />
            </div>
          }
          {activeSection === 'Daily_reports' &&
            <div>
              <DailyReport/>
            </div>
          }
          {activeSection === 'Monthly_reports' &&
            <div>
              <MonthlyReport/>
            </div>
          }
          {activeSection === 'Yearly_reports' &&
            <div>
              <YearlyReport/>
            </div>
          }
          {activeSection === 'Profile' &&
            <div>
              <AdminProfile/>
            </div>
          }
        </div>
      </div>

    </div>
  )
}
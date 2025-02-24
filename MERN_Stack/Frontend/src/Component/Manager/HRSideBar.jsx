import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HRSideBar({ setActiveSection, activeSection }) {
    const navigate = useNavigate()
    const [manager, setManager] = useState(null)
    
        useEffect(() => {
            const token = localStorage.getItem("managerToken")
            const managerData = localStorage.getItem("managerData")
    
            if (!token) {
                navigate('/')
            }
            else if (managerData) {
                setManager(JSON.parse(managerData))
            }
        }, [])
    
        const handleLogout = () => {
            localStorage.removeItem("managerToken")
            localStorage.removeItem("managerData")
            navigate('/')
        }
    

    const [activeMenu, setActiveMenu] = useState(null)

    const toggleSubMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu)
    }

    return (
        <div>
            <div className="profile">
                {manager ? (
                    <div className='profile_flex'>
                        <button>
                            <img src={`http://localhost:2006/uploads/${manager.img}`} alt="" />
                        </button>
                        <h3>{manager.name}</h3>
                    </div>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>

            <div className="side_bar_text">
                <ul>
                    <li
                        className={`menu-item ${activeSection === "dashboard" ? "active" : ""}`}
                        onClick={() => setActiveSection("dashboard")}
                    >
                        <a href="#">
                            <span className="menu-icon"><i className="ri-bar-chart-2-fill"></i></span>
                            <span className="menu-title">Dashboard</span>
                        </a>
                    </li>

                    <li
                        className={`menu-item ${activeSection === "manager" ? "active" : ""}`}
                        onClick={() => setActiveSection("manager")}
                    >
                        <a href="#">
                            <span className="menu-icon"><i className="ri-bar-chart-2-fill"></i></span>
                            <span className="menu-title">Manager</span>
                        </a>
                    </li>

                    {/* <li
                        className={`menu-item ${activeSection === "employee" ? "active" : ""}`}
                        onClick={() => setActiveSection("employee")}
                    >
                        <a href="#">
                            <span className="menu-icon"><i className="ri-bar-chart-2-fill"></i></span>
                            <span className="menu-title">Employee</span>
                        </a>
                    </li> */}

                    <li
                        className={`menu-item ${activeSection === "attendance" ? "active" : ""}`}
                        onClick={() => setActiveSection("attendance")}
                    >
                        <a href="#">
                            <span className="menu-icon"><i className="ri-bar-chart-2-fill"></i></span>
                            <span className="menu-title">Attendance</span>
                        </a>
                    </li>

                    <li
                        className={`menu-item ${activeSection === "salary" ? "active" : ""}`}
                        onClick={() => setActiveSection("salary")}
                    >
                        <a href="#">
                            <span className="menu-icon"><i className="ri-bar-chart-2-fill"></i></span>
                            <span className="menu-title">Salary</span>
                        </a>
                    </li>

                    {/* <li className="menu-item sub-menu">
                        <a href="#"
                            onClick={() => {
                                toggleSubMenu("attendance")
                                setActiveSection("HR_attendance")
                            }}
                            className={`menu_item ${["HR_attendance", "employee_attendance"].includes(activeSection) ? "active" : ""}`}>
                            <span className="menu-icon"><i className="ri-bar-chart-2-fill"></i></span>
                            <span className="menu-title">Attendance</span>
                        </a>

                        <div className={`sub-menu-list ${activeMenu === "attendance" ? "open" : ""}`}>
                            <ul>
                                <li className={`menu-item ${activeSection === "HR_attendance" ? "blue" : ""}`}
                                    onClick={() => setActiveSection("HR_attendance")}>
                                    <a href="#">HR Attendance</a>
                                </li>
                                <li className={`menu-item ${activeSection === "employee_attendance" ? "blue" : ""}`}
                                    onClick={() => setActiveSection("employee_attendance")}>
                                    <a href="#">Employee Attendance</a>
                                </li>
                            </ul>
                        </div>
                    </li> */}

                    <li className="menu-item sub-menu">
                        <a href="#"
                            onClick={() => {
                                toggleSubMenu("reports")
                                setActiveSection("Daily_reports")
                            }}
                            className={`menu_item ${["Daily_reports", "Monthly_reports", "Yearly_reports"].includes(activeSection) ? "active" : ""}`}>
                            <span className="menu-icon"><i className="ri-file-chart-line"></i></span>
                            <span className="menu-title">Reports</span>
                        </a>

                        <div className={`sub-menu-list ${activeMenu === "reports" ? "open" : ""}`}>
                            <ul>
                                <li className={`menu-item ${activeSection === "Daily_reports" ? "blue" : ""}`}
                                    onClick={() => setActiveSection("Daily_reports")}>
                                    <a href="#">Daily Report</a>
                                </li>
                                <li className={`menu-item ${activeSection === "Monthly_reports" ? "blue" : ""}`}
                                    onClick={() => setActiveSection("Monthly_reports")}>
                                    <a href="#">Monthly Report</a>
                                </li>
                                <li className={`menu-item ${activeSection === "Yearly_reports" ? "blue" : ""}`}
                                    onClick={() => setActiveSection("Yearly_reports")}>
                                    <a href="#">Yearly Report</a>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="menu-item sub-menu">
                        <a href="#"
                            onClick={() => {
                                toggleSubMenu("settings")
                                setActiveSection("Profile")
                            }}
                            className={`menu_item ${["Profile"].includes(activeSection) ? "active" : ""}`}>
                            <span className="menu-icon"><i className="ri-settings-2-fill"></i></span>
                            <span className="menu-title">Settings</span>
                        </a>

                        <div className={`sub-menu-list ${activeMenu === "settings" ? "open" : ""}`}>
                            <ul>
                                <li className={`menu-item ${activeSection === "Profile" ? "blue" : ""}`}
                                    onClick={() => setActiveSection("Profile")}>
                                    <a href="#">Profile</a>
                                </li>
                                <li className="menu-item" onClick={handleLogout}><a href="#">Sign Out</a></li>
                            </ul>
                        </div>
                    </li>


                </ul>
            </div>
        </div>
    )
}

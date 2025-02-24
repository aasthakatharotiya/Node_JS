import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HRHeader({ setActiveSection }) {
    const [showProfileList, setShowProfileList] = useState(false)

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

    // Close profile list on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".profile") && !event.target.closest(".profile_list")) {
                setShowProfileList(false)
            }
        }
        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    return (
        <div>
            <div className="header_flex">
                <div className="left_header">
                    <h1>Admin Panel</h1>
                </div>

                <div className="right_header">
                    <div className="profile" onClick={() => setShowProfileList(!showProfileList)}>
                        {manager ? (
                            <div className="profile_flex">
                                <button>
                                    <img src={`http://localhost:2006/uploads/${manager.img}`} alt="Profile" />
                                </button>
                                <div className="profile_text">
                                    <h3>{manager.name}</h3>
                                    {/* <p>{manager.email}</p> */}
                                </div>
                            </div>
                        ) : (
                            <h1>Loading...</h1>
                        )}
                    </div>

                    <div className={`profile_list ${showProfileList ? "show" : ""}`}>
                        <button onClick={() => setActiveSection("Profile")}>My Profile</button>
                        <button onClick={handleLogout}>Logout</button>
                        <button>Change Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

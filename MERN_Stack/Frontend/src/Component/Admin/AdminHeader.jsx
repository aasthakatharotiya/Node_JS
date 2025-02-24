import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminHeader({ setActiveSection }) {
  const [showProfileList, setShowProfileList] = useState(false)

  const navigate = useNavigate()
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    const adminData = localStorage.getItem("adminData")

    if (!token) {
      navigate('/')
    } else if (adminData) {
      setAdmin(JSON.parse(adminData))
    }
  }, [navigate])

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

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminData")
    navigate('/')
  }

  return (
    <div>
      <div className="header_flex">
        <div className="left_header">
          <h1>Admin Panel</h1>

          <button>Add Post</button>
        </div>

        <div className="right_header">
          <div className="profile" onClick={() => setShowProfileList(!showProfileList)}>
            {admin ? (
              <div className="profile_flex">
                <button>
                  <img src={`http://localhost:2006/uploads/${admin.img}`} alt="Profile" />
                </button>
                <div className="profile_text">
                  <h3>{admin.name}</h3>
                  {/* <p>{admin.email}</p> */}
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

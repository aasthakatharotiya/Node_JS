import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminHeader() {

  const navigate = useNavigate()
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    const adminData = localStorage.getItem("adminData")

    if (!token) {
      navigate('/')
    }
    else if (adminData) {
      setAdmin(JSON.parse(adminData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminData")
    navigate('/')
  }

  return (
    <div>
      <div className="profile">
        <button onClick={handleLogout}>Logout</button>

        {admin ? (
          <div className='profile_flex'>
            <button>
              <img src={`http://localhost:2006/uploads/${admin.img}`} alt="" />
            </button>
            <h3>{admin.name}</h3>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>


    </div>
  )
}

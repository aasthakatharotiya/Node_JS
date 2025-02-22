import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function ManagerDashboard() {

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

  return (
    <div>
      <div className="profile">
        <button onClick={handleLogout}>Logout</button>

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
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function EmployeeDashboard() {

  const navigate = useNavigate()
  const [emp, setEmp] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("empToken")
    const empData = localStorage.getItem("empData")

    if (!token) {
      navigate('/')
    }
    else if (empData) {
      setEmp(JSON.parse(empData))
    }
  }, [])
  
  const handleLogout = () => {
    localStorage.removeItem("empToken")
    localStorage.removeItem("empData")
    navigate('/')
  }

  return (
    <div>
      <div className="profile">
        <button onClick={handleLogout}>Logout</button>

        {emp ? (
          <div className='profile_flex'>
            <button>
              <img src={`http://localhost:2006/uploads/${emp.img}`} alt="" />
            </button>
            <h3>{emp.name}</h3>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  )
}
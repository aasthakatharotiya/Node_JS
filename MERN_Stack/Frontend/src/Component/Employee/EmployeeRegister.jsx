import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function EmployeeRegister() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("")
  // const [hobby, setHobby] = useState("")
  const [gender, setGender] = useState("")
  const [task, setTask] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState("Activate")
  const [img, setImg] = useState(null)
  const [slideDirection, setSlideDirection] = useState("slide-in-left")

  const navigate = useNavigate()

  useEffect(() => {
    setSlideDirection("slide-in-left")
  }, [])

  const handleSignUp = async (e) => {

    e.preventDefault()

    if (!name || !number || !email || !password || !img || !gender || !task || !category) {
      alert("Please fill out all fields.")
      return
    }

    const formData = new FormData()
    formData.append("name", name)
    formData.append("number", number)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("gender", gender)
    formData.append("img", img)
    formData.append("task", task)
    formData.append("category", category)
    formData.append("status", status)

    const response = await axios.post('http://localhost:2006/EmployeeRegister', formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })

    // const response = await axios.post('http://localhost:2006/EmployeeRegister', { name, number, email, password, city, gender })
    alert("Account Created Successfully!")

    if (response.data.token) {
      localStorage.setItem("empToken", response.data.token)
      localStorage.setItem("empData", JSON.stringify(response.data.employee))
      navigate('/AdminDashboard')
    }
    else {
      alert(response.data.msg)
    }

    navigate('/EmployeeDashboard')
  }

  return (
    <div className='flex_css'>

      <div className="main_singIn">


        <div className="signIn_right">

          <div className={`main_form ${slideDirection}`}>

            <center>
              <h1>Sign Up</h1>
            </center>

            <form onSubmit={handleSignUp}>
              <div className="main_info" style={{marginTop: "-40px"}}>
                <div className="left_info">
                  <h3>👤 Name</h3>
                  <input type="text" value={name} placeholder='Enter Name...' onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="right_info">
                  <h3>📞 Phone Number</h3>
                  <input type="number" value={number} placeholder='Enter Your Number...' onChange={(e) => setNumber(e.target.value)} />
                </div>
              </div>

              <div className="main_info">
                <div className="left_info">
                  <h3>📧 Email</h3>
                  <input type="email" value={email} placeholder='Enter Your Email...' onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="right_info">
                  <h3>🔒 Password</h3>
                  <input type="password" value={password} placeholder='Enter Your PassWord...' onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>

              <div className="main_info">
                <div className="left_info">
                  {/* 🏙️🏞️ */}
                  <h3>🖼️ Profile Picture</h3>
                  <input type="file" accept="image/*" className='file_input' onChange={(e) => setImg(e.target.files[0])} />
                </div>

                <div className="right_info">
                  <h3>👤 Gender</h3>
                  <div className='gender_flex'>
                    <label>
                      <input type="radio" name="gender" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} />
                      Male
                    </label>
                    <label>
                      <input type="radio" name="gender" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} />
                      Female
                    </label>
                    <label>
                      <input type="radio" name="gender" value="Other" checked={gender === "Other"} onChange={(e) => setGender(e.target.value)} />
                      Other
                    </label>
                  </div>
                </div>

              </div>

              <div className="main_info">
                <div className="left_info">
                  <h3>Priority</h3>
                  <select required value={category} name="" id="" onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Appropriate Option</option>
                    <option value="High">🔴 High</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="Low">🟢 Low</option>
                  </select>
                </div>

                <div className="right_info">
                  <h3>Task</h3>
                  <select required value={task} name="" id="" onChange={(e) => setTask(e.target.value)} >
                    <option value="">Select Your Task</option>
                    <option value="User Training">User Training</option>
                    <option value="Team Meeting">Team Meeting</option>
                    <option value="Code Review">Code Review</option>
                    <option value="Design Mockups">Design Mockups</option>
                    <option value="Database Backup">Database Backup</option>
                    <option value="Update Software">Update Software</option>
                    <option value="Security Audit">Security Audit</option>
                    <option value="Feedback Review">Feedback Review</option>
                    <option value="Market Research">Market Research</option>
                    <option value="Data Analysis">Data Analysis</option>
                  </select>
                </div>
              </div>

              <center className='btn_width'>
                <div className="btn_flex">
                  <button type='submit'>Sing Up</button>
                </div>
              </center>
            </form>

          </div>

        </div>

        <div className="signIn_left">

          <h1>Have an Account ?</h1>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea voluptatibus quae enim exercitationem pariatur assumenda. Quis voluptates, tenetur ea mollitia dolore, maiores tempora perferendis, totam aspernatur consequatur dolores sunt illum.
          </p>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/EmployeeLogin" onClick={() => setSlideDirection("slide-out-right")}>
              <button>
                Sign IN &nbsp;<i className="fa-solid fa-arrow-right"></i>
              </button>
            </Link>

            <Link to="/">
              <button>
                <i className="fa-solid fa-arrow-left"></i> &nbsp; Select Role
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

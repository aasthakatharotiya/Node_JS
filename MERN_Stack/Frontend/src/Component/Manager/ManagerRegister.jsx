import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ManagerRegister() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("")
  // const [hobby, setHobby] = useState("")
  const [gender, setGender] = useState("")
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Activate")
  const [img, setImg] = useState(null)
  const [slideDirection, setSlideDirection] = useState("slide-in-left")

  const navigate = useNavigate()

  useEffect(() => {
    setSlideDirection("slide-in-left")
  }, [])

  const handleSignUp = async (e) => {

    e.preventDefault()

    if (!name || !number || !email || !password || !img || !gender || !department || !role) {
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
    formData.append("department", department)
    formData.append("role", role)
    formData.append("status", status)

    const response = await axios.post('http://localhost:2006/ManagerRegister', formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    // const response = await axios.post('http://localhost:2006/ManagerRegister', { name, number, email, password, city, gender })
    alert("Account Created Successfully!")

    if (response.data.token) {
      localStorage.setItem("managerToken", response.data.token)
      localStorage.setItem("managerData", JSON.stringify(response.data.manager))
      navigate('/ManagerDashboard')
    }
    else {
      alert(response.data.msg)
    }

    navigate('/ManagerDashboard')
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
              <div className="main_info" style={{ marginTop: "-40px" }}>
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
                  <h3>🏢 Department</h3>
                  <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                    <option value="">Select Department</option>
                    <option value="HR">Human Resources</option>
                    <option value="IT">Information Technology</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div className="right_info">
                  <h3>💼 Role</h3>
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    {department === "HR" && (
                      <>
                        <option value="HR Manager">HR Manager</option>
                        <option value="HR Executive">HR Executive</option>
                      </>
                    )}
                    {department === "IT" && (
                      <>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="IT Manager">IT Manager</option>
                      </>
                    )}
                    {department === "Sales" && (
                      <>
                        <option value="Sales Manager">Sales Manager</option>
                        <option value="Sales Executive">Sales Executive</option>
                      </>
                    )}
                    {department === "Finance" && (
                      <>
                        <option value="Finance Manager">Finance Manager</option>
                        <option value="Accountant">Accountant</option>
                      </>
                    )}
                    {department === "Marketing" && (
                      <>
                        <option value="Marketing Manager">Marketing Manager</option>
                        <option value="Marketing Executive">Marketing Executive</option>
                      </>
                    )}
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
            <Link to="/ManagerLogin" onClick={() => setSlideDirection("slide-out-right")}>
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

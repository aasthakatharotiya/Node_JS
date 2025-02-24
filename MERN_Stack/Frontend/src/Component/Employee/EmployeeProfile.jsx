import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function EmployeeProfile() {
    const navigate = useNavigate()

    const [editId, setEditId] = useState(null)

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name || !number || !email || !task || !category || !gender) {
            alert("Please fill out all fields.")
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("number", number)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("task", task)
        formData.append("category", category)
        formData.append("gender", gender)

        if (img) {
            formData.append("img", img)
        }

        if (editId) {
            formData.append("id", editId)
            await axios.put("http://localhost:2006/EmployeeRegisterUpdate", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
        }
        else {
            await axios.post("http://localhost:2006/EmployeeRegister", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
        }

        setName("")
        setNumber("")
        setImg(null)
        setEmail("")
        setPassword("")
        setTask("")
        setCategory("")
        setGender("")
        setEditId(null)
    }

    const handleEdit = (id) => {
        if (!emp) return;

        setName(emp.name)
        setNumber(emp.number)
        setEmail(emp.email)
        setPassword(emp.password)
        setTask(emp.task)
        setCategory(emp.category)
        setGender(emp.gender)
        setEditId(id)
    }



    return (
        <div>
            <div className="Admin_Profile">
                <div className="right_Profile">
                    <form onSubmit={handleSubmit}>
                        <h1>Your Account</h1>
                        <div className="main_info" style={{ marginTop: "-10px" }}>
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
                                <button type='submit'>Submit</button>
                            </div>
                        </center>
                    </form>
                </div>

                <div className="left_Profile">
                    {emp ? (
                        <div class="container">
                            <div class="profile-card">
                                <div class="card-content">
                                    <div class="avatar-wrapper">
                                        <div class="avatar">
                                            <div class="avatar-inner">
                                                <img src={`http://localhost:2006/uploads/${emp.img}`} alt="Profile" />
                                            </div>
                                            <div class="avatar-glow"></div>
                                            <div class="avatar-border"></div>
                                        </div>
                                    </div>

                                    <div class="profile-info">
                                        <h2 class="name">{emp.name}</h2>
                                        <p class="title">{emp.email}</p>

                                        <div class="stats">
                                            <div class="stat">
                                                <span class="stat-value">1.2k</span>
                                                <span class="stat-label">Projects</span>
                                            </div>
                                            <div class="stat">
                                                <span class="stat-value">8.5k</span>
                                                <span class="stat-label">Followers</span>
                                            </div>
                                            <div class="stat">
                                                <span class="stat-value">4.7k</span>
                                                <span class="stat-label">Following</span>
                                            </div>
                                        </div>

                                        {/* <div class="bio">
                      Creative designer with 5+ years of experience in digital product design and brand identity.
                    </div> */}

                                        <div class="skills">
                                            <span class="skill">UI/UX</span>
                                            <span class="skill">Branding</span>
                                            <span class="skill">Motion</span>
                                        </div>

                                        <div class="actions">
                                            <button class="action-btn primary">
                                                <span>Follow</span>
                                                <div class="btn-effect"></div>
                                            </button>
                                            <button class="action-btn secondary" onClick={() => handleEdit(emp._id)}>
                                                <span>Edit</span>
                                                <div class="btn-effect"></div>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-shine"></div>
                                <div class="card-border"></div>
                                <div class="card-glow"></div>
                            </div>
                        </div>
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </div>
            </div>
        </div>
    )
}

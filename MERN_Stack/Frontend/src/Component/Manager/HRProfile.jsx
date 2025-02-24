import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function EmployeeProfile() {
    const navigate = useNavigate()

    const [editId, setEditId] = useState(null)

    const [hr, setHR] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("managerToken")
        const HRData = localStorage.getItem("managerData")

        if (!token) {
            navigate('/')
        }
        else if (HRData) {
            setHR(JSON.parse(HRData))
        }
    }, [])

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [password, setPassword] = useState("")
    // const [hobby, setHobby] = useState("")
    const [gender, setGender] = useState("")
    const [department, setDepartment] = useState("")
    const [role, setRole] = useState("")
    const [status, setStatus] = useState("Activate")
    const [img, setImg] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name || !number || !email || !department || !role || !gender) {
            alert("Please fill out all fields.")
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("number", number)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("department", department)
        formData.append("role", role)
        formData.append("gender", gender)

        if (img) {
            formData.append("img", img)
        }

        if (editId) {
            formData.append("id", editId)
            await axios.put("http://localhost:2006/ManagerRegisterUpdate", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
        }
        else {
            await axios.post("http://localhost:2006/ManagerRegister", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
        }

        setName("")
        setNumber("")
        setImg(null)
        setEmail("")
        setPassword("")
        setDepartment("")
        setRole("")
        setGender("")
        setEditId(null)
    }

    const handleEdit = (id) => {
        if (!hr) return;

        setName(hr.name)
        setNumber(hr.number)
        setEmail(hr.email)
        setPassword(hr.password)
        setDepartment(hr.department)
        setRole(hr.role)
        setGender(hr.gender)
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
                                <button type='submit'>Submit</button>
                            </div>
                        </center>
                    </form>
                </div>

                <div className="left_Profile">
                    {hr ? (
                        <div class="container">
                            <div class="profile-card">
                                <div class="card-content">
                                    <div class="avatar-wrapper">
                                        <div class="avatar">
                                            <div class="avatar-inner">
                                                <img src={`http://localhost:2006/uploads/${hr.img}`} alt="Profile" />
                                            </div>
                                            <div class="avatar-glow"></div>
                                            <div class="avatar-border"></div>
                                        </div>
                                    </div>

                                    <div class="profile-info">
                                        <h2 class="name">{hr.name}</h2>
                                        <p class="title">{hr.email}</p>

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
                                            <button class="action-btn secondary" onClick={() => handleEdit(hr._id)}>
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

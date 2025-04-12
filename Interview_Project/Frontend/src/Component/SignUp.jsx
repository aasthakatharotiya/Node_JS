import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [city, setCity] = useState("")
  const [password, setPassword] = useState("")
  // const [hobby, setHobby] = useState("")
  const [gender, setGender] = useState("")
  const [slideDirection, setSlideDirection] = useState("slide-in-left")

  const navigate = useNavigate()

  useEffect(() => {
    setSlideDirection("slide-in-left")
  }, [])

  const handleSignUp = async (e) => {

    e.preventDefault()

    if (!name || !number || !email || !password || !city || !gender) {
      alert("Please fill out all fields.")
      return
    }

    const res = await axios.post('http://localhost:2006/register', { name, number, email, password, city, gender })
    
    if (res.data.msg === "Admin Already Exists !") {
      alert("Admin Already Exists !")
    } 
    else if (res.data.msg === "Admin Created") {
      alert("Account Created Successfully!")
      navigate('/dashboard')
    } 
    else {
      alert("Something went wrong!")
    }
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
              <div className="main_info">
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
                  <h3>🏕️ City</h3>
                  <input type="text" value={city} placeholder='Enter Your City...' onChange={(e) => setCity(e.target.value)} />
                </div>

                {/* <div className="right_info">
                  <h3>🎨 Hobby</h3>
                  <select name="" id="" value={hobby} onChange={(e) => setHobby(e.target.value)}>
                    <option value="">Select Your Hobby</option>
                    <option value="Drawing">Drawing</option>
                    <option value="Dancing">Dancing</option>
                    <option value="Singing">Singing</option>
                    <option value="Learning">Learning</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Cooking">Cooking</option>
                  </select>
                </div> */}

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

          <Link to="/signin" onClick={() => setSlideDirection("slide-out-right")}>
            <button>
              Sign IN &nbsp;<i className="fa-solid fa-arrow-right"></i>
            </button>
          </Link>
        </div>
      </div>

    </div>
  )
}

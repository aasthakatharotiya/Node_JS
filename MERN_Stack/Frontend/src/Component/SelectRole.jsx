import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SelectRole() {
  const [selectedRole, setSelectedRole] = useState(null)
  const navigate = useNavigate()

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
  }

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/${selectedRole}Register`)
    }
  }

  return (
    <div>
      <div className='main_div_select'>

        <div className='select_head'>
          <h1>Please Select Your Role</h1>
          <p>Choose a role to continue with the registration process. Each role has different access levels and responsibilities.</p>
        </div>

        <div className="select_role">
          <button 
            className={`select_role_btn ${selectedRole === 'Admin' ? 'active' : ''}`} 
            onClick={() => handleRoleSelect('Admin')}
          >
            <i className="fa-solid fa-user-tie"></i>
            <h1>Admin</h1>
          </button>

          <button 
            className={`select_role_btn ${selectedRole === 'Manager' ? 'active' : ''}`} 
            onClick={() => handleRoleSelect('Manager')}
          >
            <i className="fa-solid fa-people-roof"></i>
            <h1>Manager</h1>
          </button>

          <button 
            className={`select_role_btn ${selectedRole === 'Employee' ? 'active' : ''}`} 
            onClick={() => handleRoleSelect('Employee')}
          >
            <i className="fa-solid fa-address-card"></i>
            <h1>Employee</h1>
          </button>
        </div>

        <div className="redirect_role">
          <button onClick={handleContinue}>Continue</button>
        </div>

      </div>
    </div>
  )
}







// import React from 'react'
// import { Link } from 'react-router-dom'

// export default function SelectRole() {
//   return (
//     <div>
//       <div className='main_div_select'>

//         <div className='select_head'>
//           <h1>Please Select Your Role</h1>
//           <p>Choose a role to continue with the registration process. Each role has different access levels and responsibilities.</p>
//         </div>

//         <div className="select_role">
//           <Link to={"/AdminRegister"}>
//             <button className='select_role_btn'>
//               <i class="fa-solid fa-user-tie"></i>
//               <h1>Admin</h1>
//             </button>
//           </Link>

//           <Link to={"/ManagerRegister"}>
//             <button className='select_role_btn'>
//               <i class="fa-solid fa-people-roof"></i>
//               <h1>Manager</h1>
//             </button>
//           </Link>

//           <Link to={"/EmployeeRegister"}>
//             <button className='select_role_btn'>
//               <i class="fa-solid fa-address-card"></i>
//               <h1>Employee</h1>
//             </button>
//           </Link>
//         </div>

//         <div className="redirect_role">
//           <button>Continue</button>
//         </div>

//       </div>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HRSalary() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [salaryData, setSalaryData] = useState({});

    useEffect(() => {
        fetchEmployees();
        loadSalaryData();
    }, []);

    const fetchEmployees = async () => {
        try {
            let response = await axios.get("http://localhost:2006/ViewManagerRegister");
            setEmployees(response.data.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const loadSalaryData = () => {
        const storedSalary = JSON.parse(localStorage.getItem("empSalary")) || {};
        setSalaryData(storedSalary);
    };

    const calculateSalary = () => {
        if (!selectedEmployee) return { basic: 0, deductions: 0, final: 0 };
        const baseSalary = selectedEmployee.salary || 20000;
        const deductions = baseSalary * 0.1;
        const finalSalary = baseSalary - deductions;

        return { basic: baseSalary, deductions, final: finalSalary };
    };

    useEffect(() => {
        if (selectedEmployee) {
            document.getElementById("salaryPopup").style.display = "block";
        }
    }, [selectedEmployee]);

    const closePopup = () => {
        document.getElementById("salaryPopup").style.display = "none";
    };

    return (
        <div className="Emp_Salary">
            <div className='Admin_emp_Salary'>
                <div className="salary-container">
                    <h1>Employee Salary</h1>
                    <select onChange={(e) => {
                        const empId = e.target.value;
                        const employee = employees.find(emp => emp._id === empId);
                        setSelectedEmployee(employee);
                    }}>
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                            <option key={emp._id} value={emp._id}>
                                {emp.name} ({emp.department})
                            </option>
                        ))}
                    </select>

                    <div id="salaryPopup" className="salary-popup" style={{ display: 'none' }}>
                        <div className='cross_btn'>
                            <button className="close-btn" onClick={closePopup}>&times;</button>
                        </div>
                        {selectedEmployee && (
                            <>
                                <p>Employee: {selectedEmployee.name}</p>
                                <p>Basic Salary: ₹{calculateSalary().basic}</p>
                                <p>Deductions: ₹{calculateSalary().deductions}</p>
                                <p>Final Salary: ₹{calculateSalary().final}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

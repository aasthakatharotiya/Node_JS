import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminEmpAttendance() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDay, setSelectedDay] = useState(null);
    const [attendance, setAttendance] = useState({});
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
        loadAttendance();
    }, []);

    const fetchEmployees = async () => {
        try {
            let response = await axios.get("http://localhost:2006/ViewEmployeeRegister");
            setEmployees(response.data.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const loadAttendance = () => {
        const storedAttendance = JSON.parse(localStorage.getItem("empAttendance")) || {};
        setAttendance(storedAttendance);
    };

    const saveAttendance = (updatedAttendance) => {
        localStorage.setItem("empAttendance", JSON.stringify(updatedAttendance));
    };

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const openPopup = (day) => {
        if (!selectedEmployee) {
            alert("Please select an employee first.");
            return;
        }
        setSelectedDay(day);
        document.getElementById("attendancePopup").style.display = "block";
    };

    const closePopup = () => {
        document.getElementById("attendancePopup").style.display = "none";
    };

    const markAttendance = async (status) => {
        if (!selectedEmployee || selectedDay === null) return;
    
        const date = `${currentYear}-${currentMonth + 1}-${selectedDay}`;
        const attendanceData = {
            employeeId: selectedEmployee._id,
            date,
            status,
        };
    
        try {
            await axios.post("http://localhost:2006/EmpAttendance", attendanceData);
            
            const key = `${selectedEmployee._id}-${date}`;
            const updatedAttendance = { ...attendance, [key]: status };
            setAttendance(updatedAttendance);
            saveAttendance(updatedAttendance);
        } catch (error) {
            console.error("Error submitting attendance:", error);
        }
    
        closePopup();
    };

    const changeMonth = (offset) => {
        setCurrentMonth((prev) => {
            let newMonth = prev + offset;
            let newYear = currentYear;

            if (newMonth < 0) {
                newMonth = 11;
                newYear--;
            } else if (newMonth > 11) {
                newMonth = 0;
                newYear++;
            }

            setCurrentYear(newYear);
            return newMonth;
        });
    };

    return (
        <div className='Admin_emp_Attendance'>
            <div className="attendance-container">
                <h1>Employee Attendance</h1>

                <select onChange={(e) => {
                    const empId = e.target.value;
                    const employee = employees.find(emp => emp._id === empId);
                    setSelectedEmployee(employee);
                }}>
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                        <option key={emp._id} value={emp._id}>
                            {emp.name} ({emp.task})
                        </option>
                    ))}
                </select>

                <div className="calendar">
                    <div className="calendar-header">
                        <button onClick={() => changeMonth(-1)}>&lt;</button>
                        <h3>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                        <button onClick={() => changeMonth(1)}>&gt;</button>
                    </div>
                    <div className="calendar-grid">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className="calendar-day-name">{day}</div>
                        ))}
                        {Array(firstDayOfMonth).fill(null).map((_, i) => (
                            <div key={`empty-${i}`} className="empty-cell"></div>
                        ))}
                        {[...Array(daysInMonth(currentYear, currentMonth))].map((_, i) => {
                            const day = i + 1;
                            const isToday = today.getFullYear() === currentYear && today.getMonth() === currentMonth && today.getDate() === day;
                            const key = `${selectedEmployee?._id}-${currentYear}-${currentMonth + 1}-${day}`;
                            const status = attendance[key];
                            const className = `calendar-day ${status === 'present' ? 'present' : status === 'absent' ? 'absent' : ''} ${isToday ? 'today' : ''}`;

                            return (
                                <div key={day} onClick={() => openPopup(day)} className={className}>
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div id="attendancePopup" className="attendance-popup">
                    <div className='cross_btn'>
                        <button className="close-btn" onClick={closePopup}>&times;</button>
                    </div>
                    {selectedDay && selectedEmployee && (
                        <p>Selected Date: {selectedDay} {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</p>
                    )}
                    {selectedEmployee && <p>Employee: {selectedEmployee.name}</p>}
                    <button onClick={() => markAttendance('present')} className="present-btn">Present</button>
                    <button onClick={() => markAttendance('absent')} className="absent-btn">Absent</button>
                </div>
            </div>
        </div>
    );
}

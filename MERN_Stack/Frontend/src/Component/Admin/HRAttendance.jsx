import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminHRAttendance() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDay, setSelectedDay] = useState(null);
    const [attendance, setAttendance] = useState({});
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
        loadAttendance();
    }, []);

    // Fetch Users from API
    const fetchUsers = async () => {
        try {
            let response = await axios.get("http://localhost:2006/ViewManagerRegister");
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Load Attendance from localStorage
    const loadAttendance = () => {
        const storedAttendance = JSON.parse(localStorage.getItem("attendance")) || {};
        setAttendance(storedAttendance);
    };

    // Save Attendance to localStorage
    const saveAttendance = (updatedAttendance) => {
        localStorage.setItem("attendance", JSON.stringify(updatedAttendance));
    };

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Open Popup for Attendance Marking
    const openPopup = (day) => {
        if (!selectedUser) {
            alert("Please select a manager first.");
            return;
        }
        setSelectedDay(day);
        document.getElementById("attendancePopup").style.display = "block";
    };

    const closePopup = () => {
        document.getElementById("attendancePopup").style.display = "none";
    };

    const markAttendance = async (status) => {
        if (!selectedUser || selectedDay === null) return;
    
        const date = `${currentYear}-${currentMonth + 1}-${selectedDay}`;
        const attendanceData = {
            managerId: selectedUser._id,
            date,
            status,
        };
    
        try {
            await axios.post("http://localhost:2006/HRAttendance", attendanceData);
            // alert("Attendance Submitted Successfully");
            
            const key = `${selectedUser._id}-${date}`;
            const updatedAttendance = { ...attendance, [key]: status };
            setAttendance(updatedAttendance);
            saveAttendance(updatedAttendance);
        } catch (error) {
            console.error("Error submitting attendance:", error);
            // alert("Failed to submit attendance");
        }
    
        closePopup();
    };    

    // Change Calendar Month
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
        <div className='Admin_HR_Attendance'>
            <div className="attendance-container">
                <h1>Manager Attendance</h1>

                {/* User Selection Dropdown */}
                <select onChange={(e) => {
                    const userId = e.target.value;
                    const user = users.find(u => u._id === userId);
                    setSelectedUser(user);
                }}>
                    <option value="">Select Manager</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>
                            {user.name} ({user.department})
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
                            const key = `${selectedUser?._id}-${currentYear}-${currentMonth + 1}-${day}`;
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

                {/* Attendance Popup */}
                <div id="attendancePopup" className="attendance-popup">
                    <div className='cross_btn'>
                        <button className="close-btn" onClick={closePopup}>&times;</button>
                    </div>
                    {selectedDay && selectedUser && (
                        <p>Selected Date: {selectedDay} {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</p>
                    )}
                    {selectedUser && <p>Manager: {selectedUser.name}</p>}
                    <button onClick={() => markAttendance('present')} className="present-btn">Present</button>
                    <button onClick={() => markAttendance('absent')} className="absent-btn">Absent</button>
                </div>
            </div>
        </div>
    );
}

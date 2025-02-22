const admin_schema = require("../model/Admin_User")
const manager_schema = require("../model/Manager_User")
const employee_schema = require("../model/Employee_User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const fs = require("fs")
const path = require("path")

// Admin Register-Login 

module.exports.AdminRegister = async (req, res) => {
    let admin = await admin_schema.findOne({ email: req.body.email })
    if (admin) {
        return res.status(200).json({ msg: "Admin Already Exists !" })
    }

    req.body.img = req.file.filename
    req.body.password = await bcrypt.hash(req.body.password, 10)

    let newAdmin = await admin_schema.create(req.body)
    let token = jwt.sign({ adminData: newAdmin }, "rnw", { expiresIn: "1h" })
    // let token = jwt.sign({ adminData: admin }, "rnw", { expiresIn: "1h" })

    res.status(200).json({
        msg: "Admin Created",
        token,
        admin: {
            id: newAdmin._id,
            name: newAdmin.name,
            img: newAdmin.img,
            email: newAdmin.email,
            number: newAdmin.number,
            city: newAdmin.city,
            gender: newAdmin.gender,
        }
    })
}
module.exports.ViewAdminRegister = async (req, res) => {
    await admin_schema.find({})
        .then((data) => {
            res.status(200).json({ "data": data })
        })
}
module.exports.AdminLogin = async (req, res) => {
    let admin = await admin_schema.findOne({ email: req.body.email })
    if (!admin) {
        return res.status(200).json({ msg: "Admin Not Found !" })
    }

    if (await bcrypt.compare(req.body.password, admin.password)) {
        let token = jwt.sign({ adminData: admin }, "rnw", { expiresIn: "1h" })
        res.status(200).json({
            msg: "Admin Logged in !",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                img: admin.img,
                email: admin.email,
                number: admin.number,
                city: admin.city,
                gender: admin.gender,
            }
        })
        console.log(token)
    }
    else {
        res.status(200).json({ msg: "Password is Wrong !" })
    }
}
module.exports.ViewAdminUser = async (req, res) => {
    await admin_schema.find({})
        .then((data) => {
            res.status(200).json({ data: data })
        })
}



// Manager Register-Login 

module.exports.ManagerRegister = async (req, res) => {
    let manager = await manager_schema.findOne({ email: req.body.email })
    if (manager) {
        return res.status(200).json({ msg: "Manager Already Exists !" })
    }

    req.body.img = req.file.filename
    req.body.password = await bcrypt.hash(req.body.password, 10)
    
    let newManager = await manager_schema.create(req.body)
    let token = jwt.sign({ adminData: newManager }, "rnw", { expiresIn: "1h" })

    res.status(200).json({
        msg: "Manager Created",
        token,
        manager: {
            id: newManager._id,
            name: newManager.name,
            number: newManager.number,
            email: newManager.email,
            img: newManager.img,
            gender: newManager.gender,
            department: newManager.department,
            role: newManager.role
        }
    })
}
module.exports.ViewManagerRegister = async (req, res) => {
    await manager_schema.find({})
        .then((data) => {
            res.status(200).json({ "data": data })
        })
}
module.exports.ManagerLogin = async (req, res) => {
    let manager = await manager_schema.findOne({ email: req.body.email })
    if (!manager) {
        return res.status(200).json({ msg: "Manager Not Found !" })
    }

    if (await bcrypt.compare(req.body.password, manager.password)) {
        let token = jwt.sign({ adminData: manager }, "rnw", { expiresIn: "1h" })
        res.status(200).json({ 
            msg: "Manager Logged in !", 
            token,
            manager: {
                id: manager._id,
                name: manager.name,
                number: manager.number,
                email: manager.email,
                img: manager.img,
                gender: manager.gender,
                department: manager.department,
                role: manager.role
            }
        })
        console.log(token)
    }
    else {
        res.status(200).json({ msg: "Password is Wrong !" })
    }
}
module.exports.ViewManagerUser = async (req, res) => {
    await manager_schema.find({})
        .then((data) => {
            res.status(200).json({ data: data })
        })
}



// Employee Register-Login 

module.exports.EmployeeRegister = async (req, res) => {
    let emp = await employee_schema.findOne({ email: req.body.email })
    if (emp) {
        return res.status(200).json({ msg: "Employee Already Exists !" })
    }

    req.body.img = req.file.filename
    req.body.password = await bcrypt.hash(req.body.password, 10)

    let newEmp = await employee_schema.create(req.body)
    let token = jwt.sign({ adminData: newEmp }, "rnw", { expiresIn: "1h" })
    // let token = jwt.sign({ adminData: admin }, "rnw", { expiresIn: "1h" })

    res.status(200).json({
        msg: "Employee Created",
        token,
        employee: {
            id: newEmp._id,
            name: newEmp.name,
            number: newEmp.number,
            email: newEmp.email,
            img: newEmp.img,
            gender: newEmp.gender,
            task: newEmp.task,
            category: newEmp.category
        }
    })
}
module.exports.ViewEmployeeRegister = async (req, res) => {
    await employee_schema.find({})
        .then((data) => {
            res.status(200).json({ "data": data })
        })
}
module.exports.EmployeeLogin = async (req, res) => {
    let emp = await employee_schema.findOne({ email: req.body.email })
    if (!emp) {
        return res.status(200).json({ msg: "Employee Not Found !" })
    }

    if (await bcrypt.compare(req.body.password, emp.password)) {
        let token = jwt.sign({ adminData: emp }, "rnw", { expiresIn: "1h" })
        res.status(200).json({ 
            msg: "Employee Logged in !", 
            token, 
            employee: {
                id: emp._id,
                name: emp.name,
                number: emp.number,
                email: emp.email,
                img: emp.img,
                gender: emp.gender,
                task: emp.task,
                category: emp.category
            }
        })
        console.log(token)
    }
    else {
        res.status(200).json({ msg: "Password is Wrong !" })
    }
}
module.exports.ViewEmployeeUser = async (req, res) => {
    await employee_schema.find({})
        .then((data) => {
            res.status(200).json({ data: data })
        })
}








const HR_Attendance = require("../model/HR_Attendance");
const EMP_Attendance = require("../model/EMP_Attendance")

exports.HRAttendance = async (req, res) => {
    try {
        const { managerId, date, status } = req.body;

        // Check if attendance already exists for this manager on the given date
        let existingEntry = await HR_Attendance.findOne({ managerId, date });

        if (existingEntry) {
            // Update the existing attendance record
            existingEntry.status = status;
            await existingEntry.save();
            return res.status(200).json({ msg: "Attendance Updated Successfully" });
        }

        // Create a new attendance record
        await HR_Attendance.create({ managerId, date, status });
        res.status(200).json({ msg: "Attendance Submitted Successfully" });

    } catch (error) {
        res.status(500).json({ msg: "Error submitting attendance", error });
    }
};



exports.EMPAttendance = async (req, res) => {
    try {
        const { employeeId, date, status } = req.body;

        let existingEntry = await EMP_Attendance.findOne({ employeeId, date });

        if (existingEntry) {
            existingEntry.status = status;
            await existingEntry.save();
            return res.status(200).json({ msg: "Employee Attendance Updated Successfully" });
        }

        await EMP_Attendance.create({ employeeId, date, status });
        res.status(200).json({ msg: "Employee Attendance Submitted Successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error submitting employee attendance", error });
    }
};
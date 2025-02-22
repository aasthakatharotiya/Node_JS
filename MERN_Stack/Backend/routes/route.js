const express = require("express")
const route = express.Router()
const ctl = require("../controller/ctl")
const auth = require("../middleware/jwtAuth")
const multer = require("../middleware/multer")

// Admin Register-Login 

route.post("/AdminRegister", multer, ctl.AdminRegister)
route.get("/ViewAdminRegister", ctl.ViewAdminRegister)
route.post("/AdminLogin", ctl.AdminLogin)
route.get("/ViewAdminUser", auth, ctl.ViewAdminUser)

// Manager Register-Login 

route.post("/ManagerRegister", multer, ctl.ManagerRegister)
route.get("/ViewManagerRegister", ctl.ViewManagerRegister)
route.post("/ManagerLogin", ctl.ManagerLogin)
route.get("/ViewManagerUser", auth, ctl.ViewManagerUser)

// Employee Register-Login 

route.post("/EmployeeRegister", multer, ctl.EmployeeRegister)
route.get("/ViewEmployeeRegister", ctl.ViewEmployeeRegister)
route.post("/EmployeeLogin", ctl.EmployeeLogin)
route.get("/ViewEmployeeUser", auth, ctl.ViewEmployeeUser)


// Route to mark attendance

route.post("/HRAttendance", ctl.HRAttendance);
route.post("/EMPAttendance", ctl.EMPAttendance);


module.exports = route
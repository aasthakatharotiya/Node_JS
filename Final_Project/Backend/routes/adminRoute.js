const express = require("express")
const route = express.Router()
const ctl = require("../controllers/adminCTL")
const auth = require("../middleware/jwtAuth")
const multer = require("../middleware/multer")

// Admin Register-Login 

route.post("/AdminRegister", multer, ctl.AdminRegister)
route.get("/ViewAdminRegister", ctl.ViewAdminRegister)
route.post("/AdminLogin", ctl.AdminLogin)
route.get("/ViewAdminUser", auth, ctl.ViewAdminUser)

module.exports = route
const express = require("express")
const route = express.Router()
const ctl = require("../controllers/ctl")
const upload = require("../middleware/multer")

route.get("/", ctl.login)
route.post("/userLogin", ctl.userLogin)

route.get("/register", ctl.register)
route.post("/userRegister", upload, ctl.userRegister)

route.get("/logout", ctl.logout)
route.get("/dashboard", ctl.dashboard)

route.get("/addAdmin", ctl.addAdmin)
route.get("/viewAdmin", ctl.viewAdmin)

route.post("/addAdminData", upload, ctl.addAdminData)
route.get("/editAdminData", ctl.editAdminData)
route.post("/updateAdminData", upload, ctl.updateAdminData)
route.get("/deleteAdminData", upload, ctl.deleteAdminData)

route.get("/card", ctl.card)

module.exports = route
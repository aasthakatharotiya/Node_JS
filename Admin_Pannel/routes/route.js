const express = require("express")
const route = express.Router()
const ctl = require("../controllers/ctl")

route.get("/", ctl.login)
route.post("/userLogin", ctl.userLogin)
route.get("/logout", ctl.logout)
route.get("/dashboard", ctl.dashboard)

route.get("/addAdmin", ctl.addAdmin)
route.get("/viewAdmin", ctl.viewAdmin)

route.post("/addAdminData", ctl.addAdminData)
route.get("/editAdminData", ctl.editAdminData)
route.post("/updateAdminData", ctl.updateAdminData)
route.get("/deleteAdminData", ctl.deleteAdminData)

module.exports = route
const express = require("express")
const route = express.Router()
const ctl = require("../controllers/ctl")
const passport = require("passport")

route.get("/", ctl.login)
route.post(
    "/userLogin",
    passport.authenticate("local", { failureRedirect: "/" }),
    ctl.userLogin
)
// route.post("/userLogin", ctl.userLogin)
route.get("/logout", passport.checkAuth, ctl.logout)
route.get("/dashboard", passport.checkAuth, ctl.dashboard)

route.get("/addAdmin", passport.checkAuth, ctl.addAdmin)
route.get("/viewAdmin", passport.checkAuth, ctl.viewAdmin)

route.post("/addAdminData", ctl.addAdminData)
route.get("/editAdminData", ctl.editAdminData)
route.post("/updateAdminData", ctl.updateAdminData)
route.get("/deleteAdminData", ctl.deleteAdminData)

module.exports = route
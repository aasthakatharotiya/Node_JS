const express = require("express")
const route = express.Router()
const ctl = require("../controllers/ctl")
const upload = require("../middleware/multer")
const passport = require("passport")

route.get("/", ctl.login)
route.post(
    "/userLogin", 
    passport.authenticate("local", { failureRedirect: "/" }),
    ctl.userLogin
)
// route.post("/userLogin", ctl.userLogin)

route.get("/register", passport.checkAuth, ctl.register)
route.post("/userRegister", upload, ctl.userRegister)

route.get("/logout", passport.checkAuth, ctl.logout)
route.get("/dashboard", passport.checkAuth, ctl.dashboard)

route.get("/addAdmin", passport.checkAuth, ctl.addAdmin)
route.get("/viewAdmin", passport.checkAuth, ctl.viewAdmin)

route.post("/addAdminData", upload, ctl.addAdminData)
route.get("/editAdminData", ctl.editAdminData)
route.post("/updateAdminData", upload, ctl.updateAdminData)
route.get("/deleteAdminData", upload, ctl.deleteAdminData)

route.get("/card", ctl.card)

module.exports = route
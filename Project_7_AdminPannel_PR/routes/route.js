const express = require("express")
const route = express.Router()
const ctl = require("../controllers/ctl")
const passport = require("passport")
const multer = require("../middleware/multer")

route.get("/", ctl.login)
route.post(
    "/userLogin",
    passport.authenticate("local", { failureRedirect: "/" }),
    ctl.userLogin
)

route.get("/logout", passport.checkAuth, ctl.logout)
route.get("/profile", passport.checkAuth, ctl.profile)

route.get("/dashboard", passport.checkAuth, ctl.dashboard)
route.get("/documentation", passport.checkAuth, ctl.documentation)
route.get("/collection", passport.checkAuth, ctl.collection)
route.get("/about", passport.checkAuth, ctl.about)
route.get("/contact", passport.checkAuth, ctl.contact)
route.get("/chart", passport.checkAuth, ctl.chart)

route.get("/addUser", passport.checkAuth, ctl.addUser)

route.post("/addUserData", multer, ctl.addUserData)
route.get("/editUserData", multer, ctl.editUserData)
route.post("/updateUserData", multer, ctl.updateUserData)

route.post("/recoverPass", ctl.recoverPass)
route.post("/verifyPass", ctl.verifyPass)

route.get("/changePass", passport.checkAuth, ctl.changePass)
route.post("/changePassword", ctl.changePassword)

module.exports = route
const express = require("express")
const route = express.Router()
const ctl = require("../controllers/categoryCTL")
const passport = require("passport")
const multer = require("../middleware/multer")

route.get("/addCategory", passport.checkAuth, ctl.addCategory)

route.post("/addCatData", multer, ctl.addCatData)

module.exports = route
const express = require("express")
const route = express.Router()
const ctl = require("../controllers/productCTL")
const passport = require("passport")
const multer = require("../middleware/multer")

route.get("/addProduct", passport.checkAuth, ctl.addProduct)
route.get("/viewProduct", passport.checkAuth, ctl.viewProduct)

route.post("/addProductData", multer, ctl.addProductData)

module.exports = route
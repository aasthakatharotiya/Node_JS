const express = require("express")
const route = express.Router()
const auth_ctl = require("../controller/authCTL")
const category_ctl = require("../controller/categoryCTL")
const product_ctl = require("../controller/productCTL")
const auth = require("../middleware/jwtAuth")
const multer = require("../middleware/multer")

// User login & Registration...

route.post("/register", auth_ctl.register)
route.get("/viewRegister", auth_ctl.viewRegister)
route.post("/login", auth_ctl.login)
route.get("/viewUser", auth, auth_ctl.viewUser)


// Category...

route.post("/addCategory", multer, category_ctl.addCategory)
route.get("/viewCategory", category_ctl.viewCategory)
route.delete("/deleteCategory", multer, category_ctl.deleteCategory)
route.put("/updateCategory", multer, category_ctl.updateCategory)


//Product...

route.post("/addProduct", multer, product_ctl.addProduct)
route.get("/viewProduct", product_ctl.viewProduct)
route.delete("/deleteProduct", multer, product_ctl.deleteProduct)
route.put("/updateProduct", multer, product_ctl.updateProduct)

module.exports = route
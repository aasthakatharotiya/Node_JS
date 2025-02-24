const express = require("express")
const route = express.Router()
const ctl = require("../controllers/recipeCTL")
const multer = require("../middleware/multer")

route.post("/addRecipe", multer, ctl.addRecipe)
route.get("/viewRecipe", ctl.viewRecipe)
route.delete("/deleteRecipe", multer, ctl.deleteRecipe)
route.put("/updateRecipe", multer, ctl.updateRecipe)

module.exports = route
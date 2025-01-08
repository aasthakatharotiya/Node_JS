const express = require("express")
const route = express.Router()
const ctl = require("../controllers/ctl")
const upload = require("../middleware/multer")

route.get("/", ctl.firstPage)
route.post("/addData", upload, ctl.addData)
route.get("/editData", ctl.editData)
route.post("/updateData", upload, ctl.updateData)
route.get("/deleteData", upload, ctl.deleteData)
route.get("/posterData", ctl.posterData)
route.get("/ticketData", ctl.ticketData)

module.exports = route
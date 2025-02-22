const express = require("express")
const port = 2006

const app = express()

const db = require("./config/db")
const schema = require("./model/Admin_User")

const cors = require("cors")

app.use(express.urlencoded())

app.use("/uploads", express.static("uploads"))

app.use(express.json())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cors())

app.use("/", require("./routes/route"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started On Port : " + port)
})
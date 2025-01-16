const express = require("express")
const port = 2006

const app = express()
const path = require("path")
const cookies = require("cookie-parser")

const db = require("./config/db")
const schema = require("./model/firstSchema")

app.set("view engine", "ejs")
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, "public")))
app.use(cookies())

app.use("/", require("./routes/route"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started On Port : " + port)
})
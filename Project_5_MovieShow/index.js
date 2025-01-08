const express = require("express")
const port = 5008

const app = express()
const path = require("path")

const db = require("./config/db")
const schema = require("./Model/firstSchema")

app.use(express.urlencoded())
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.get("/", async(req, res) => {
    let data = await schema.find({})
    res.render("index", { data })
})

app.use("/", require("./routes/route"))

app.get("/indexPage", async(req, res) => {
    res.redirect("/")
})

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started on Port : " + port)
})
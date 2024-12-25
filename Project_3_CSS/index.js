const express = require("express")
const port = 3008

const app = express()
const path = require("path")

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started on port : " + port)
})
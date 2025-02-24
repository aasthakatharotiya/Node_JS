const express = require("express")
const port = 2006

const app = express()
const db = require("./config/db")

const cors = require("cors")

app.use(express.urlencoded())
app.use("/uploads", express.static("uploads"))

app.use(express.json())
app.use(cors({ origin: "http://localhost:5173" }))
app.use(cors())

app.use("/", require("./routes/adminRoute"))
app.use("/recipe", require("./routes/recipeRoute"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started On Port : " + port)
})
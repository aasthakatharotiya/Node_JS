const express = require("express")
const port = 1006

const app = express()
const path = require("path")

// const cookies = require("cookie-parser")
const passport = require("./middleware/passport")
const session = require("express-session")

const db = require("./config/db")
const schema = require("./model/firstSchema")

app.set("view engine", "ejs")
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, "public")))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// app.use(cookies())
app.use(
    session({
        name: "local",
        secret: "RNW",
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 100 * 100 * 60 }
    })
)
app.use(passport.initialize())
app.use(passport.session())

app.use("/", require("./routes/route"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started On Port : " + port)
})
const express = require("express")
const port = 2007

const app = express()
const path = require("path")

const db = require("./config/db")
const schema = require("./model/firstSchema")

const passport = require("./middleware/passport")
const session = require("express-session")

const flash = require("connect-flash")
const flashConnect = require("./middleware/flashConnect")

app.set("view engine", "ejs")
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, "public")))
app.use("/public", express.static(path.join(__dirname, "public")))

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
app.use(passport.AuthenticatedUser)

app.use(flash())
app.use(flashConnect.setFlash)

app.use("/", require("./routes/route"))
app.use("/category", require("./routes/category"))
app.use("/product", require("./routes/product"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started On Port : " + port)
})
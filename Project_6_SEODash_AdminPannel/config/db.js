const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/SEO_Dash_Admin")

const db = mongoose.connection

db.once("open", (err) => {
    err ? console.log(err) : console.log("db Connected")
})

module.exports = db
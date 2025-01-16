const mongoose = require("mongoose")
const schema = mongoose.Schema({
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    contact: {
        type: Number,
        require: true
    },
    message: {
        type: String,
        require: true
    }
})

const firstSchema = mongoose.model("Users", schema)
module.exports = firstSchema
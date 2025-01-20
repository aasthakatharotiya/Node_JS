const mongoose = require("mongoose")
const schema = mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const firstSchema = mongoose.model("Admin", schema)
module.exports = firstSchema
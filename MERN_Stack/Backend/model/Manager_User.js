const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    number: {
        type: Number,
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
    img: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    }
})
const firstSchema = mongoose.model("Manager_User", schema)
module.exports = firstSchema
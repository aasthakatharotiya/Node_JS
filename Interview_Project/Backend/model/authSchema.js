const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: { 
        type: String,
        required: true
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
    city: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    }
})

const firstSchema = mongoose.model("User", schema)
module.exports = firstSchema
const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

const firstSchema = mongoose.model("Recipe", schema)
module.exports = firstSchema
const mongoose = require("mongoose")
const schema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    pdf: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    rate: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
})

const firstSchema = mongoose.model("Book", schema)
module.exports = firstSchema

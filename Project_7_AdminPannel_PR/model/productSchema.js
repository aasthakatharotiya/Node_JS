const mongoose = require("mongoose")
const schema = mongoose.Schema({
    prName: {
        type: String,
        reuire: true
    },
    img: {
        type: String,
        reuire: true
    },
    price: {
        type: Number,
        reuire: true
    },
    size: {
        type: String,
        reuire: true
    },
    rate: {
        type: Number,
        reuire: true
    },
    simpleText: {
        type: String,
        reuire: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    }
})

const firstSchema = mongoose.model("product", schema)
module.exports = firstSchema
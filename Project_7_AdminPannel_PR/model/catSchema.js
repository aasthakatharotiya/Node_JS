const mongoose = require("mongoose")
const schema = mongoose.Schema({
    catName: {
        type: String,
        reuire: true
    },
    img: {
        type: String,
        reuire: true
    },
    simpleText: {
        type: String,
        reuire: true
    }
})

const firstSchema = mongoose.model("category", schema)
module.exports = firstSchema
const mongoose = require("mongoose")

const schema = mongoose.Schema({
    img: {
        type: String,
        require: true
    },
    category_name: {
        type: String,
        require: true
    }
})

const firstSchema = mongoose.model("Category", schema)
module.exports = firstSchema
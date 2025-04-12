const mongoose = require("mongoose")

const schema = mongoose.Schema({
    img: {
        type: String,
        require: true
    },
    product_name: {
        type: String,
        require: true
    },
    product_price : {
        type: Number,
        require: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
})

const firstSchema = mongoose.model("Product", schema)
module.exports = firstSchema
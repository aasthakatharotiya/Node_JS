const mongoose = require("mongoose")
const schema = mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    movie: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String,
        default: () => new Date().toTimeString().split(' ')[0] 
        // e.g., '14:30:15' = HH:mm:ss format
    },
    language: {
        type: [String],
        required: true
    },    
    vote: {
        type: Number,
        default: 0.0
    },
    rate: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    }
})

const firstSchema = mongoose.model("Movie", schema)
module.exports = firstSchema
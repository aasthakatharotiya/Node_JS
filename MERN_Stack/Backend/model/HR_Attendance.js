const mongoose = require("mongoose")

const schema = mongoose.Schema({
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manager_User",
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["present", "absent"],
        required: true
    }
});

const Attendance = mongoose.model("HR_Attendance", schema);
module.exports = Attendance

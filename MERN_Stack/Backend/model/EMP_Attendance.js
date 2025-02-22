const mongoose = require("mongoose")

const schema = mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee_User",
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

const Attendance = mongoose.model("EMP_Attendance", schema);
module.exports = Attendance

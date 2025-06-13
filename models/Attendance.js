const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  courseId: { type: String, required: true },
  date: { type: String, required: true },
  status: {
    type: String,
    enum: ["present", "absent", "late"],
    default: "present",
  },
  markedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;

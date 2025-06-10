const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: String,
  courseId: String,
  date: String,
  status: String,
  markedBy: String,
  createdAt: { type: Date, default: Date.now },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;

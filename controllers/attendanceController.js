const Attendance = require("../models/Attendance");
const { isDeviceAuthorized } = require("../utils/proximityValidator");

exports.markAttendance = async (req, res) => {
  const { wifiSSID, userId, courseId, date, status, markedBy } = req.body;

  if (!isDeviceAuthorized({ wifiSSID })) {
    return res
      .status(403)
      .json({ message: "❌ Not connected to authorized WiFi" });
  }

  const alreadyMarked = await Attendance.findOne({
    studentId: userId,
    courseId,
    date,
  });
  if (alreadyMarked) {
    return res.status(409).json({ message: "✅ Attendance already marked." });
  }

  const attendance = new Attendance({
    studentId: userId,
    courseId,
    date,
    status,
    markedBy,
  });

  await attendance.save();
  return res.status(201).json({ message: "✅ Attendance marked", attendance });
};
exports.getAttendanceByCourse = async (req, res) => {
  res.status(200).json({ message: "Fetched course-wise attendance" });
};

exports.getStudentAttendance = async (req, res) => {
  res.status(200).json({ message: "Fetched student-specific attendance" });
};

const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleCheck");

const {
  markAttendance,
  getAttendanceByCourse,
  getStudentAttendance,
} = require("../controllers/attendanceController");

router.post(
  "/mark",
  authenticate,
  authorizeRoles("teacher", "student"),
  markAttendance
);
router.get(
  "/course/:courseId",
  authenticate,
  authorizeRoles("teacher", "admin", "student"),
  getAttendanceByCourse
);
router.get(
  "/student/:studentId",
  authenticate,
  authorizeRoles("student"),
  getStudentAttendance
);

module.exports = router;

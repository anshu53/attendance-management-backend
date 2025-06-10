const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleCheck");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  enrollStudent,
} = require("../controllers/courseController");

// Admin & Teacher can create courses
router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "teacher"),
  createCourse
);

// All authenticated users can view courses
router.get("/", authenticate, getAllCourses);
router.get("/:id", authenticate, getCourseById);

// Only teachers can enroll students
router.post(
  "/:id/enroll",
  authenticate,
  authorizeRoles("teacher"),
  enrollStudent
);

module.exports = router;

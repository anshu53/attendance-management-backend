const Course = require("../models/Course");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({ success: true, newCourse });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create course", error });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

// Get a course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch course", error });
  }
};

// Enroll a student in a course
exports.enrollStudent = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const { studentId } = req.body;
    if (!studentId)
      return res.status(400).json({ message: "Student ID required" });

    if (course.enrolledStudents.includes(studentId)) {
      return res.status(400).json({ message: "Student already enrolled" });
    }

    course.enrolledStudents.push(studentId);
    await course.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Student enrolled successfully",
        course,
      });
  } catch (error) {
    res.status(500).json({ message: "Enrollment failed", error });
  }
};

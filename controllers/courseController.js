const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: "Failed to create course" });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

// Define and export other functions similarly:
exports.getCourseById = async (req, res) => {
  /* ... */
};
exports.enrollStudent = async (req, res) => {
  /* ... */
};

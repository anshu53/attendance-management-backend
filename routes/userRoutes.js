// const express = require("express");
// const router = express.Router();
// const authenticate = require("../middleware/auth");
// const authorizeRoles = require("../middleware/roleCheck");
// const { getAllUsers, getUserById } = require("../controllers/userController");

// // Admin-only route
// router.get("/", authenticate, authorizeRoles("admin"), getAllUsers);

// // Authenticated users (admin/teacher/student)
// router.get("/:id", authenticate, getUserById);

// module.exports = router;

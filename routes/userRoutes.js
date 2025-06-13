const express = require("express");
const authenticate = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleCheck");
const User = require("../models/User");

const router = express.Router();

// ✅ Approve user - only admin
router.put(
  "/approve-user/:id",
  authenticate,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { status: "approved" },
        { new: true }
      );
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User approved", user });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);
// GET /users/pending
router.get("/pending", async (req, res) => {
  try {
    const users = await User.find({ status: "pending" });
    res.json(users);
  } catch (err) {
    console.error("Error fetching pending users", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /users/approve/:id
router.post(
  "/approve/:id",
  authenticate,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { status: "approved" },
        { new: true }
      );
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User approved", user });
    } catch (err) {
      console.error("Approve user error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// DELETE /users/reject/:id
router.delete(
  "/reject/:id",
  authenticate,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { status: "rejected" },
        { new: true }
      );
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User marked as rejected", user });
    } catch (err) {
      console.error("Reject user error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;

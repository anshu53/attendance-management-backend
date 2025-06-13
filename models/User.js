const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  name: { type: String, required: true },
  role: { type: String, enum: ["admin", "teacher", "student"] },
  department: String,
  studentId: String,
  year: Number,
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const users = new mongoose.model("users", userSchema);
module.exports = users;

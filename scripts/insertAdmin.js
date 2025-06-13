const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config(); // Load .env

const insertAdmin = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/attendance-db"
    );

    const existingAdmin = await User.findOne({
      email: "anshuman.pandey@gmail.com",
    });
    const plainPassword = "Admin@123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    if (existingAdmin) {
      console.log("✅ Admin already exists.");
    } else {
      //   const hashedPassword = await bcrypt.hash("Admin@123", 10);

      const adminUser = new User({
        email: "anshuman.pandey@gmail.com",
        password: hashedPassword,
        name: "System Administrator",
        role: "admin",
        status: "approved",
      });

      await adminUser.save();
      console.log("✅ Admin inserted successfully.");
    }

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error inserting admin:", err);
    process.exit(1);
  }
};

insertAdmin();

const User = require("../models/user");
const bcrypt = require("bcryptjs");

 async function ensureAdminExists() {
  const admin = await User.findOne({ role: "admin" });

  if (!admin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Default admin created");
  }
}
exports.ensureAdminExists = ensureAdminExists;
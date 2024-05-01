const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;

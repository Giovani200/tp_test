// src/model/user.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  prenom: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);

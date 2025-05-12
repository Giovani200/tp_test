// src/config/database.js
const mongoose = require("mongoose");

const connecterDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connexion à la base de données réussie !");
  } catch (error) {
    console.error("Erreur de connexion à la base de données :", error);
    process.exit(1);
  }
};

module.exports = connecterDB;

// src/routes/utilisateurRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../model/user"); // Si le fichier est dans src/model/

// GET /api/utilisateurs -> liste tous les users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// POST /api/utilisateurs -> créer un user
router.post("/", async (req, res) => {
  const { prenom, nom, email } = req.body;

  if (!prenom || !nom || !email) {
    return res.status(400).json({ message: "Champs manquants." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Utilisateur déjà existant." });
    }

    const newUser = await User.create({ prenom, nom, email });
    res.status(201).json({
      message: "Utilisateur créé.",
      user: newUser
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;

// src/server.js
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const connecterDB = require("./config/database");
const utilisateurRoutes = require("./routes/utilisateurRoutes");
const path = require("path");

// Charger les variables d'environnement
dotenv.config();

// Connecter à la BDD
connecterDB();

// Créer l'app Express
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Montée des routes
app.use("/api/utilisateurs", utilisateurRoutes);
// ficher frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Démarrer le serveur
const PORT = process.env.PORT || 8008;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}/`);
});

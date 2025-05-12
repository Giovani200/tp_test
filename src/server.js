// 1. Créer un utilisateur (POST /users)
// 2. Lister tous les utilisateurs (GET /users)

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const connecterDB = require("./config/database");

// Charger les variables d'environnement
dotenv.config();

// Connecter à la base de données
connecterDB();
// Créer une instance d'Express
const app = express();

// Middleware CORS et parsing JSON
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); 

// Serveur API
app.use("/api/utilisateurs", require("./routes/utilisateurRoutes"));



// Démarrer le serveur

app.listen(process.env.PORT || 8008, () => console.log(`Serveur démarré sur le port ${process.env.PORT || 8008} : http://localhost:${process.env.PORT || 8008}/`));
// Importation des bibliothèques nécessaires
const request = require('supertest'); // Permet de simuler des requêtes HTTP pour tester l'API
const mongoose = require('mongoose'); // Bibliothèque pour interagir avec MongoDB
const { MongoMemoryServer } = require('mongodb-memory-server'); // Crée une base MongoDB temporaire en mémoire pour les tests
const express = require('express'); // Framework web pour créer le serveur
const bodyParser = require('body-parser'); // Permet de lire le contenu JSON envoyé dans les requêtes
const utilisateurRoutes = require('../../src/routes/utilisateurRoutes'); // On importe les routes utilisateurs qu'on veut tester
const User = require('../../src/model/user'); // Modèle Mongoose représentant les utilisateurs

// Variables globales pour le serveur de test
let mongoServer; // Le serveur MongoDB temporaire
let app; // L'application Express de test

// Avant tous les tests (une seule fois)
beforeAll(async () => {
  // Démarrage du serveur MongoDB temporaire en mémoire
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri(); // On récupère l'URL de connexion à cette base

  // Connexion de Mongoose à cette base
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Configuration de l'application Express pour les tests
  app = express(); // Création de l'app
  app.use(bodyParser.json()); // On dit à l'app d'accepter les requêtes JSON
  app.use('/api/utilisateurs', utilisateurRoutes); // On utilise les routes utilisateurs à l’URL /api/utilisateurs
});

// Après tous les tests (fermeture propre)
afterAll(async () => {
  await mongoose.disconnect(); // Déconnexion de MongoDB
  await mongoServer.stop(); // Arrêt du serveur MongoDB en mémoire
});

// Avant chaque test (nettoyage)
beforeEach(async () => {
  await User.deleteMany({}); // Supprime tous les utilisateurs pour repartir d’une base vide
});


// ----------- TEST DU GET (récupérer les utilisateurs) -----------

describe("GET /api/utilisateurs", () => {
  // Cas où aucun utilisateur n'est dans la base
  it("devrait retourner un tableau vide quand il n'y a pas d'utilisateurs", async () => {
    const response = await request(app).get('/api/utilisateurs'); // On simule une requête GET

    expect(response.status).toBe(200); // On attend un code HTTP 200 (succès)
    expect(response.body).toEqual([]); // On s’attend à recevoir un tableau vide
  });

  // Cas où on a deux utilisateurs dans la base
  it("devrait retourner tous les utilisateurs existants", async () => {
    // On crée deux utilisateurs dans la base
    const users = [
      { prenom: 'Jean', nom: 'Dupont', email: 'jean@test.com' },
      { prenom: 'Marie', nom: 'Martin', email: 'marie@test.com' }
    ];
    await User.insertMany(users); // Ajoute ces utilisateurs à la base

    const response = await request(app).get('/api/utilisateurs'); // On fait un GET

    expect(response.status).toBe(200); // Réponse OK
    expect(response.body.length).toBe(2); // On attend 2 utilisateurs
    expect(response.body[0].email).toBe('jean@test.com'); // Vérifie le premier email
    expect(response.body[1].email).toBe('marie@test.com'); // Vérifie le second email
  });
});


// ----------- TEST DU POST (créer un utilisateur) -----------

describe("POST /api/utilisateurs", () => {
  // Cas d’un utilisateur valide
  it("devrait créer un nouvel utilisateur avec des données valides", async () => {
    // Données à envoyer dans la requête
    const userData = {
      prenom: 'Pierre',
      nom: 'Durand',
      email: 'pierre@test.com'
    };

    // Envoi d'une requête POST avec ces données
    const response = await request(app)
      .post('/api/utilisateurs') // On cible l’URL
      .send(userData) // On envoie les données utilisateur
      .set('Content-Type', 'application/json'); // On précise qu'on envoie du JSON

    // On vérifie les réponses
    expect(response.status).toBe(201); // Code HTTP 201 : "créé avec succès"
    expect(response.body.message).toBe("Utilisateur créé."); // Message attendu
    expect(response.body.user.prenom).toBe('Pierre'); // Prénom correct
    expect(response.body.user.nom).toBe('Durand'); // Nom correct
    expect(response.body.user.email).toBe('pierre@test.com'); // Email correct

    // On vérifie que le user a bien été inséré dans la base MongoDB
    const userInDb = await User.findOne({ email: 'pierre@test.com' });
    expect(userInDb).not.toBeNull(); // Il existe bien
  });

  // Cas où il manque un champ requis
  it("devrait renvoyer une erreur 400 si des champs sont manquants", async () => {
    // Il manque le nom ici
    const userData = {
      prenom: 'Pierre',
      email: 'pierre@test.com'
    };

    const response = await request(app)
      .post('/api/utilisateurs')
      .send(userData)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(400); // Code d'erreur 400 : mauvais input
    expect(response.body.message).toBe("Champs manquants."); // Message attendu
  });

  // Cas où l’email est déjà utilisé
  it("devrait renvoyer une erreur 409 si l'email existe déjà", async () => {
    // D’abord, on insère un utilisateur avec un email
    await User.create({
      prenom: 'Jean',
      nom: 'Dupont',
      email: 'jean@test.com'
    });

    // Ensuite, on essaie d’en créer un autre avec le même email
    const userData = {
      prenom: 'Jean',
      nom: 'Martin', // Nom différent, mais email identique
      email: 'jean@test.com'
    };

    const response = await request(app)
      .post('/api/utilisateurs')
      .send(userData)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(409); // Conflit : l’email est déjà pris
    expect(response.body.message).toBe("Utilisateur déjà existant."); // Message attendu
  });
});

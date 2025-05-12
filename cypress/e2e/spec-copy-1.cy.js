// filepath: cypress/e2e/user.spec.js

describe("Tests E2E pour les utilisateurs", () => {
  it("Création d'un utilisateur, connexion et vérification", () => {
    // Étape 1 : Créer un utilisateur via une requête API
    cy.request("POST", "http://localhost:5000/api/utilisateurs", {
      prenom: "Jean",
      nom: "Dupont",
      email: "jean.dupont@gmail.com", 
    }).then((response) => {
      expect(response.status).to.eq(201); // Vérifie que la création a réussi
    });

    cy.log("Utilisateur créé avec succès");
  });
});

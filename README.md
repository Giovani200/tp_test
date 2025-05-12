# TP Test

## Membres du groupe
- Giovani
- Mohamed
- Elyes
- Yann
- Enzo

## Description des fonctionnalités

### 1. Création d'utilisateur (POST /users)
Cette fonctionnalité permet de :
- Créer un nouvel utilisateur via un formulaire HTML
- Valider les données entrées (nom, prénom, email, âge)
- Sauvegarder les informations dans la base de données MongoDB
- Retourner une confirmation de création avec les détails de l'utilisateur

### 2. Liste des utilisateurs (GET /users)
Cette fonctionnalité permet de :
- Récupérer la liste complète des utilisateurs depuis MongoDB
- Afficher les utilisateurs dans une interface web responsive
- Trier et filtrer les utilisateurs (optionnel)

## Installation du projet

1. **Prérequis**
- Node.js (version 14 ou supérieure)
- MongoDB installé et en cours d'exécution
- Git

2. **Cloner le projet**
```bash
git clone https://github.com/Giovani200/tp_test.git
cd tp_test
```

3. **Installation des dépendances**
```bash
npm install
```

4. **Configuration**
Créez un fichier `.env` à la racine du projet :
```
MONGODB_URI=mongodb://localhost:27017/tp_test
PORT=3000
```

5. **Lancer l'application**
```bash
npm start
```
L'application sera disponible sur http://localhost:5000

## Tests

### Tests Unitaires
Tests des fonctions individuelles et de la logique métier
```bash
npm run test:unit
```

### Tests d'Intégration
Tests de l'interaction entre les différentes parties de l'application
```bash
npm run test:int
```

### Tests End-to-End (E2E)
Tests de l'application complète simulant des interactions utilisateur
```bash
npm run test:e2e
```

## Exemples d'utilisation des API

### Créer un utilisateur

**Requête :**
```bash
curl -X POST http://localhost:5000/ \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Dubois",
    "prenom": "Marie",
    "email": "marie.dubois@email.com"
  }'
```

**Réponse :**
```json
{
  "id": "65f1a2b3c4d5e6f7g8h9i0",
  "nom": "Dubois",
  "prenom": "Marie",
  "email": "marie.dubois@email.com"
}
```

### Lister les utilisateurs

**Requête :**
```bash
curl http://localhost:5000/api/utilisateurs
```

**Réponse :**
```json
[
  {
    "id": "65f1a2b3c4d5e6f7g8h9i0",
    "nom": "Dubois",
    "prenom": "Marie",
    "email": "marie.dubois@email.com"
  }
]
```

### Interface Web
Vous pouvez également utiliser l'interface web disponible sur http://localhost:5000 pour :
- Remplir le formulaire de création d'utilisateur
- Visualiser la liste des utilisateurs existants

## Documentation Swagger

Pour visualiser la documentation de l'API, vous avez plusieurs options :

### 1. Utiliser Swagger Editor en ligne
1. Visitez [Swagger Editor](https://editor.swagger.io/)
2. Copiez le contenu du fichier `swagger.yaml`
3. Collez-le dans l'éditeur en ligne

### 2. Extension VS Code
1. Installer l'extension "Swagger Viewer" dans VS Code
2. Ouvrir le fichier `swagger.yaml`
3. Appuyer sur `Alt+Shift+P`
4. Taper "Swagger Viewer: Preview Swagger" et valider
const mongoose = require("mongoose");
require("dotenv").config();

const connecterDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log("Connexion à MongoDB réussie !");
    } catch (error) {
        console.error("Erreur de connexion à MongoDB :", error);
        process.exit(1);
    }
};

module.exports = connecterDB;

const  mongoose = require('mongoose');
const { Schema } = mongoose;

const userShema = new Schema({

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
    },
})
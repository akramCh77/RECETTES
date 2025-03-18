const mongoose = require("mongoose");

const recetteSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  ingredients: { type: [String], required: true },
  temps_preparation: { type: Number, required: true }, // en minutes
  difficulte: { type: String, required: true },
  etapes: { type: [String], required: true }, // Tableau d'étapes
}, { timestamps: true });

module.exports = mongoose.model("Recette", recetteSchema);

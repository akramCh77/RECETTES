const mongoose = require("mongoose");

const recetteSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  ingredients: { type: [String], required: true },
  temps_preparation: { type: Number, required: true }, // en minutes
  difficulte: { type: String, required: true },
  etapes: { type: [String], required: true }, // Tableau d'étapes
  imageUrl: { type: String, required: true }, // Ajout du champ image
  videoUrl: { type: String,default:""},
}, { timestamps: true });

module.exports = mongoose.model("Recette", recetteSchema);



// ca maffiche ca StatusCode        : 200
// StatusDescription : OK
// Content           : [{"_id":"67d98980a2e1caa34df4feef","nom":"Rechta","ingredients":["530g de farine","250ml      
//                     d'eau","1 poulet coupé en morceaux","200g de pois chiches (trempés la veille)","2
//                     oignons","2 gousses d'ail","1...
// RawContent        : HTTP/1.1 200 OK
//                     Access-Control-Allow-Origin: *
//                     Connection: keep-alive
//                     Keep-Alive: timeout=5
//                     Content-Length: 7608
//                     Content-Type: application/json; charset=utf-8
//                     Date: Wed, 19 Mar 2025 09:29:53 GMT...
// Forms             : {}
// Headers           : {[Access-Control-Allow-Origin, *], [Connection, keep-alive], [Keep-Alive, timeout=5],
//                     [Content-Length, 7608]...}
// Images            : {}
// InputFields       : {}
// Links             : {}
// ParsedHtml        : System.__ComObject
// RawContentLength  : 7608

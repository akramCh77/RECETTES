const express = require("express");
const Recette = require("../model/recette");

const router = express.Router();

// 🔹 Obtenir toutes les recettes
router.get("/", async (req, res) => {
  try {
    const recettes = await Recette.find();
    res.json(recettes);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🔹 Obtenir une recette par ID
router.get("/:id", async (req, res) => {
  try {
    const recette = await Recette.findById(req.params.id);
    if (!recette) return res.status(404).json({ message: "Recette non trouvée" });
    res.json(recette);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🔹 Ajouter une nouvelle recette
router.post("/", async (req, res) => {
  try {
    const { nom, ingredients, temps_preparation, difficulte, etapes, imageUrl,videoUrl } = req.body;
    const nouvelleRecette = new Recette({ nom, ingredients, temps_preparation, difficulte, etapes, imageUrl,videoUrl });

    await nouvelleRecette.save();
    res.status(201).json(nouvelleRecette);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de la recette", error: error.message });
  }
});

// 🔹 Modifier une recette
router.put("/:id", async (req, res) => {
  try {
  
    const recette = await Recette.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
    if (!recette) return res.status(404).json({ message: "Recette non trouvée" });
    res.json(recette);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🔹 Supprimer une recette
router.delete("/:id", async (req, res) => {
  try {
    const recette = await Recette.findByIdAndDelete(req.params.id);
    if (!recette) return res.status(404).json({ message: "Recette non trouvée" });
    res.json({ message: "Recette supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;

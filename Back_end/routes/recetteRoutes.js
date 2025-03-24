// // const express = require("express");
// // const Recette = require("../model/recette");



// // const router = express.Router();

// // // 1️⃣ Obtenir toutes les recettes
// // router.get("/", async (req, res) => {
// //   try {
// //     const recettes = await Recette.find();
// //     console.log("✅ Recettes trouvées dans la base :", recettes);
// //     if (recettes.length === 0) {
// //       return res.json({ message: "Aucune recette trouvée." });  // Vérifie bien ici
// //     }
// //     res.json(recettes);
// //   } catch (error) {
// //     res.status(500).json({ message: "Erreur serveur" });
// //   }
// // });

// // // 2️⃣ Obtenir une recette par ID
// // router.get("/:id", async (req, res) => {
// //   try {
// //     const recette = await Recette.findById(req.params.id);
// //     if (!recette) return res.status(404).json({ message: "Recette non trouvée" });
// //     res.json(recette);
// //   } catch (error) {
// //     res.status(500).json({ message: "Erreur serveur" });
// //   }
// // });

// // // 3️⃣ Ajouter une nouvelle recette
// // router.post("/", async (req, res) => {
// //     try {
// //         const { nom, ingredients, temps_preparation, difficulte, etapes } = req.body;
// //         const nouvelleRecette = new Recette({ nom, ingredients, temps_preparation, difficulte, etapes });

// //         await nouvelleRecette.save();
// //         res.status(201).json(nouvelleRecette);
// //     } catch (error) {
// //         res.status(500).json({ message: "Erreur lors de l'ajout de la recette", error: error.message });
// //     }
// // });

// // // 4️⃣ Modifier une recette
// // router.put("/:id", async (req, res) => {
// //   try {
// //     const recette = await Recette.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //     if (!recette) return res.status(404).json({ message: "Recette non trouvée" });
// //     res.json(recette);
// //   } catch (error) {
// //     res.status(500).json({ message: "Erreur serveur" });
// //   }
// // });

// // // 5️⃣ Supprimer une recette
// // router.delete("/:id", async (req, res) => {
// //   try {
// //     const recette = await Recette.findByIdAndDelete(req.params.id);
// //     if (!recette) return res.status(404).json({ message: "Recette non trouvée" });
// //     res.json({ message: "Recette supprimée" });
// //   } catch (error) {
// //     res.status(500).json({ message: "Erreur serveur" });
// //   }
// // });

// // module.exports = router;




// const express = require("express");
// const Recette = require("../model/recette");

// const router = express.Router();

// // Obtenir toutes les recettes
// router.get("/", async (req, res) => {
//   try {
//     const recettes = await Recette.find();
//     res.json(recettes);
//   } catch (error) {
//     console.error("❌ Erreur lors de la récupération des recettes :", error.message);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// });

// // Obtenir une recette par ID
// router.get("/:id", async (req, res) => {
//   try {
//     const recette = await Recette.findById(req.params.id);
//     if (!recette) return res.status(404).json({ message: "Recette non trouvée" });
//     res.json(recette);
//   } catch (error) {
//     console.error("❌ Erreur lors de la récupération de la recette :", error.message);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// });

// // Ajouter une nouvelle recette
// router.post("/", async (req, res) => {
//   try {
//     const { nom, ingredients, temps_preparation, difficulte, etapes, description } = req.body;

//     // Vérification des champs obligatoires
//     if (!nom || !ingredients.length || !temps_preparation || !difficulte || !etapes.length) {
//       return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis" });
//     }

//     const nouvelleRecette = new Recette({ nom, ingredients, temps_preparation, difficulte, etapes, description });
//     await nouvelleRecette.save();
//     res.status(201).json(nouvelleRecette);
//   } catch (error) {
//     console.error("❌ Erreur lors de l'ajout de la recette :", error.message);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// });

// // Modifier une recette
// router.put("/:id", async (req, res) => {
//   try {
//     const recette = await Recette.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!recette) return res.status(404).json({ message: "Recette non trouvée" });
//     res.json(recette);
//   } catch (error) {
//     console.error("❌ Erreur lors de la modification de la recette :", error.message);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// });

// // Supprimer une recette
// router.delete("/:id", async (req, res) => {
//   try {
//     const recette = await Recette.findByIdAndDelete(req.params.id);
//     if (!recette) return res.status(404).json({ message: "Recette non trouvée" });
//     res.json({ message: "Recette supprimée" });
//   } catch (error) {
//     console.error("❌ Erreur lors de la suppression de la recette :", error.message);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// });

// module.exports = router;

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

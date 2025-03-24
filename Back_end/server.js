require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
})
  .then(() => console.log("✅ MongoDB Atlas connecté !"))
  .catch(err => {
    console.error("❌ Erreur de connexion à MongoDB :", err.message);
    process.exit(1); // Quitte le processus si la connexion échoue
  });

// Vérification des requêtes reçues
app.use((req, res, next) => {
  console.log(`📢 Requête reçue : ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/recettes", require("./routes/recetteRoutes"));

// Middleware de gestion d'erreur
app.use((err, req, res, next) => {
  console.error("🔥 Erreur attrapée :", err.message);
  res.status(500).json({ message: "Erreur interne du serveur" });
});

// Démarrer le serveur
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));

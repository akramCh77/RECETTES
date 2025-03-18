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
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Atlas connecté !"))
  .catch(err => console.error("❌ Erreur de connexion à MongoDB :", err));

// Routes
app.use("/api/recettes", require("./routes/recetteRoutes"));

// Démarrer le serveur
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));

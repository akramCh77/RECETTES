import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

// import RecetteDetails from "./pages/RecetteDetails";
import AjouterRecette from "./pages/AjouterRecette";
import ModifierRecette from "./pages/ModifierRecettes";
import Navbar from "./components/Navbar";
import VoirRecette from "./pages/VoirRecette";
import RecettePDF from "./components/recettePdf"
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ajouter" element={<AjouterRecette />} />
        <Route path="/modifier/:id" element={<ModifierRecette />} />
        <Route path="/voir-recette/:id" element={<VoirRecette />} />
        <Route path="/recette-pdf/:id" element={<RecettePDF />} />

      </Routes>
    </Router>
  );
}

export default App;

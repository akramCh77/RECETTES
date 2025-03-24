import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecetteById, updateRecette } from "../services/api";

const ModifierRecette = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [recette, setRecette] = useState({
    nom: "",
    temps_preparation: "",
    difficulte: "",
    ingredients: "",
    etapes: "",
    imageUrl: "",
  });

  useEffect(() => {
    getRecetteById(id)
      .then((response) => {
        const data = response.data;
        setRecette({
          nom: data.nom,
          temps_preparation: data.temps_preparation,
          difficulte: data.difficulte,
          ingredients: data.ingredients.join(", "),  // Transforme en texte
          etapes: data.etapes.join("\n"),  // Transforme en texte
          imageUrl: data.imageUrl || "",  // Gère les images manquantes
          videoUrl:data.videoUrl || "",
        });
      })
      .catch((error) => console.error("Erreur lors du chargement de la recette:", error));
  }, [id]);

  const handleChange = (e) => {
    setRecette({ ...recette, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedRecette = {
      ...recette,
      ingredients: recette.ingredients.split(",").map((ing) => ing.trim()), // Transforme en tableau
      etapes: recette.etapes.split("\n").map((step) => step.trim()), // Transforme en tableau
    };

    await updateRecette(id, updatedRecette);
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Modifier la Recette</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Nom de la recette</label>
          <input
            type="text"
            className="form-control"
            name="nom"
            value={recette.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Temps de préparation (min)</label>
          <input
            type="number"
            className="form-control"
            name="temps_preparation"
            value={recette.temps_preparation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Difficulté</label>
          <select
            className="form-control"
            name="difficulte"
            value={recette.difficulte}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez...</option>
            <option value="Facile">Facile</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Ingrédients (séparés par des virgules)</label>
          <input
            type="text"
            className="form-control"
            name="ingredients"
            value={recette.ingredients}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Étapes (une étape par ligne)</label>
          <textarea
            className="form-control"
            name="etapes"
            rows="4"
            value={recette.etapes}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">URL de l'image</label>
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            value={recette.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">URL de la video</label>
          <input
            type="text"
            className="form-control"
            name="videoUrl"
            value={recette.videoUrl}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            ✅ Enregistrer les modifications
          </button>
          <button type="button" className="btn btn-danger" onClick={() => navigate("/")}>
            ❌ Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifierRecette;

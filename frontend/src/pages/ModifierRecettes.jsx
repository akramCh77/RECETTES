import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecetteById, updateRecette } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSave, faTimes, faImage, faVideo, faUtensils, 
  faClock, faChartSimple, faListCheck, faSpinner 
} from "@fortawesome/free-solid-svg-icons";
import "./FormulaireRecette.css"; // Fichier CSS commun pour ajouter et modifier

const ModifierRecette = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const [recette, setRecette] = useState({
    nom: "",
    temps_preparation: "",
    difficulte: "",
    ingredients: "",
    etapes: "",
    imageUrl: "",
    videoUrl: "",
  });

  useEffect(() => {
    setIsLoading(true);
    getRecetteById(id)
      .then((response) => {
        const data = response.data;
        setRecette({
          nom: data.nom,
          temps_preparation: data.temps_preparation,
          difficulte: data.difficulte,
          ingredients: Array.isArray(data.ingredients) ? data.ingredients.join(", ") : data.ingredients,
          etapes: Array.isArray(data.etapes) ? data.etapes.join("\n") : data.etapes,
          imageUrl: data.imageUrl || "",
          videoUrl: data.videoUrl || "",
        });
      })
      .catch((error) => console.error("Erreur lors du chargement de la recette:", error))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setRecette({ ...recette, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedRecette = {
      ...recette,
      ingredients: recette.ingredients.split(",").map((ing) => ing.trim()),
      etapes: recette.etapes.split("\n").map((step) => step.trim()),
    };

    try {
      await updateRecette(id, updatedRecette);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      // Ici vous pourriez ajouter un traitement pour afficher l'erreur à l'utilisateur
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} spin className="spinner-icon" />
        <p>Chargement de la recette...</p>
      </div>
    );
  }

  return (
    <div className="formulaire-recette-container">
      <div className="formulaire-header">
        <h1>Modifier la Recette</h1>
        <p className="formulaire-subtitle">Mettez à jour votre délicieuse création</p>
      </div>
      
      <form onSubmit={handleSubmit} className="formulaire-recette">
        {/* Nom */}
        <div className="form-group">
          <label className="form-label">
            Nom de la recette <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            name="nom"
            value={recette.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          {/* URL de l'image */}
          <div className="form-group">
            <label className="form-label">
              <FontAwesomeIcon icon={faImage} className="form-icon" /> URL de l'image <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              name="imageUrl"
              value={recette.imageUrl}
              onChange={handleChange}
              required
            />
            {recette.imageUrl && (
              <div className="image-preview">
                <img 
                  src={recette.imageUrl} 
                  alt="Aperçu" 
                  onError={(e) => { e.target.src = "/default-recipe.jpg"; }}
                />
              </div>
            )}
          </div>

          {/* URL de la video */}
          <div className="form-group">
            <label className="form-label">
              <FontAwesomeIcon icon={faVideo} className="form-icon" /> URL de la vidéo
            </label>
            <input
              type="text"
              className="form-input"
              name="videoUrl"
              value={recette.videoUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          {/* Temps de préparation */}
          <div className="form-group">
            <label className="form-label">
              <FontAwesomeIcon icon={faClock} className="form-icon" /> Temps de préparation (min) <span className="required">*</span>
            </label>
            <input
              type="number"
              className="form-input"
              name="temps_preparation"
              value={recette.temps_preparation}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          {/* Difficulté */}
          <div className="form-group">
            <label className="form-label">
              <FontAwesomeIcon icon={faChartSimple} className="form-icon" /> Difficulté <span className="required">*</span>
            </label>
            <select
              className="form-input"
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
        </div>

        {/* Ingrédients */}
        <div className="form-group">
          <label className="form-label">
            <FontAwesomeIcon icon={faUtensils} className="form-icon" /> Ingrédients <span className="required">*</span>
            <small className="help-text"> (Séparés par des virgules)</small>
          </label>
          <textarea
            className="form-input form-textarea"
            name="ingredients"
            value={recette.ingredients}
            onChange={handleChange}
            placeholder="Farine, sucre, beurre, ..."
            required
          ></textarea>
        </div>

        {/* Étapes */}
        <div className="form-group">
          <label className="form-label">
            <FontAwesomeIcon icon={faListCheck} className="form-icon" /> Étapes de préparation <span className="required">*</span>
            <small className="help-text"> (Une étape par ligne)</small>
          </label>
          <textarea
            className="form-input form-textarea large"
            name="etapes"
            rows="6"
            value={recette.etapes}
            onChange={handleChange}
            placeholder="1. Préchauffer le four à 180°C
2. Mélanger les ingrédients secs
..."
            required
          ></textarea>
        </div>

        {/* Boutons d'action */}
        <div className="form-actions">
          <button type="button" className="action-btn cancel-btn" onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faTimes} /> Annuler
          </button>
          <button type="submit" className="action-btn submit-btn">
            <FontAwesomeIcon icon={faSave} /> Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifierRecette;
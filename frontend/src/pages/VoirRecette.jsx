import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecetteById } from "../services/api";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faClock, faChartSimple, faUtensils, 
  faListCheck, faArrowLeft, faDownload, faVideo, faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import "./VoirRecette.css"; // Assurez-vous de créer ce fichier CSS

const VoirRecette = () => {
  const { id } = useParams();
  const [recette, setRecette] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getRecetteById(id)
      .then((response) => {
        setRecette(response.data);
      })
      .catch((error) => console.error("Erreur lors du chargement de la recette :", error))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Préparation de votre recette...</p>
      </div>
    );
  }

  if (!recette) {
    return (
      <div className="error-container">
        <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
        <p>Impossible de trouver cette recette.</p>
        <button className="back-btn" onClick={() => window.history.back()}>
          <FontAwesomeIcon icon={faArrowLeft} /> Retour
        </button>
      </div>
    );
  }

  const getEmbedUrl = (url) => {
    if (!url || !url.includes("youtube.com/watch?v=")) return url;
    return url.replace("watch?v=", "embed/");
  };

  return (
    <div className="recipe-view-container">
      <div className="recipe-card">
        <div className="recipe-header">
          <button className="back-button" onClick={() => window.history.back()}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h1 className="recipe-title">{recette.nom}</h1>
        </div>

        <div className="recipe-image-container">
          {recette.imageUrl ? (
            <img
              src={recette.imageUrl}
              alt={recette.nom}
              className="recipe-image"
              onError={(e) => {
                e.target.src = "/default-recipe.jpg";
              }}
            />
          ) : (
            <div className="no-image">
              <FontAwesomeIcon icon={faExclamationTriangle} className="no-image-icon" />
              <p>Image non disponible</p>
            </div>
          )}

          <div className="recipe-badges">
            <div className="recipe-badge time-badge">
              <FontAwesomeIcon icon={faClock} />
              <span>{recette.temps_preparation} min</span>
            </div>
            <div className="recipe-badge difficulty-badge">
              <FontAwesomeIcon icon={faChartSimple} />
              <span>{recette.difficulte}</span>
            </div>
          </div>
        </div>

        <div className="recipe-content">
          <div className="recipe-section">
            <h3 className="section-title">
              <FontAwesomeIcon icon={faUtensils} className="section-icon" />
              Ingrédients
            </h3>
            <ul className="ingredients-list">
              {recette.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-section">
            <h3 className="section-title">
              <FontAwesomeIcon icon={faListCheck} className="section-icon" />
              Préparation
            </h3>
            <ol className="steps-list">
              {Array.isArray(recette.etapes) ? (
                recette.etapes.map((etape, index) => (
                  <li key={index} className="step-item">{etape}</li>
                ))
              ) : (
                <li className="step-item">{recette.etapes}</li>
              )}
            </ol>
          </div>

          {recette.videoUrl && (
            <div className="recipe-section video-section">
              <h3 className="section-title">
                <FontAwesomeIcon icon={faVideo} className="section-icon" />
                Tutoriel Vidéo
              </h3>
              <div className="video-container">
                <iframe
                  src={getEmbedUrl(recette.videoUrl)}
                  title="Tutoriel vidéo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        <div className="recipe-actions">
          <button className="action-btn back-btn" onClick={() => window.history.back()}>
            <FontAwesomeIcon icon={faArrowLeft} /> Retour
          </button>
          <Link to={`/recette-pdf/${id}`} className="action-btn download-btn">
            <FontAwesomeIcon icon={faDownload} /> Télécharger PDF
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VoirRecette;
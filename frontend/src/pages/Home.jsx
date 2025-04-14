import { useEffect, useState } from "react";
import { getRecettes, deleteRecette } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, faUtensils, faClock, faChartSimple, 
  faSearch, faChevronRight, faSadTear 
} from "@fortawesome/free-solid-svg-icons";
import "./home.css";

const Home = () => {
  const [recettes, setRecettes] = useState([]);
  const [filteredRecettes, setFilteredRecettes] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getRecettes()
      .then((response) => {
        setRecettes(response.data);
        setFilteredRecettes(response.data);
      })
      .catch((error) => console.error("Erreur lors du chargement des recettes:", error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette recette ?")) {
      await deleteRecette(id);
      setRecettes(recettes.filter((recette) => recette._id !== id));
      setFilteredRecettes(filteredRecettes.filter((recette) => recette._id !== id));
    }
  };



  const handleSearch = (e) => {
    e.preventDefault();
    const results = recettes.filter(recette => 
      recette.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recette.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredRecettes(results);
    setActiveFilter("all");
  };
  

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (filter === "all") {
      setFilteredRecettes(recettes);
    } else if (filter === "easy") {
      setFilteredRecettes(recettes.filter(recette => recette.difficulte.toLowerCase() === "facile"));
    } else if (filter === "medium") {
      setFilteredRecettes(recettes.filter(recette => recette.difficulte.toLowerCase() === "moyenne"));
    } else if (filter === "hard") {
      setFilteredRecettes(recettes.filter(recette => recette.difficulte.toLowerCase() === "difficile"));
    } else if (filter === "quick") {
      setFilteredRecettes(recettes.filter(recette => parseInt(recette.temps_preparation) <= 30));
    }
  };

  // Fonction pour afficher les ingrédients de manière lisible
  const formatIngredients = (ingredients) => {
    // Si ingredients est null, undefined ou une chaîne vide, retournez une valeur par défaut
    if (!ingredients) {
      return ''; // ou retournez un message comme "No ingredients"
    }
  
    // Si ingredients est déjà un tableau, joignez-les directement
    if (Array.isArray(ingredients)) {
      return ingredients.map(item => item.trim()).join(', ');
    }
  
    // Si ingredients est une chaîne de caractères, utilisez split
    if (typeof ingredients === 'string') {
      return ingredients.split(',').map(item => item.trim()).join(', ');
    }
  
    // Si ingredients est d'un autre type (nombre, objet, etc.), convertissez-le en chaîne
    return String(ingredients).split(',').map(item => item.trim()).join(', ');
  };



  return (
    <div className="home-container">
      {/* Header */}
      <div className="home-header">
        <h1 className="home-title">Avais-vous <span className="title-accent">faim</span> ? 🤤</h1>
        <h2 className="home-subtitle">Vous êtes au bon endroit pour découvrir des recettes authentiques</h2>
        
        {/* Barre de recherche */}
        <form className="search-container" onSubmit={handleSearch}>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Rechercher une recette ou un ingrédient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>

      {/* Conteneur pour filtres et bouton ajouter */}
      <div className="action-container">
        <div className="filter-container">
          <button 
            className={`filter-button ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => handleFilter("all")}
          >
            Toutes les recettes
          </button>
          <button 
            className={`filter-button ${activeFilter === "easy" ? "active" : ""}`}
            onClick={() => handleFilter("easy")}
          >
            Faciles
          </button>

          <button 
            className={`filter-button ${activeFilter === "medium" ? "active" : ""}`}
            onClick={() => handleFilter("medium")}
          >
            Moyennes
          </button>

          <button 
            className={`filter-button ${activeFilter === "hard" ? "active" : ""}`}
            onClick={() => handleFilter("hard")}
          >
            Difficile
          </button>

          <button 
            className={`filter-button ${activeFilter === "quick" ? "active" : ""}`}
            onClick={() => handleFilter("quick")}
          >
            Rapides (≤ 30 min)
          </button>
        </div>
        
        <button className="ajouter-btn" onClick={() => navigate("/ajouter")}>
          <FontAwesomeIcon icon={faPlus} className="btn-icon" />
          Ajouter une Recette
        </button>
      </div>

      {/* Liste des recettes */}
      <div className="recettes-grid">
        {filteredRecettes.length === 0 ? (
          <div className="no-recettes">
            <div className="no-recettes-icon">
              <FontAwesomeIcon icon={faSadTear} />
            </div>
            <p>Aucune recette ne correspond à votre recherche.</p>
          </div>
        ) : (
          filteredRecettes.map((recette) => (
            <div key={recette._id}>
              <div className="recette-card">
                {/* Image avec badges */}
                <div className="image-container">
                  <img
                    src={recette.imageUrl || "/default-recipe.jpg"}
                    alt={recette.nom}
                  />
                  <div className="difficulty-badge">
                    {recette.difficulte}
                  </div>
                  <div className="time-badge">
                    {recette.temps_preparation} min
                  </div>
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{recette.nom}</h5>
                  
                  <div className="card-info">
                    <div className="info-item">
                      <FontAwesomeIcon icon={faClock} className="info-icon" />
                      <span>Préparation: {recette.temps_preparation} minutes</span>
                    </div>
                    <div className="info-item">
                      <FontAwesomeIcon icon={faChartSimple} className="info-icon" />
                      <span>Difficulté: {recette.difficulte}</span>
                    </div>
                    <div className="info-item">
                      <FontAwesomeIcon icon={faUtensils} className="info-icon" />
                      <span>Ingrédients principaux</span>
                    </div>
                  </div>
                  
                  <p className="ingredients-list">{formatIngredients(recette.ingredients)}</p>
                  
                  {/* Actions */}
                  <div className="card-actions">
                    <button 
                      className="voir-btn" 
                      onClick={() => navigate(`/voir-recette/${recette._id}`)}
                    >
                       Voir la recette
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                    
                    <Dropdown className="options-dropdown">
                      <Dropdown.Toggle variant="secondary" id={`dropdown-${recette._id}`}>
                        Options
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate(`/modifier/${recette._id}`)}>
                          <FontAwesomeIcon icon={faPlus} className="me-2" /> Modifier
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={() => handleDelete(recette._id)} 
                          className="text-danger"
                        >
                          <FontAwesomeIcon icon={faPlus} className="me-2" /> Supprimer
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
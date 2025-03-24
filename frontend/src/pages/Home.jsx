// import { useEffect, useState } from "react";
// import { getRecettes } from "../services/api";
// import { Link } from "react-router-dom";

// function Home() {
//   const [recettes, setRecettes] = useState([]);

//   useEffect(() => {
//     getRecettes().then(response => setRecettes(response.data)).catch(error => console.error(error));
//   }, []);

//   return (
//     <div>
//       <h1>Recettes de Cuisine 🍽️</h1>
//       <Link to="/ajouter"><button>Ajouter une recette</button></Link>
//       <ul>
//         {recettes.map(recette => (
//           <li key={recette._id}>
//             <Link to={`/recette/${recette._id}`}>
//               <h3>{recette.titre}</h3>
//               <p>{recette.categorie} | {recette.tempsPreparation} min</p>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Home;


// import { useEffect, useState } from "react";
// import { getRecettes } from "../services/api";
//  // Assurez-vous d'avoir un fichier CSS pour le style

// const Home = () => {
//   const [recettes, setRecettes] = useState([]);

//   useEffect(() => {
//     getRecettes()
//       .then((response) => {
//         console.log("Données reçues :", response.data); // Vérifie les données
//         setRecettes(response.data);
//       })
//       .catch((error) => console.error("Erreur lors du chargement des recettes:", error));
//   }, []);

//   return (
//     <div className="recette-container">
//       <h1>Liste des Recettes</h1>
//       {recettes.length === 0 ? (
//         <p>Aucune recette trouvée.</p>
//       ) : (
//         <div>
//           {recettes.map((recette) => (
//             <div key={recette._id} className="recette">
//               <h2>{recette.nom}</h2>
//               <p><strong>Temps de préparation :</strong> {recette.temps_preparation} min</p>
//               <p><strong>Difficulté :</strong> {recette.difficulte}</p>
//               <p><strong>Ingrédients :</strong></p>
//               <ul>
//                 {recette.ingredients.map((ingredient, index) => (
//                   <li key={index}>{ingredient}</li>
//                 ))}
//               </ul>
//               <p><strong>Étapes :</strong></p>
//               <ol>
//                 {recette.etapes.map((etape, index) => (
//                   <li key={index}>{etape}</li>
//                 ))}
//               </ol>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

// import { useEffect, useState } from "react";
// import { getRecettes, deleteRecette } from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { Dropdown } from "react-bootstrap";

// const Home = () => {
//   const [recettes, setRecettes] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getRecettes()
//       .then((response) => {
//         setRecettes(response.data);
//       })
//       .catch((error) => console.error("Erreur lors du chargement des recettes:", error));
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Voulez-vous vraiment supprimer cette recette ?")) {
//       await deleteRecette(id);
//       setRecettes(recettes.filter((recette) => recette._id !== id));
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="text-center">Liste des Recettes</h1>
//       <div className="d-flex justify-content-end mb-3">
//         <button className="btn btn-primary" onClick={() => navigate("/ajouter")}>
//           ➕ Ajouter une Recette
//         </button>
//       </div>

//       {recettes.length === 0 ? (
//         <p className="text-center">Aucune recette trouvée.</p>
//       ) : (
//         <div className="row">
//           {recettes.map((recette) => (
//             <div key={recette._id} className="col-md-4 mb-4">
//               <div className="card">
//                 <img src="/default-recipe.jpg" className="card-img-top" alt="Recette" />
//                 <div className="card-body">
//                   <h5 className="card-title">{recette.nom}</h5>
//                   <p><strong>Temps de préparation :</strong> {recette.temps_preparation} min</p>
//                   <p><strong>Difficulté :</strong> {recette.difficulte}</p>
//                   <p><strong>Ingrédients :</strong> {recette.ingredients.join(", ")}</p>

//                   <Dropdown>
//                     <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                       ⚙️
//                     </Dropdown.Toggle>

//                     <Dropdown.Menu>
//                       <Dropdown.Item onClick={() => navigate(`/recette/${recette._id}`)}>Voir</Dropdown.Item>
//                       <Dropdown.Item onClick={() => navigate(`/modifier/${recette._id}`)}>Modifier</Dropdown.Item>
//                       <Dropdown.Item onClick={() => handleDelete(recette._id)} className="text-danger">
//                         Supprimer
//                       </Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

// import { useEffect, useState } from "react";
// import { getRecettes, deleteRecette } from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { Dropdown } from "react-bootstrap";

// const Home = () => {
//   const [recettes, setRecettes] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getRecettes()
//       .then((response) => setRecettes(response.data))
//       .catch((error) => console.error("Erreur lors du chargement des recettes:", error));
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Voulez-vous vraiment supprimer cette recette ?")) {
//       await deleteRecette(id);
//       setRecettes(recettes.filter((recette) => recette._id !== id));
//     }
//   };

//   return (
//     <div className="container mt-4">
//       {/* Navbar avec titre et drapeau algérien */}
//       {/* <nav className="navbar navbar-light bg-light mb-4 shadow-sm p-3">
//         <h1 className="navbar-brand mx-auto"> Recettes Traditionnelles Algériennes</h1>
//       </nav> */}

//       {/* Bouton Ajouter une Recette */}
//       <div className="d-flex justify-content-end mb-3">
//         <button className="btn btn-primary" onClick={() => navigate("/ajouter")}>
//           ➕ Ajouter une Recette
//         </button>
//       </div>

//       {recettes.length === 0 ? (
//         <p className="text-center">Aucune recette trouvée.</p>
//       ) : (
//         <div className="row">
//           {recettes.map((recette) => (
//             <div key={recette._id} className="col-md-4 d-flex align-items-stretch">
//               <div className="card shadow-sm w-100">
//                 {/* Affichage de l'image de la recette */}
//                 <img
//                   src={recette.imageUrl || "/default-recipe.jpg"}
//                   className="card-img-top"
//                   alt={recette.nom}
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />

//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title">{recette.nom}</h5>
//                   <p><strong>Temps de préparation :</strong> {recette.temps_preparation} min</p>
//                   <p><strong>Difficulté :</strong> {recette.difficulte}</p>
//                   <p><strong>Ingrédients :</strong> {recette.ingredients.join(", ")}</p>

//                   {/* Dropdown pour Modifier/Supprimer */}
//                   <Dropdown className="mt-auto align-self-end">
//                     <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                       ⚙️
//                     </Dropdown.Toggle>

//                     <Dropdown.Menu>
//                       <Dropdown.Item onClick={() => navigate(`/voir-recette/${recette._id}`)}>
//                        👀Voir
//                       </Dropdown.Item>
//                       <Dropdown.Item onClick={() => navigate(`/modifier/${recette._id}`)}>
//                         ✏ Modifier
//                       </Dropdown.Item>
//                       <Dropdown.Item onClick={() => handleDelete(recette._id)} className="text-danger">
//                         supprimer
//                       </Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";
import { getRecettes, deleteRecette } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, faUtensils, faClock, faChartSimple, 
  faSearch, faChevronRight, faSadTear 
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

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
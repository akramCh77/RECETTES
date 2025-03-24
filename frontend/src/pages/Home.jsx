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

import { useEffect, useState } from "react";
import { getRecettes, deleteRecette } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const Home = () => {
  const [recettes, setRecettes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRecettes()
      .then((response) => setRecettes(response.data))
      .catch((error) => console.error("Erreur lors du chargement des recettes:", error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette recette ?")) {
      await deleteRecette(id);
      setRecettes(recettes.filter((recette) => recette._id !== id));
    }
  };

  return (
    <div className="container mt-4">
      {/* Navbar avec titre et drapeau algérien */}
      {/* <nav className="navbar navbar-light bg-light mb-4 shadow-sm p-3">
        <h1 className="navbar-brand mx-auto"> Recettes Traditionnelles Algériennes</h1>
      </nav> */}

      {/* Bouton Ajouter une Recette */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={() => navigate("/ajouter")}>
          ➕ Ajouter une Recette
        </button>
      </div>

      {recettes.length === 0 ? (
        <p className="text-center">Aucune recette trouvée.</p>
      ) : (
        <div className="row">
          {recettes.map((recette) => (
            <div key={recette._id} className="col-md-4 d-flex align-items-stretch">
              <div className="card shadow-sm w-100">
                {/* Affichage de l'image de la recette */}
                <img
                  src={recette.imageUrl || "/default-recipe.jpg"}
                  className="card-img-top"
                  alt={recette.nom}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{recette.nom}</h5>
                  <p><strong>Temps de préparation :</strong> {recette.temps_preparation} min</p>
                  <p><strong>Difficulté :</strong> {recette.difficulte}</p>
                  <p><strong>Ingrédients :</strong> {recette.ingredients.join(", ")}</p>

                  {/* Dropdown pour Modifier/Supprimer */}
                  <Dropdown className="mt-auto align-self-end">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      ⚙️
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => navigate(`/voir-recette/${recette._id}`)}>
                       👀Voir
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate(`/modifier/${recette._id}`)}>
                        ✏ Modifier
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(recette._id)} className="text-danger">
                        supprimer
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;



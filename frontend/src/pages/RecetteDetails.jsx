// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { getRecetteById } from "../services/api";

// // const RecetteDetails = () => {
// //   const { id } = useParams();
// //   const [recette, setRecette] = useState(null);

// //   useEffect(() => {
// //     getRecetteById(id)
// //       .then((response) => {
// //         console.log("Détails de la recette :", response.data); // Vérifie les données
// //         setRecette(response.data);
// //       })
// //       .catch((error) => console.error("Erreur lors du chargement de la recette:", error));
// //   }, [id]);

// //   if (!recette) return <p>Chargement...</p>;

// //   return (
// //     <div className="recette-details">
// //       <h1>{recette.nom}</h1>
// //       <p><strong>Temps de préparation :</strong> {recette.temps_preparation} min</p>
// //       <p><strong>Difficulté :</strong> {recette.difficulte}</p>

// //       <h3>Ingrédients :</h3>
// //       <ul>
// //         {recette.ingredients.map((ingredient, index) => (
// //           <li key={index}>{ingredient}</li>
// //         ))}
// //       </ul>

// //       <h3>Étapes :</h3>
// //       <ol>
// //         {recette.etapes.map((etape, index) => (
// //           <li key={index}>{etape}</li>
// //         ))}
// //       </ol>
// //     </div>
// //   );
// // };

// // export default RecetteDetails;



// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getRecetteById } from "../services/api";

// const RecetteDetails = () => {
//   const { id } = useParams();
//   const [recette, setRecette] = useState(null);

//   useEffect(() => {
//     getRecetteById(id)
//       .then((response) => setRecette(response.data))
//       .catch((error) => console.error("Erreur lors du chargement de la recette:", error));
//   }, [id]);

//   if (!recette) return <p className="text-center">Chargement...</p>;

//   return (
//     <div className="container mt-4">
//       <div className="card mx-auto" style={{ maxWidth: "600px" }}>
//         <img src="/default-recipe.jpg" className="card-img-top" alt="Recette" />
//         <div className="card-body">
//           <h1 className="card-title">{recette.nom}</h1>
//           <p><strong>Temps de préparation :</strong> {recette.temps_preparation} min</p>
//           <p><strong>Difficulté :</strong> {recette.difficulte}</p>

//           <h3>Ingrédients :</h3>
//           <ul>
//             {recette.ingredients.map((ingredient, index) => (
//               <li key={index}>{ingredient}</li>
//             ))}
//           </ul>

//           <h3>Étapes :</h3>
//           <ol>
//             {recette.etapes.map((etape, index) => (
//               <li key={index}>{etape}</li>
//             ))}
//           </ol>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecetteDetails;

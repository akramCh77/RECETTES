// import { useState } from "react";
// import { createRecette } from "../services/api";
// import { useNavigate } from "react-router-dom";

// const AjouterRecette = () => {
//   const navigate = useNavigate();

//   const [recette, setRecette] = useState({
//     nom: "",
//     ingredients: [""],
//     temps_preparation: "",
//     difficulte: "",
//     etapes: [""],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setRecette({ ...recette, [name]: value });
//   };

//   const handleArrayChange = (index, field, value) => {
//     const updatedArray = [...recette[field]];
//     updatedArray[index] = value;
//     setRecette({ ...recette, [field]: updatedArray });
//   };

//   const addArrayField = (field) => {
//     setRecette({ ...recette, [field]: [...recette[field], ""] });
//   };

//   const removeArrayField = (field, index) => {
//     const updatedArray = recette[field].filter((_, i) => i !== index);
//     setRecette({ ...recette, [field]: updatedArray });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createRecette(recette)
//       .then(() => {
//         alert("Recette ajoutée avec succès !");
//         navigate("/");
//       })
//       .catch((error) => console.error("Erreur lors de l'ajout de la recette:", error));
//   };

//   return (
//     <div className="form-container">
//       <h1>Ajouter une Recette</h1>
//       <form onSubmit={handleSubmit}>
//         <label>Nom :</label>
//         <input type="text" name="nom" value={recette.nom} onChange={handleChange} required />

//         <label>Temps de préparation (en min) :</label>
//         <input type="number" name="temps_preparation" value={recette.temps_preparation} onChange={handleChange} required />

//         <label>Difficulté :</label>
//         <select name="difficulte" value={recette.difficulte} onChange={handleChange} required>
//           <option value="">Sélectionner</option>
//           <option value="Facile">Facile</option>
//           <option value="Moyen">Moyen</option>
//           <option value="Difficile">Difficile</option>
//         </select>

//         <label>Ingrédients :</label>
//         {recette.ingredients.map((ingredient, index) => (
//           <div key={index}>
//             <input type="text" value={ingredient} onChange={(e) => handleArrayChange(index, "ingredients", e.target.value)} required />
//             <button type="button" onClick={() => removeArrayField("ingredients", index)}>-</button>
//           </div>
//         ))}
//         <button type="button" onClick={() => addArrayField("ingredients")}>Ajouter un ingrédient</button>

//         <label>Étapes :</label>
//         {recette.etapes.map((etape, index) => (
//           <div key={index}>
//             <textarea value={etape} onChange={(e) => handleArrayChange(index, "etapes", e.target.value)} required />
//             <button type="button" onClick={() => removeArrayField("etapes", index)}>-</button>
//           </div>
//         ))}
//         <button type="button" onClick={() => addArrayField("etapes")}>Ajouter une étape</button>

//         <button type="submit">Ajouter</button>
//       </form>
//     </div>
//   );
// };

// export default AjouterRecette;


// import { useState } from "react";
// import { createRecette } from "../services/api";
// import { useNavigate } from "react-router-dom";

// const AjouterRecette = () => {
//   const navigate = useNavigate();
//   const [recette, setRecette] = useState({
//     nom: "",
//     ingredients: [""],
//     temps_preparation: "",
//     difficulte: "",
//     etapes: [""],
//   });

//   const handleChange = (e) => {
//     setRecette({ ...recette, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createRecette(recette).then(() => {
//       alert("Recette ajoutée avec succès !");
//       navigate("/");
//     });
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="text-center">Ajouter une Recette</h1>
//       <div className="card p-4">
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Nom :</label>
//             <input type="text" className="form-control" name="nom" value={recette.nom} onChange={handleChange} required />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Temps de préparation (min) :</label>
//             <input type="number" className="form-control" name="temps_preparation" value={recette.temps_preparation} onChange={handleChange} required />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Difficulté :</label>
//             <select className="form-select" name="difficulte" value={recette.difficulte} onChange={handleChange} required>
//               <option value="">Sélectionner</option>
//               <option value="Facile">Facile</option>
//               <option value="Moyen">Moyen</option>
//               <option value="Difficile">Difficile</option>
//             </select>
//           </div>



//           <button type="submit" className="btn btn-primary w-100">Ajouter</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AjouterRecette;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AjouterRecette = () => {
  const navigate = useNavigate();

  // Initialisation des champs
  const [recette, setRecette] = useState({
    nom: "",
    imageUrl: "",
    videoUrl:"",
    ingredients: [""],
    temps_preparation: "",
    difficulte: "",
    etapes: [""],
  });

  // Gestion du changement des champs texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecette({ ...recette, [name]: value });
  };

  // Gestion des champs dynamiques (Ingrédients, Étapes)
  const handleArrayChange = (e, index, field) => {
    const newArray = [...recette[field]];
    newArray[index] = e.target.value;
    setRecette({ ...recette, [field]: newArray });
  };

  // Ajout d'un nouvel ingrédient ou étape
  const addArrayField = (field) => {
    setRecette({ ...recette, [field]: [...recette[field], ""] });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/recettes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recette),
      });

      if (response.ok) {
        navigate("/"); // Retour à la page d'accueil
      } else {
        console.error("Erreur lors de l'ajout de la recette");
      }
    } catch (error) {
      console.error("Erreur serveur", error);
    }
  };

  // Annulation et retour à la page d'accueil
  const handleCancel = () => navigate("/");

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Ajouter une Recette</h1>
      
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
        {/* Nom */}
        <div className="mb-3">
          <label className="form-label">Nom :</label>
          <input
            type="text"
            className="form-control"
            name="nom"
            value={recette.nom}
            onChange={handleChange}
            required
          />
        </div>

        {/* URL de l'image */}
        <div className="mb-3">
          <label className="form-label">URL de l'image :</label>
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            value={recette.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        {/* URL de la video */}
        <div className="mb-3">
          <label className="form-label">URL de la video :</label>
          <input
            type="text"
            className="form-control"
            name="videoUrl"
            value={recette.videoUrlUrl}
            onChange={handleChange}
            required
          />
        </div>
        {/* Ingrédients */}
        <div className="mb-3">
          <label className="form-label">Ingrédients :</label>
          {recette.ingredients.map((ingredient, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={ingredient}
                onChange={(e) => handleArrayChange(e, index, "ingredients")}
                required
              />
              {index === recette.ingredients.length - 1 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => addArrayField("ingredients")}
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Temps de préparation */}
        <div className="mb-3">
          <label className="form-label">Temps de préparation (minutes) :</label>
          <input
            type="number"
            className="form-control"
            name="temps_preparation"
            value={recette.temps_preparation}
            onChange={handleChange}
            required
          />
        </div>

        {/* Difficulté */}
        <div className="mb-3">
          <label className="form-label">Difficulté :</label>
          <select
            className="form-control"
            name="difficulte"
            value={recette.difficulte}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner</option>
            <option value="Facile">Facile</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>

        {/* Étapes */}
        <div className="mb-3">
          <label className="form-label">Étapes :</label>
          {recette.etapes.map((etape, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={etape}
                onChange={(e) => handleArrayChange(e, index, "etapes")}
                required
              />
              {index === recette.etapes.length - 1 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => addArrayField("etapes")}
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Boutons d'action */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Ajouter
          </button>
          <button type="button" className="btn btn-danger" onClick={handleCancel}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default AjouterRecette;

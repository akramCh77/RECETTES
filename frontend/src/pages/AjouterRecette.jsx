// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AjouterRecette = () => {
//   const navigate = useNavigate();

//   // Initialisation des champs
//   const [recette, setRecette] = useState({
//     nom: "",
//     imageUrl: "",
//     videoUrl:"",
//     ingredients: [""],
//     temps_preparation: "",
//     difficulte: "",
//     etapes: [""],
//   });

//   // Gestion du changement des champs texte
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setRecette({ ...recette, [name]: value });
//   };

//   // Gestion des champs dynamiques (Ingrédients, Étapes)
//   const handleArrayChange = (e, index, field) => {
//     const newArray = [...recette[field]];
//     newArray[index] = e.target.value;
//     setRecette({ ...recette, [field]: newArray });
//   };

//   // Ajout d'un nouvel ingrédient ou étape
//   const addArrayField = (field) => {
//     setRecette({ ...recette, [field]: [...recette[field], ""] });
//   };

//   // Soumission du formulaire
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch("http://localhost:5000/api/recettes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(recette),
//       });

//       if (response.ok) {
//         navigate("/"); // Retour à la page d'accueil
//       } else {
//         console.error("Erreur lors de l'ajout de la recette");
//       }
//     } catch (error) {
//       console.error("Erreur serveur", error);
//     }
//   };

//   // Annulation et retour à la page d'accueil
//   const handleCancel = () => navigate("/");

//   return (
//     <div className="container mt-4">
//       <h1 className="text-center mb-4">Ajouter une Recette</h1>
      
//       <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
//         {/* Nom */}
//         <div className="mb-3">
//           <label className="form-label">Nom :</label>
//           <input
//             type="text"
//             className="form-control"
//             name="nom"
//             value={recette.nom}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* URL de l'image */}
//         <div className="mb-3">
//           <label className="form-label">URL de l'image :</label>
//           <input
//             type="text"
//             className="form-control"
//             name="imageUrl"
//             value={recette.imageUrl}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* URL de la video */}
//         <div className="mb-3">
//           <label className="form-label">URL de la video :</label>
//           <input
//             type="text"
//             className="form-control"
//             name="videoUrl"
//             value={recette.videoUrlUrl}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         {/* Ingrédients */}
//         <div className="mb-3">
//           <label className="form-label">Ingrédients :</label>
//           {recette.ingredients.map((ingredient, index) => (
//             <div key={index} className="input-group mb-2">
//               <input
//                 type="text"
//                 className="form-control"
//                 value={ingredient}
//                 onChange={(e) => handleArrayChange(e, index, "ingredients")}
//                 required
//               />
//               {index === recette.ingredients.length - 1 && (
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => addArrayField("ingredients")}
//                 >
//                   +
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Temps de préparation */}
//         <div className="mb-3">
//           <label className="form-label">Temps de préparation (minutes) :</label>
//           <input
//             type="number"
//             className="form-control"
//             name="temps_preparation"
//             value={recette.temps_preparation}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Difficulté */}
//         <div className="mb-3">
//           <label className="form-label">Difficulté :</label>
//           <select
//             className="form-control"
//             name="difficulte"
//             value={recette.difficulte}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Sélectionner</option>
//             <option value="Facile">Facile</option>
//             <option value="Moyenne">Moyenne</option>
//             <option value="Difficile">Difficile</option>
//           </select>
//         </div>

//         {/* Étapes */}
//         <div className="mb-3">
//           <label className="form-label">Étapes :</label>
//           {recette.etapes.map((etape, index) => (
//             <div key={index} className="input-group mb-2">
//               <input
//                 type="text"
//                 className="form-control"
//                 value={etape}
//                 onChange={(e) => handleArrayChange(e, index, "etapes")}
//                 required
//               />
//               {index === recette.etapes.length - 1 && (
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => addArrayField("etapes")}
//                 >
//                   +
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Boutons d'action */}
//         <div className="d-flex justify-content-between">
//           <button type="submit" className="btn btn-success">
//             Ajouter
//           </button>
//           <button type="button" className="btn btn-danger" onClick={handleCancel}>
//             Annuler
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AjouterRecette;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, faMinus, faSave, faTimes, faImage, 
  faVideo, faUtensils, faClock, faChartSimple, faListCheck 
} from "@fortawesome/free-solid-svg-icons";
import "./FormulaireRecette.css"; // Fichier CSS commun pour ajouter et modifier

const AjouterRecette = () => {
  const navigate = useNavigate();

  // Initialisation des champs
  const [recette, setRecette] = useState({
    nom: "",
    imageUrl: "",
    videoUrl: "",
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

  // Suppression d'un ingrédient ou étape
  const removeArrayField = (index, field) => {
    if (recette[field].length > 1) {
      const newArray = [...recette[field]];
      newArray.splice(index, 1);
      setRecette({ ...recette, [field]: newArray });
    }
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
    <div className="formulaire-recette-container">
      <div className="formulaire-header">
        <h1>Ajouter une Recette</h1>
        <p className="formulaire-subtitle">Partagez vos délicieuses créations culinaires</p>
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
            placeholder="Ex: Tarte aux pommes traditionnelle"
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
              placeholder="https://example.com/image.jpg"
              value={recette.imageUrl}
              onChange={handleChange}
              required
            />
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
              placeholder="https://youtube.com/watch?v=..."
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
              placeholder="30"
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
              <option value="">Sélectionner</option>
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
          </label>
          {recette.ingredients.map((ingredient, index) => (
            <div key={index} className="dynamic-field">
              <input
                type="text"
                className="form-input"
                placeholder={`Ingrédient ${index + 1}`}
                value={ingredient}
                onChange={(e) => handleArrayChange(e, index, "ingredients")}
                required
              />
              <div className="field-actions">
                {recette.ingredients.length > 1 && (
                  <button
                    type="button"
                    className="field-btn remove-btn"
                    onClick={() => removeArrayField(index, "ingredients")}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                )}
                {index === recette.ingredients.length - 1 && (
                  <button
                    type="button"
                    className="field-btn add-btn"
                    onClick={() => addArrayField("ingredients")}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Étapes */}
        <div className="form-group">
          <label className="form-label">
            <FontAwesomeIcon icon={faListCheck} className="form-icon" /> Étapes de préparation <span className="required">*</span>
          </label>
          {recette.etapes.map((etape, index) => (
            <div key={index} className="dynamic-field">
              <textarea
                className="form-input form-textarea"
                placeholder={`Étape ${index + 1}`}
                value={etape}
                onChange={(e) => handleArrayChange(e, index, "etapes")}
                required
              ></textarea>
              <div className="field-actions">
                {recette.etapes.length > 1 && (
                  <button
                    type="button"
                    className="field-btn remove-btn"
                    onClick={() => removeArrayField(index, "etapes")}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                )}
                {index === recette.etapes.length - 1 && (
                  <button
                    type="button"
                    className="field-btn add-btn"
                    onClick={() => addArrayField("etapes")}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Boutons d'action */}
        <div className="form-actions">
          <button type="button" className="action-btn cancel-btn" onClick={handleCancel}>
            <FontAwesomeIcon icon={faTimes} /> Annuler
          </button>
          <button type="submit" className="action-btn submit-btn">
            <FontAwesomeIcon icon={faSave} /> Ajouter la recette
          </button>
        </div>
      </form>
    </div>
  );
};

export default AjouterRecette;
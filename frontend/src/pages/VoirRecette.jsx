import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecetteById } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

const VoirRecette = () => {
  const { id } = useParams();
  const [recette, setRecette] = useState(null);
  // const recetteRef = useRef(); 

  useEffect(() => {
    getRecetteById(id)
      .then((response) => {
        console.log("Recette récupérée :", response.data); // Vérification dans la console
        setRecette(response.data);
      })
      .catch((error) => console.error("Erreur lors du chargement de la recette :", error));
  }, [id]);

  if (!recette) {
    return <p className="text-center mt-4">Chargement de la recette...</p>;
  }
  const getEmbedUrl = (url) => {
    if (!url.includes("youtube.com/watch?v=")) return url; // Si ce n'est pas une vidéo YouTube, on garde l'URL d'origine
    return url.replace("watch?v=", "embed/");
  };


  // // 📝 Fonction pour générer et télécharger le PDF
  // const handleDownloadPDF = () => {
  //   const pdf = new jsPDF("p", "mm", "a4");
  //   let y = 10; // Position Y pour écrire dans le PDF

  //   // 📸 Ajouter l'image
  //   if (recette.imageUrl) {
  //     const img = new Image();
  //     img.src = recette.imageUrl;
  //     img.crossOrigin = "Anonymous"; // Pour éviter les erreurs CORS

  //     img.onload = () => {
  //       pdf.addImage(img, "JPEG", 10, y, 100, 70);
  //       y += 80; // Déplacer vers le bas après l'image

  //       // 📝 Ajouter les infos de la recette après le chargement de l'image
  //       generateTextContent(pdf, y);
  //     };
  //   } else {
  //     // Si pas d'image, ajouter directement le texte
  //     generateTextContent(pdf, y);
  //   }
  // };

  // // 📜 Fonction pour ajouter le texte dans le PDF
  // const generateTextContent = (pdf, y) => {
  //   pdf.setFontSize(16);
  //   pdf.text(recette.nom, 10, y);
  //   y += 10;

  //   pdf.setFontSize(12);
  //   pdf.text(`Temps de préparation : ${recette.temps_preparation} min`, 10, y);
  //   y += 8;
  //   pdf.text(`Difficulté : ${recette.difficulte}`, 10, y);
  //   y += 8;
  //   pdf.text("Ingrédients :", 10, y);
  //   y += 6;

  //   recette.ingredients.forEach((ingredient) => {
  //     pdf.text(`- ${ingredient}`, 15, y);
  //     y += 6;
  //   });

  //   y += 4;
  //   pdf.text("Étapes :", 10, y);
  //   y += 6;
  //   recette.etapes.forEach((etape, index) => {
  //     pdf.text(`${index + 1}. ${etape}`, 15, y);
  //     y += 6;
  //   });

  //   y += 4;
  //   if (recette.videoUrl) {
  //     pdf.text("Lien de la vidéo :", 10, y);
  //     y += 6;
  //     pdf.setTextColor(0, 0, 255);
  //     pdf.textWithLink(recette.videoUrl, 15, y, { url: recette.videoUrl });
  //   }

  //   // 🔽 Sauvegarde du PDF
  //   pdf.save(`Recette_${recette.nom}.pdf`);
  // };




  return (
    <div className="container mt-4">
      <div className="card shadow" >

        
      {recette.imageUrl ? (
        <img
         src={recette.imageUrl}
         alt={recette.nom}
         className="card-img-top"
         style={{ maxHeight: "300px", objectFit: "cover" }}
         onError={(e) => { 
         console.error("Erreur de chargement de l'image :", e); 
         e.target.src = "/default-recipe.jpg"; // Image par défaut si erreur
         }}
        />
        ) : (
        <p className="text-center text-danger">⚠️ Image non disponible</p>
      )}


        <div className="card-body">
          <h2 className="card-title text-center">{recette.nom}</h2>
          <p><strong>Temps de préparation :</strong> {recette.temps_preparation} min</p>
          <p><strong>Difficulté :</strong> {recette.difficulte}</p>
          <p><strong>Ingrédients :</strong> {recette.ingredients.join(", ")}</p>
          <p><strong>Étapes :</strong> {recette.etapes}</p>

        </div>

        {recette.videoUrl ? (
         <div className="mt-4 text-center">
          <h5>🎥 Tutoriel Vidéo</h5>
           <iframe
            width="560"
            height="315"
            src={getEmbedUrl(recette.videoUrl)}
            title="Tutoriel vidéo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
       </div>
       ) : (
       <p className="text-center text-muted">Pas de vidéo disponible pour cette recette.</p>
        )}

       <div className="text-center mt-4">
          <button className="btn btn-secondary me-2" onClick={() => window.history.back()}>
            Retour
          </button>
          <Link to={`/recette-pdf/${id}`} className="btn btn-success">
            📥 Télécharger PDF
          </Link>
        </div>




      </div>
    </div>
  );
};

export default VoirRecette;

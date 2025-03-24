import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecetteById } from "../services/api";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./recettePDF.css"; // Importation du fichier CSS séparé

const RecettePDF = () => {
  const { id } = useParams();
  const [recette, setRecette] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getRecetteById(id)
      .then((response) => {
        setRecette(response.data);
        generatePDF(response.data);
      })
      .catch((error) =>
        console.error("Erreur lors du chargement de la recette :", error)
      );
  }, [id]);

  const generatePDF = (recette) => {
    if (!recette) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let y = 20;

    // Couleurs du thème
    const primaryColor = "#ff6b35";
    const secondaryColor = "#2d3142";
    const accentColor = "#f9a826";
    
    // Ajouter une bordure décorative
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(3);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
    
    // Décoration coin supérieur droit
    doc.setFillColor(primaryColor);
    doc.circle(pageWidth - 15, 15, 8, 'F');
    doc.setFillColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    // Remplacer l'emoji par du texte
    doc.text("FR", pageWidth - 18, 18);

    // Titre avec gradient de couleur
    doc.setFontSize(26);
    doc.setTextColor(secondaryColor);
    const textWidth = doc.getTextWidth(recette.nom);
    doc.text(recette.nom, (pageWidth - textWidth) / 2, y);
    
    // Ligne décorative sous le titre
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(1.5);
    doc.line((pageWidth - textWidth) / 2, y + 3, (pageWidth + textWidth) / 2, y + 3);
    y += 20;

    // Image avec ombre et bordure
    if (recette.imageUrl) {
      const imgWidth = 140;
      const imgHeight = 85;
      const imgX = (pageWidth - imgWidth) / 2;
      
      // Ombre de l'image
      doc.setFillColor(220, 220, 220);
      doc.roundedRect(imgX + 3, y + 3, imgWidth, imgHeight, 3, 3, 'F');
      
      const img = new Image();
      img.src = recette.imageUrl;
      img.crossOrigin = "Anonymous"; // Gérer les problèmes CORS
      img.onload = () => {
        // Bordure de l'image
        doc.setDrawColor(primaryColor);
        doc.setLineWidth(1);
        doc.roundedRect(imgX, y, imgWidth, imgHeight, 3, 3, 'S');
        
        doc.addImage(img, "JPEG", imgX, y, imgWidth, imgHeight);
        y += imgHeight + 15;
        addContent(doc, recette, y, pageHeight, primaryColor, secondaryColor, accentColor, pageWidth);
      };
      img.onerror = () => {
        console.error("Erreur chargement image.");
        y += 10;
        addContent(doc, recette, y, pageHeight, primaryColor, secondaryColor, accentColor, pageWidth);
      };
    } else {
      addContent(doc, recette, y, pageHeight, primaryColor, secondaryColor, accentColor, pageWidth);
    }
  };

  const addContent = (doc, recette, y, pageHeight, primaryColor, secondaryColor, accentColor, pageWidth) => {
    // Encadré Info Recette
    doc.setFillColor(250, 250, 250);
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(1);
    doc.roundedRect(20, y, pageWidth - 40, 40, 5, 5, 'FD');
    
    // Temps de préparation
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor);
    doc.text("Temps de préparation :", 30, y + 15);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(secondaryColor);
    doc.text(`${recette.temps_preparation} min`, 120, y + 15);
    
    // Difficulté
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor);
    doc.text("Difficulté :", 30, y + 30);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(secondaryColor);
    
    // Badge de difficulté
    const difficultyText = recette.difficulte;
    const diffWidth = doc.getTextWidth(difficultyText) + 10;
    let diffColor = accentColor;
    
    if (difficultyText.toLowerCase() === "facile") {
      diffColor = "#4CAF50"; // vert
    } else if (difficultyText.toLowerCase() === "moyenne") {
      diffColor = "#FF9800"; // orange
    } else if (difficultyText.toLowerCase() === "difficile") {
      diffColor = "#F44336"; // rouge
    }
    
    doc.setFillColor(diffColor);
    doc.roundedRect(85, y + 25, diffWidth, 10, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text(difficultyText, 90, y + 30);
    
    y += 50;

    // Titre Ingrédients
    doc.setFillColor(primaryColor);
    doc.rect(20, y, 8, 8, 'F');
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(secondaryColor);
    doc.text("Ingrédients", 35, y + 6);
    
    // Ligne décorative
    doc.setDrawColor(accentColor);
    doc.setLineWidth(0.5);
    doc.line(20, y + 12, pageWidth - 20, y + 12);
    
    y += 20;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);

    // Ingrédients (affichage en deux colonnes)
    const ingredients = Array.isArray(recette.ingredients) ? recette.ingredients : recette.ingredients.split(',').map(ing => ing.trim());
    
    for (let i = 0; i < ingredients.length; i += 2) {
      if (y > pageHeight - 30) {
        doc.addPage();
        // Bordure de la nouvelle page
        doc.setDrawColor(primaryColor);
        doc.setLineWidth(3);
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
        y = 30;
      }
      
      const ing1 = ingredients[i];
      doc.setFillColor(primaryColor);
      doc.circle(25, y - 3, 2, 'F');
      doc.text(ing1, 30, y);
      
      if (i + 1 < ingredients.length) {
        const ing2 = ingredients[i + 1];
        doc.setFillColor(primaryColor);
        doc.circle(pageWidth/2 + 5, y - 3, 2, 'F');
        doc.text(ing2, pageWidth/2 + 10, y);
      }
      
      y += 10;
    }

    y += 10;

    // Lien vidéo avec icône et en style bouton
    if (recette.videoUrl) {
      if (y > pageHeight - 30) {
        doc.addPage();
        // Bordure de la nouvelle page
        doc.setDrawColor(primaryColor);
        doc.setLineWidth(3);
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
        y = 30;
      }
      
      // Bouton vidéo
      const videoText = "Voir la vidéo de la recette";
      const vidWidth = doc.getTextWidth(videoText) + 20;
      
      doc.setFillColor(accentColor);
      doc.roundedRect(20, y - 8, vidWidth, 15, 5, 5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.textWithLink(videoText, 30, y, { url: recette.videoUrl });
      
      y += 20;
    }
  
    // Titre Étapes
    doc.setFillColor(primaryColor);
    doc.rect(20, y, 8, 8, 'F');
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(secondaryColor);
    doc.text("Préparation", 35, y + 6);
    
    // Ligne décorative
    doc.setDrawColor(accentColor);
    doc.setLineWidth(0.5);
    doc.line(20, y + 12, pageWidth - 20, y + 12);
    
    y += 20;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
  
    // Étapes avec numéros stylisés
    const etapes = Array.isArray(recette.etapes) ? recette.etapes : recette.etapes.split('\n').map(step => step.trim());
    
    etapes.forEach((etape, index) => {
      if (y > pageHeight - 40) {
        doc.addPage();
        // Bordure de la nouvelle page
        doc.setDrawColor(primaryColor);
        doc.setLineWidth(3);
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
        y = 30;
      }
      
      // Numéro de l'étape en cercle
      doc.setFillColor(primaryColor);
      doc.circle(25, y - 3, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}`, 23, y);
      
      // Texte de l'étape
      doc.setTextColor(60, 60, 60);
      doc.setFont("helvetica", "normal");
      
      // Assainir le texte pour éviter les problèmes d'emoji
      const sanitizedText = sanitizeTextForPDF(etape);
      const splitText = doc.splitTextToSize(sanitizedText, 150);
      doc.text(splitText, 40, y);
      
      y += splitText.length * 8 + 8;
    });
    
    // Footer avec signature
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Généré depuis votre application de recettes", 20, pageHeight - 15);
    doc.text("Bon appétit!", pageWidth - 50, pageHeight - 15);

    // Ouvrir le PDF dans un nouvel onglet
    doc.output("dataurlnewwindow");

    // Retourner automatiquement à la page précédente
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  // Fonction pour remplacer les caractères problématiques dans le PDF
  const sanitizeTextForPDF = (text) => {
    // Remplacer les emoji courants dans les recettes par du texte
    return text
      .replace(/🍲/g, "(marmite)")
      .replace(/🍳/g, "(poêle)")
      .replace(/🥣/g, "(bol)")
      .replace(/🍴/g, "(couverts)")
      .replace(/⏲️/g, "(minuteur)")
      .replace(/🌿/g, "(herbes)")
      .replace(/🧀/g, "(fromage)")
      .replace(/🍅/g, "(tomate)")
      .replace(/🥩/g, "(viande)")
      .replace(/🐟/g, "(poisson)")
      .replace(/🥦/g, "(légume)")
      .replace(/🍰/g, "(gâteau)")
      .replace(/🍞/g, "(pain)")
      .replace(/🥚/g, "(œuf)")
      .replace(/🥄/g, "(cuillère)")
      .replace(/🥛/g, "(lait)")
      .replace(/🍷/g, "(vin)")
      .replace(/🍋/g, "(citron)")
      .replace(/🍊/g, "(orange)")
      // Pour les emoji non listés, les remplacer par un espace
      .replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, " ");
  };

  return (
    <div className="pdf-generation-container">
      <div className="pdf-icon">
        📥
      </div>
      <h3 className="pdf-title">
        Génération de votre PDF en cours
      </h3>
      <p className="pdf-subtitle">
        Le document s'ouvrira automatiquement
      </p>
      
      <div className="processing-indicator">
        <div className="processing-dot"></div>
        <div className="processing-dot"></div>
        <div className="processing-dot"></div>
      </div>
      
      <p className="return-message">
        Vous serez redirigé automatiquement dans quelques instants
      </p>
    </div>
  );
};

export default RecettePDF;
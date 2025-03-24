import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecetteById } from "../services/api";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

    // 🎨 Titre centré
    doc.setFontSize(22);
    doc.setTextColor(40);
    const textWidth = doc.getTextWidth(recette.nom);
    doc.text(recette.nom, (pageWidth - textWidth) / 2, y);
    y += 15;

    // 📸 Image
    if (recette.imageUrl) {
      const img = new Image();
      img.src = recette.imageUrl;
      img.crossOrigin = "Anonymous"; // Gérer les problèmes CORS
      img.onload = () => {
        doc.addImage(img, "JPEG", 40, y, 130, 80);
        addContent(doc, recette, 130, pageHeight);
      };
      img.onerror = () => {
        console.error("Erreur chargement image.");
        addContent(doc, recette, y, pageHeight);
      };
    } else {
      addContent(doc, recette, y, pageHeight);
    }
  };

  const addContent = (doc, recette, y, pageHeight) => {

    // 🕒 Temps et difficulté (alignement corrigé)
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Temps de préparation :", 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${recette.temps_preparation} min`, 80, y);
    y += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Difficulté :", 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(recette.difficulte, 52, y);
    y += 15;

    // 🥕 Ingrédients (2 par ligne)
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Ingrédients", 20, y);
    y += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const ingredients = recette.ingredients;
    for (let i = 0; i < ingredients.length; i += 2) {
      if (y > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
      const ing1 = ingredients[i];
      const ing2 = ingredients[i + 1] || ""; // Si impair
      doc.text(`- ${ing1}`, 20, y);
      doc.text(`- ${ing2}`, 110, y);
      y += 8;
    }

    y += 10;

    // 🎥 Lien vidéo (placé avant les étapes)
    if (recette.videoUrl) {
        if (y > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 255);
        doc.textWithLink("Voir la vidéo", 20, y, { url: recette.videoUrl });
        y += 15;
      }
  
      // 📜 Étapes
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40);
      doc.text("Étapes", 20, y);
      y += 10;
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
  
      recette.etapes.forEach((etape, index) => {
        const stepText = `${index + 1}. ${etape}`;
        const splitText = doc.splitTextToSize(stepText, 170);
  
        if (y + splitText.length * 8 > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
  
        doc.text(splitText, 20, y);
        y += splitText.length * 8;
      });


    // 📥 Ouvrir le PDF dans un nouvel onglet
    doc.output("dataurlnewwindow");

    // ⏪ Retourner automatiquement à la page précédente
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  return <p className="text-center mt-4">📥 Génération du PDF...</p>;
};

export default RecettePDF;

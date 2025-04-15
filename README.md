# 🧑‍🍳 Recettes de Cuisine Traditionnelle Algerienne

Une application complète **MERN Stack** (MongoDB, Express, React, Node.js) pour gérer vos recettes de cuisine. Cette application permet de **créer, visualiser, modifier, supprimer des recettes**, avec **intégration d’images**, génération de PDF, et une interface moderne.

**PS : C'est des vraies recettes vous pouvez les essayer 😋**

---

## 🚀 Technologies utilisées

- **Backend** : Node.js, Express.js, MongoDB
- **Frontend** : React, Vite, Bootstrap
- **Conteneurisation** : Docker & Docker Compose

---

## ⚙️ Démarrage rapide avec Docker

### 🧾 Prérequis

- [Docker](https://www.docker.com/) et [Docker Compose](https://docs.docker.com/compose/install/) installés
- Une connexion Internet

---

### 📦 Installation

1. fichier **docker-compose.yml** :
 
### docker-compose.yml
```yaml
services:
  mongodb:
    image: akramch77/mongo:1.0
    container_name: test-recettes-mongodb
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
      - ./init-mongo.sh:/docker-entrypoint-initdb.d/init-mongo.sh:ro
      - ./recettes.json:/recettes.json:ro
    networks:
      - test-recettes-network

  backend:
    image: akramch77/recettes-backend:1.0
    container_name: test-recettes-backend
    restart: always
    environment:
      - MONGO_URI=mongodb://mongodb:27017/Recettes
      - PORT=5000
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    networks:
      - test-recettes-network

  frontend:
    image: akramch77/recettes-frontend:1.0
    container_name: test-recettes-frontend
    restart: always
    ports:
      - "5173:80"
    depends_on:
      - backend
    networks:
      - test-recettes-network

networks:
  test-recettes-network:
    driver: bridge

volumes:
  mongodb_data:
```


               
 
2. Copier les 2 fichier **init-mongo.sh** (Script d’import automatique) et **recettes.json** (Recettes à importer dans la base de données)
   
3. Lancez l'application avec Docker Compose :

docker-compose up -d

4. Accédez à l'application :
- Frontend : http://localhost:5173

- Backend API : http://localhost:5000

- MongoDB : mongodb://localhost:27017/Recettes

## 🗃️ Structure de la base de données

L’application utilise MongoDB avec la structure suivante :
- Base de données : Recettes
- Collection principale : recettes
- Chaque document contient :
   - nom, ingredients, etapes
   - temps_preparation, difficulte
   - imageUrl, videoUrl, etc.

Le fichier recettes.json est importé automatiquement lors du premier lancement.

## ✨ Fonctionnalités
✅ Affichage de toutes les recettes

✅ Ajout / Modification / Suppression

✅ Visualisation détaillée avec image et vidéo

✅ Génération de PDF pour chaque recette

## 🐳 Structure des services Docker

Cette application est composée de 3 services Docker :
- MongoDB : Base de données
- Backend : API REST (Express)
- Frontend : Interface utilisateur (React)

## Licence
Ce projet est sous licence MIT






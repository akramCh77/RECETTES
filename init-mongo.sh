#!/bin/bash
echo "⏳ Attente du démarrage de MongoDB..."

# On attend que MongoDB accepte les connexions
until mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
  sleep 2
done

echo "✅ MongoDB est prêt. Importation de recettes.json..."

mongoimport --host localhost --port 27017 \
  --db Recettes \
  --collection recettes \
  --file /recettes.json \
  --jsonArray

echo "📥 Import terminé avec succès"

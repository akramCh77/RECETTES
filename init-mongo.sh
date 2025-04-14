echo "Importing recettes.json into MongoDB..."

mongoimport --host localhost --port 27017 \
  --db Recettes \
  --collection recettes \
  --file /recettes.json \
  --jsonArray

echo "✅ Import terminé"


#!/bin/bash

set -e

echo "[Setup] Waiting for Database to be ready..."
until docker exec raidan-db-primary pg_isready -U root -d raidan_mesh; do
  sleep 2
done

echo "[Setup] Running PostgreSQL Migrations..."
docker exec raidan-app-core npm run db:migrate

echo "[Setup] Seeding YemenJPT Persona & Root Admin..."
docker exec raidan-app-core npm run db:seed -- --persona="YemenJPT Investigative Unit" --root="admin@raidan.pro"

echo "[Setup] Initializing Vector DB Index for RAG..."
docker exec raidan-app-core npm run ai:init-vector-db

echo "----------------------------------------------------"
echo "SYSTEM READY"
echo "URL: https://raidan.pro"
echo "----------------------------------------------------"

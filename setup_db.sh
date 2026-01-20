#!/bin/bash

set -e

echo "[Setup] Waiting for Database health check..."
until docker exec raidan-db-primary pg_isready -U root -d raidan_mesh; do
  sleep 2
done

echo "[Setup] Initializing Database Schema & Migrations..."
docker exec raidan-app-core npm run db:migrate

echo "[Setup] Seeding Root Admin & Sovereign Persona..."
docker exec raidan-app-core npm run db:seed -- --user="admin@raidan.pro" --persona="YemenJPT System Node"

echo "[Setup] Preparing Vector Indices for RAG..."
docker exec raidan-ai-engine python scripts/init_vector_db.py

echo "----------------------------------------------------"
echo "SYSTEM FULLY DEPLOYED AND OPERATIONAL"
echo "Main Website: https://raidan.pro"
echo "SaaS Dashboard: https://ai.raidan.pro"
echo "----------------------------------------------------"

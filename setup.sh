
#!/bin/bash

# YemenJPT Database & Root User Seeding
# Initializing Default State on raidan.pro

set -e

echo "[Setup] Running database migrations..."
docker compose exec app npm run db:migrate

echo "[Setup] Seeding Root Admin account..."
docker compose exec app npm run db:seed -- --user=admin@raidan.pro --pass=root2025

echo ""
echo "----------------------------------------------------"
echo "INSTALLATION SUCCESSFUL"
echo "Login: https://raidan.pro/login"
echo "User: admin@raidan.pro"
echo "Pass: root2025"
echo "----------------------------------------------------"
echo "Generating Final Service Report..."
docker compose ps

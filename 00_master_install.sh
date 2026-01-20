#!/bin/bash
# -----------------------------------------------------------------------------
# RAIDANPRO MASTER INSTALLER v3.0
# The "Magic Button" for Sovereign Infrastructure Deployment
# -----------------------------------------------------------------------------

set -e
echo "🚀 Initiating RaidanPro Sovereign Deployment..."

# 1. Dependency Check
if ! [ -x "$(command -v docker)" ]; then
  echo "❌ Error: Docker is not installed." >&2
  exit 1
fi

# 2. Environment Setup
chmod +x 01_setup_env.sh
./01_setup_env.sh

# 3. Directory Preparation
mkdir -p uploads data/postgres logs/app logs/nginx

# 4. Pull & Build Stack
echo "📦 Building Docker Containers..."
docker compose build
docker compose up -d

# 5. Database Seeding
echo "⏳ Waiting for Database to be ready..."
sleep 15
chmod +x 02_seed_database.sh
./02_seed_database.sh

# 6. CMS Deployment (Landing Page Generation)
chmod +x 03_deploy_cms.sh
./03_deploy_cms.sh

echo "----------------------------------------------------"
echo "✅ DEPLOYMENT COMPLETE"
echo "🌐 Corporate: https://raidan.pro"
echo "🤖 SaaS App: https://ai.raidan.pro"
echo "----------------------------------------------------"

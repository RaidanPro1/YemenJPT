#!/bin/bash
# -----------------------------------------------------------------------------
# RAIDANPRO SOVEREIGN ECOSYSTEM - MASTER INSTALLER v3.5
# -----------------------------------------------------------------------------

set -e

echo "🛡️  Starting RaidanPro Sovereign Infrastructure Deployment..."

# 1. Dependency Check: Docker & Docker Compose
if ! [ -x "$(command -v docker)" ]; then
    echo "📦 Installing Docker Engine..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# 2. Directory Scaffolding
echo "📁 Preparing directory structure at /opt/raidan-system..."
mkdir -p nginx/certs landing_page/docs logs/app data/{postgres,redis,tenants} uploads

# 3. Environment & Secret Generation
if [ ! -f .env ]; then
    echo "🔐 Generating unique military-grade encryption keys..."
    DB_PASS=$(openssl rand -base64 16)
    ENC_KEY=$(openssl rand -base64 32)
    JWT_SEC=$(openssl rand -base64 32)
    
    cat <<EOF > .env
# --- DATABASE ---
DB_PASSWORD=$DB_PASS
POSTGRES_USER=root
POSTGRES_DB=raidan_mesh

# --- SECURITY ---
ENCRYPTION_KEY=$ENC_KEY
JWT_SECRET=$JWT_SEC

# --- AI & DOMAIN ---
API_KEY=YOUR_GEMINI_API_KEY_HERE
DOMAIN=raidan.pro
APP_NAME=YemenJPT
EOF
    echo "✅ .env file created. PLEASE UPDATE YOUR API_KEY IN .env"
else
    echo "⏭️  .env already exists. Skipping secret generation."
fi

# 4. Fallback SSL Generation (Self-signed for initial boot)
if [ ! -f nginx/certs/live.crt ]; then
    echo "🛡️  Generating fallback SSL certificates..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout nginx/certs/live.key -out nginx/certs/live.crt \
    -subj "/C=YE/ST=Sanaa/L=Sanaa/O=RaidanPro/CN=*.raidan.pro"
fi

# 5. Build & Launch
echo "🚀 Building and starting RaidanPro Stack..."
docker-compose build
docker-compose up -d

# 6. Database Initialization
echo "⏳ Waiting for Database to stabilize (15s)..."
sleep 15
echo "🌱 Running migrations and seeding Root Admin..."
docker exec raidan-app-core npm run db:migrate
docker exec raidan-app-core npm run db:seed -- --user="admin@raidan.pro" --pass="password123"

echo "----------------------------------------------------"
echo "✅ SYSTEM FULLY DEPLOYED"
echo "🌐 Corporate Home: http://raidan.pro"
echo "🤖 Root Dashboard: http://ai.raidan.pro"
echo "🔑 Default User: admin@raidan.pro"
echo "🔑 Default Pass: password123"
echo "----------------------------------------------------"
echo "Next Steps: Update API_KEY in .env and run 'docker-compose restart'"

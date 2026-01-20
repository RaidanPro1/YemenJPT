
#!/bin/bash
# -----------------------------------------------------------------------------
# RAIDANPRO SOVEREIGN ECOSYSTEM - MASTER INSTALLER v4.0
# -----------------------------------------------------------------------------

set -e
echo "🛡️  Initializing RaidanPro Sovereign Infrastructure..."

# 1. Dependency Check
command -v docker >/dev/null 2>&1 || { echo "❌ Error: Docker required."; exit 1; }

# 2. Secret Generation (Military Grade)
if [ ! -f .env ]; then
    echo "🔐 Generating unique infrastructure keys..."
    DB_PASS=$(openssl rand -base64 16)
    MASTER_KEY=$(openssl rand -base64 32)
    
    cat <<EOF > .env
# --- DB ---
POSTGRES_PASSWORD=$DB_PASS
POSTGRES_USER=root
POSTGRES_DB=raidan_mesh

# --- SECURITY ---
ENCRYPTION_KEY=$MASTER_KEY
JWT_SECRET=$(openssl rand -base64 32)

# --- CLOUDFLARE ---
CF_TOKEN=YOUR_TOKEN_HERE
CF_ZONE_ID=YOUR_ZONE_ID_HERE

# --- APP ---
DOMAIN=raidan.pro
EOF
    echo "✅ .env created. PLEASE UPDATE CF_TOKEN."
fi

# 3. Network Scaffolding
docker network create raidan_public || true
docker network create raidan_private || true

# 4. Pull & Deploy Stack
echo "🚀 Spawning Sovereign Containers..."
docker-compose up -d --build

# 5. Database Migrations
echo "⏳ Waiting for DB to stabilize..."
sleep 15
docker exec raidan-app-core npm run db:migrate
docker exec raidan-app-core npm run db:seed -- --root="admin@raidan.pro" --pass="raidan2026"

echo "----------------------------------------------------"
echo "✅ SYSTEM FULLY DEPLOYED"
echo "🌐 Root Dashboard: https://admin.raidan.pro"
echo "🔑 Credentials: admin@raidan.pro / raidan2026"
echo "----------------------------------------------------"

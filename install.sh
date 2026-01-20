
#!/bin/bash

# --- RAIDANPRO SOVEREIGN MESH INSTALLER ---
# Ver: 2.1.0 (Production Ready)

set -e

C_BLUE='\033[0;34m'
C_GREEN='\033[0;32m'
C_RED='\033[0;31m'
C_NC='\033[0m'

echo -e "${C_BLUE}====================================================${C_NC}"
echo -e "${C_BLUE}      RAIDANPRO SOVEREIGN INFRASTRUCTURE            ${C_NC}"
echo -e "${C_BLUE}====================================================${C_NC}"

# 1. Dependency Check
echo -e "${C_GREEN}[1/5] Auditing Dependencies...${C_NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${C_BLUE}Docker not found. Installing now...${C_NC}"
    curl -fsSL https://get.docker.com | sh
    usermod -aG docker $USER
fi

if ! docker compose version &> /dev/null; then
    echo -e "${C_BLUE}Docker Compose not found. Installing plugin...${C_NC}"
    apt-get update && apt-get install -y docker-compose-plugin
fi

# 2. Directory Structure
echo -e "${C_GREEN}[2/5] Initializing File System...${C_NC}"
mkdir -p logs/{nginx,app}
mkdir -p tenants/shared
mkdir -p nginx certs modules
chmod -R 755 tenants logs

# 3. Environment Setup
echo -e "${C_GREEN}[3/5] Generating Secrets...${C_NC}"
if [ ! -f .env ]; then
    cp .env.example .env
    DB_PASS=$(openssl rand -base64 18)
    ENC_KEY=$(openssl rand -base64 32)
    sed -i "s/ChangeThis_Secure_Password_2025/$DB_PASS/g" .env
    sed -i "s/AES_256_MASTER_KEY_VAULT/$ENC_KEY/g" .env
    echo -e "${C_BLUE}Success: .env file generated with unique keys.${C_NC}"
else
    echo -e "Skipping: .env already exists."
fi

# 4. Networking
echo -e "${C_GREEN}[4/5] Establishing Mesh Networks...${C_NC}"
docker network inspect raidan_public >/dev/null 2>&1 || docker network create raidan_public
docker network inspect raidan_private >/dev/null 2>&1 || docker network create raidan_private

# 5. Build
echo -e "${C_GREEN}[5/5] Pulling Containers...${C_NC}"
docker compose pull

echo -e "${C_GREEN}INSTALLATION COMPLETE.${C_NC}"
echo -e "Next steps: "
echo -e "1. Edit .env with your Cloudflare and Google API keys."
echo -e "2. Run './setup_services.sh' to seed the database."
echo -e "3. Run './start.sh' to launch the system."

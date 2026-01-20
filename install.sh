
#!/bin/bash

# YemenJPT Sovereign AI - Auto Installer
# Developed by RaidanPro

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}==============================================${NC}"
echo -e "${BLUE}   YemenJPT Sovereign AI System Installer    ${NC}"
echo -e "${BLUE}       Press House Yemen & RaidanPro         ${NC}"
echo -e "${BLUE}==============================================${NC}"

# Check for root
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Error: Please run as root (sudo ./install.sh)${NC}"
  exit 1
fi

echo -e "${GREEN}[1/5] Updating System...${NC}"
apt update && apt upgrade -y

echo -e "${GREEN}[2/5] Installing Docker & Dependencies...${NC}"
apt install -y docker.io docker-compose curl git

echo -e "${GREEN}[3/5] Setting up Ollama for Local AI (Falcon/Jais)...${NC}"
if ! command -v ollama &> /dev/null; then
    curl -fsSL https://ollama.com/install.sh | sh
fi

echo -e "${GREEN}[4/5] Pulling Sovereign Models...${NC}"
ollama pull falcon:7b
ollama pull qwen2.5:latest

echo -e "${GREEN}[5/5] Launching YemenJPT Newsroom Environment...${NC}"
docker-compose up -d

echo -e "${BLUE}==============================================${NC}"
echo -e "${GREEN}SUCCESS: YemenJPT is now active!${NC}"
echo -e "Frontend: http://localhost"
echo -e "Storage Vault: http://localhost:8080"
echo -e "Local AI Node: http://localhost:11434"
echo -e "${BLUE}==============================================${NC}"

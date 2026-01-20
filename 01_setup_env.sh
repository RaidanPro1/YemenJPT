#!/bin/bash
# -----------------------------------------------------------------------------
# STEP 01: ENVIRONMENT & SECRETS GENERATION
# -----------------------------------------------------------------------------

if [ ! -f .env ]; then
    echo "🔐 Generating unique encryption keys and passwords..."
    DB_PASS=$(openssl rand -base64 16)
    ENC_KEY=$(openssl rand -base64 32)
    
    cat <<EOF > .env
DB_PASSWORD=$DB_PASS
ENCRYPTION_KEY=$ENC_KEY
API_KEY=YOUR_GEMINI_API_KEY_HERE
DOMAIN=raidan.pro
EOF
    echo "✅ .env file created."
else
    echo "⏭️ .env already exists. Skipping."
fi

# SSL Fallback
mkdir -p nginx/certs
if [ ! -f nginx/certs/live.crt ]; then
    echo "🛡️ Generating self-signed fallback SSL..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout nginx/certs/live.key -out nginx/certs/live.crt \
    -subj "/C=YE/ST=Sanaa/L=Sanaa/O=RaidanPro/CN=*.raidan.pro"
fi

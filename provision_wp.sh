
#!/bin/bash

# --- YemenJPT WP Provisioner ---
# Usage: ./provision_wp.sh news-org.com ph_wp_prod secure_db_pass

DOMAIN=$1
DB_NAME=$2
DB_PASS=$3
NETWORK="raidan_public"

echo "[WP-Factory] Spawning container for $DOMAIN..."

docker run -d \
  --name "wp-${DOMAIN}" \
  --network "$NETWORK" \
  --restart always \
  -e WORDPRESS_DB_HOST="raidan-db-primary" \
  -e WORDPRESS_DB_USER="root" \
  -e WORDPRESS_DB_PASSWORD="$DB_PASS" \
  -e WORDPRESS_DB_NAME="$DB_NAME" \
  -e VIRTUAL_HOST="$DOMAIN,www.$DOMAIN,newsroom.$DOMAIN" \
  -e LETSENCRYPT_HOST="$DOMAIN,www.$DOMAIN,newsroom.$DOMAIN" \
  wordpress:latest

echo "[WP-Factory] Success. Instance attached to $DOMAIN."

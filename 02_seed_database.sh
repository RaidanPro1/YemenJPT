#!/bin/bash
# -----------------------------------------------------------------------------
# STEP 02: DATABASE SEEDING
# -----------------------------------------------------------------------------

echo "🌱 Seeding Database with Sovereign Identity..."

# Use Docker to execute SQL
# The password is pulled from the .env file
source .env

docker exec -i raidan-db-primary psql -U root -d raidan_mesh <<EOF
-- Seed initial root admin (Dummy for setup)
INSERT INTO users (email, password_hash, name, role) 
VALUES ('admin@raidan.pro', '\$2b\$12\$hashplaceholder', 'Zaid Al-Yamani', 'root_admin')
ON CONFLICT DO NOTHING;

-- Inject YemenJPT RAG System Docs
INSERT INTO project_docs (title, content) 
VALUES ('Sovereign Protocol v3', 'This is the master protocol for RaidanPro Sovereign AI infrastructure...')
ON CONFLICT DO NOTHING;
EOF

echo "✅ Database seeded successfully."

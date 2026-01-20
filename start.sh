
#!/bin/bash

# Launch RaidanPro Sovereign Stack
# Options: --with-tools

if [[ "$1" == "--with-tools" ]]; then
    echo "Starting Stack with OSINT & Forensics tools..."
    docker compose -f docker-compose.yml -f docker-compose.tools.yml up -d --build
else
    echo "Starting Core Sovereign Stack..."
    docker compose up -d --build
fi

docker compose ps

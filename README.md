
# RaidanPro Multi-Tenant Sovereign Mesh 🛡️

The ultimate infrastructure for Sovereign AI and Digital Journalism. Designed for high-security environments and institutional data isolation.

## 🏗️ Architecture Overview

```text
[ Internet ] 
     |
     v
[ Nginx Gateway (Port 80/443) ] <--- Wildcard SSL (*.raidan.pro)
     |
     +--- [ X-Tenant-ID Header Injection ]
     |
     +--- (ph-ye.raidan.pro) ----> [ App Core (Schema: tenant_ph_ye) ]
     |
     +--- (yemenjpt.raidan.pro) --> [ AI Sovereign Node ]
     |
     +--- (tools.raidan.pro) ----> [ Tools Mesh (Lazy Loaded) ]
```

### 🗝️ Data Isolation Strategy
- **Database**: We use **PostgreSQL Schemas**. Each tenant has their own schema.
- **Files**: Physical isolation in `/var/lib/raidan/tenants/{tenant_id}/`.
- **Identity**: Google OAuth 2.0 integrated with system-level Audit Logs.

## 🚀 Installation Guide

### Prerequisites
- **OS**: Ubuntu 22.04 LTS or 24.04 LTS.
- **RAM**: Minimum 8GB (16GB recommended for AI training).
- **CPU**: 4 Cores minimum.
- **DNS**: Wildcard A record `*.raidan.pro` pointing to the server IP.

### Step-by-Step
1. **Clone & Install**:
   ```bash
   git clone https://github.com/RaidanPro1/YemenJPT.git
   cd YemenJPT
   sudo chmod +x *.sh
   sudo ./install.sh
   ```
2. **Configure Secrets**:
   Open `.env` and update the placeholders with your actual API keys from Google Cloud and Cloudflare.

3. **Initialize Services**:
   ```bash
   sudo ./setup_services.sh
   ```

4. **Launch**:
   ```bash
   sudo ./start.sh
   ```

## 🛠️ Tenant Management
New organizations are added via the **Root Dashboard** or CLI:
```bash
# CLI Example for manual provisioning
docker exec raidan-app-core node scripts/provision-tenant.js --name="Saba News" --slug="saba" --domain="saba.ye"
```

## 🚑 Troubleshooting
- **Port Conflict**: Check if Nginx or Apache is already running on the host (`lsof -i :80`).
- **Permission Denied**: Ensure the user has `docker` group privileges or run as `sudo`.
- **DB Connection**: Ensure `.env` DB_PASSWORD matches the one in Docker.

---
© 2025 RaidanPro | Developed in Strategic Partnership with **Press House Foundation**.

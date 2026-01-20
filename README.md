# RaidanPro Sovereign Ecosystem 🛡️
**Production Grade Infrastructure v3.5**

This repository contains the complete unified infrastructure for the **RaidanPro** ecosystem, integrating the **YemenJPT AI Engine** and a high-performance multi-tenant dashboard.

## 🏗️ Architecture Overview
The system uses a **Hybrid Mesh Architecture**:
- **Nginx Gateway**: Acts as a Layer 7 router, mapping subdomains to tenants and serving static corporate files.
- **Node.js App Core**: The brain of the SaaS platform. Handles identity, tenant lifecycle, and module orchestration.
- **Python AI Engine**: Dedicated RAG (Retrieval-Augmented Generation) service using `pgvector` for local knowledge processing.
- **Sovereign Database**: PostgreSQL with `pgvector` and encrypted storage for sensitive journalistic data.

## 🚀 Quick Start
1. **Prepare Server**: Use Ubuntu 22.04 LTS.
2. **Execute Deployment**:
   ```bash
   chmod +x install.sh
   ./install.sh
   ```
3. **Configure AI**: Edit `.env` to add your `API_KEY` (Gemini API Key).
4. **Restart**: `docker-compose restart`.

## 🖥️ System Administration

### 1. Root Login
- **URL**: `https://ai.raidan.pro/login`
- **Default Credentials**: `admin@raidan.pro` / `password123`
*Change these immediately upon first login via the Security settings.*

### 2. Branding (God Mode)
To change the system's global identity without touching code:
1. Navigate to **"تخصيص الهوية (Branding)"** in the Root Sidebar.
2. Update the **System Name** (e.g., from RaidanPro to your organization).
3. Upload a new **SVG/PNG Logo**.
4. Save Changes. This automatically rebuilds the landing page assets.

### 3. Adding a New Tenant (Multi-Tenancy)
1. Navigate to **"إدارة المستأجرين (Tenants)"**.
2. Click **"+ إضافة مؤسسة جديدة (Add Organization)"**.
3. Enter the **Organization Name** and **Subdomain Slug** (e.g., `aden-news`).
4. Select desired services (AI Portal, Secure Mail, Newsroom).
5. The system will automatically provision the DNS records and isolate their data volume in `/var/www/uploads/aden-news`.

### 4. AI Nexus Training
Manage human feedback from the **"تعلم الآلة (AI Nexus)"** section. Approve human corrections to trigger a LoRA fine-tuning sequence on your local models.

## 🔒 Security Principles
- **Volume Isolation**: Each tenant's uploads are physically isolated at the filesystem level.
- **Encryption at Rest**: All API keys and sensitive credentials are encrypted using the `ENCRYPTION_KEY` from your `.env`.
- **Panic Mode**: Accessible via the Security Dashboard, instantly revokes all active sessions and toggles camouflage on all public endpoints.

---
© 2026 **RaidanPro Communications** | Developed for **Press House Foundation**.

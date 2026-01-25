-- RAIDANPRO SOVEREIGN INFRASTRUCTURE: UNIFIED DATABASE SCHEMA
-- Version: 3.0 (Architecture Refresh)

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgvector";

-- 2. ENUMS
CREATE TYPE tenant_status AS ENUM ('provisioning', 'active', 'suspended', 'maintenance');
CREATE TYPE user_role AS ENUM ('root_admin', 'tenant_admin', 'journalist', 'analyst', 'monitor');

-- 3. CORE IDENTITY & MULTI-TENANCY
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL, -- Subdomain identifier
    domain VARCHAR(255) UNIQUE,       -- Custom domain
    status tenant_status DEFAULT 'provisioning',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, -- NULL for Root Admins
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name VARCHAR(255),
    role user_role DEFAULT 'journalist',
    avatar_url TEXT,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. AUTH & SSO (Social Login Config)
CREATE TABLE auth_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_name VARCHAR(50) UNIQUE NOT NULL, -- google, facebook, etc.
    client_id TEXT,
    client_secret TEXT, -- Encrypted at Rest
    is_enabled BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. GOD-MODE CMS (Dynamic Branding)
CREATE TABLE system_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT,
    category VARCHAR(50) DEFAULT 'general', -- 'branding', 'contact', 'colors'
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE seo_metadata (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route VARCHAR(255) UNIQUE NOT NULL, -- '/', '/docs', etc.
    title VARCHAR(100),
    description TEXT,
    keywords TEXT[],
    og_image TEXT
);

-- 6. AI & RAG (Knowledge Base)
CREATE TABLE project_docs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    title TEXT,
    content TEXT,
    embedding VECTOR(1536), -- Dimension for Gemini/OpenAI embeddings
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ai_training_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    model_base VARCHAR(100),
    status VARCHAR(50), -- queued, training, completed
    metrics JSONB,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 7. INITIAL SEED (Root Defaults)
INSERT INTO system_settings (key, value, category) VALUES 
('brand_name', 'RaidanPro', 'branding'),
('primary_color', '#0d9488', 'branding'),
('secondary_color', '#0f172a', 'branding'),
('hero_title', 'هندسة المرونة في عالم متغير', 'branding'),
('whatsapp_number', '967772662106', 'contact');

INSERT INTO auth_providers (provider_name) VALUES ('google'), ('facebook'), ('twitter'), ('github');

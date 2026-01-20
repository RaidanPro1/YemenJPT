
-- -----------------------------------------------------------------------------
-- MULTI-TENANT INFRASTRUCTURE SCHEMA
-- Designed for PostgreSQL (RaidanPro Enterprise Standard)
-- -----------------------------------------------------------------------------

-- Core Tenants Table
CREATE TYPE tenant_type AS ENUM ('organization', 'freelancer');
CREATE TYPE tenant_status AS ENUM ('active', 'suspended', 'provisioning');

CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    type tenant_type NOT NULL DEFAULT 'organization',
    status tenant_status NOT NULL DEFAULT 'provisioning',
    primary_domain VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tenant Quotas & Resource Tracking
CREATE TABLE tenant_resources (
    tenant_id UUID PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
    cpu_limit INT DEFAULT 4,        -- Cores
    ram_limit INT DEFAULT 8,        -- GB
    storage_limit INT DEFAULT 500,  -- GB
    api_token_limit INT DEFAULT 1000000,
    active_users_limit INT DEFAULT 50,
    
    cpu_usage_current FLOAT DEFAULT 0,
    ram_usage_current FLOAT DEFAULT 0,
    storage_usage_current FLOAT DEFAULT 0,
    api_tokens_used INT DEFAULT 0,
    active_users_count INT DEFAULT 0
);

-- Individual CMS Instances / Sites
CREATE TYPE site_status AS ENUM ('active', 'maintenance', 'deploying', 'error');
CREATE TYPE cf_status AS ENUM ('synced', 'pending', 'error');

CREATE TABLE tenant_sites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    site_url VARCHAR(255) NOT NULL,
    site_type VARCHAR(50) DEFAULT 'wordpress', -- wordpress, ghost, static
    status site_status DEFAULT 'deploying',
    wp_version VARCHAR(20),
    db_name VARCHAR(100),
    cloudflare_status cf_status DEFAULT 'pending',
    last_health_check TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Portals & Gateway Config
CREATE TABLE tenant_portals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    portal_type VARCHAR(50) NOT NULL, -- 'yemenjpt', 'mail', 'vault'
    subdomain VARCHAR(255) NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    UNIQUE(tenant_id, portal_type)
);

-- Encrypted API Vault
CREATE TABLE api_vault (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    service_name VARCHAR(100) NOT NULL,
    encrypted_key TEXT NOT NULL, -- Encrypted using system master key
    key_preview VARCHAR(50),      -- e.g., "sk-...4567"
    is_enabled BOOLEAN DEFAULT TRUE,
    usage_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Social Media Hub Tokens
CREATE TABLE tenant_social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL, -- 'twitter', 'facebook', 'telegram'
    handle VARCHAR(100) NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'connected'
);

-- Create Indices
CREATE INDEX idx_tenant_slug ON tenants(slug);
CREATE INDEX idx_sites_tenant ON tenant_sites(tenant_id);
CREATE INDEX idx_portals_tenant ON tenant_portals(tenant_id);

-- -----------------------------------------------------------------------------
-- SEO DYNAMIC METADATA SCHEMA
-- Control how RaidanPro appears on search engines
-- -----------------------------------------------------------------------------

CREATE TABLE seo_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_pattern VARCHAR(255) UNIQUE NOT NULL, -- e.g. "/docs/*" or "/landing"
    page_title VARCHAR(100) NOT NULL,
    meta_description TEXT NOT NULL,
    keywords JSONB DEFAULT '[]', -- Array of keywords
    og_image VARCHAR(255),
    is_indexed BOOLEAN DEFAULT TRUE,
    last_crawled TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Initial Seed for Landing Page
INSERT INTO seo_metadata (route_pattern, page_title, meta_description, keywords)
VALUES (
    '/', 
    'ريدان برو | الاتصال الاستراتيجي والذكاء الاصطناعي في اليمن', 
    'شريكك الاستراتيجي في التحول الرقمي وإدارة الأزمات الصحفية في اليمن.', 
    '["YemenJPT", "RaidanPro", "AI Yemen"]'
);
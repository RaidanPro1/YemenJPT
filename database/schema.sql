-- -----------------------------------------------------------------------------
-- SOVEREIGN FEEDBACK NEXUS SCHEMA
-- Designed for PostgreSQL with JSONB Support (RaidanPro Standard)
-- -----------------------------------------------------------------------------

CREATE TABLE ai_training_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Multi-Tenant Metadata
    tenant_id VARCHAR(50) NOT NULL,
    source_module VARCHAR(50) NOT NULL, -- 'meedan', 'ai_core', 'fact_check', etc.
    
    -- Training Payload (JSONB for maximum flexibility)
    input_data JSONB NOT NULL,          -- The user prompt, image metadata, or raw audio data
    ai_prediction JSONB NOT NULL,       -- What the model originally responded
    human_correction JSONB NOT NULL,    -- The expert journalist's ground-truth correction
    
    -- Context & Analysis
    context_tags TEXT[] DEFAULT '{}',   -- e.g., {'Yemen Dialect', 'Political History'}
    confidence_at_prediction FLOAT,     -- Original model confidence score
    expert_user_id UUID,                -- Link to the journalist who provided the correction
    
    -- Workflow Status
    is_processed BOOLEAN DEFAULT FALSE, -- Set to true once exported for fine-tuning
    tuning_job_id VARCHAR(100),         -- Reference to the specific job that used this record
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optimize for retreival of unprocessed training pairs
CREATE INDEX idx_unprocessed_tenant ON ai_training_feedback(tenant_id, is_processed) 
WHERE is_processed = FALSE;

-- GIN index for fast context tag searches
CREATE INDEX idx_feedback_tags ON ai_training_feedback USING GIN (context_tags);

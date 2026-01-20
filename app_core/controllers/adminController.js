// Mock DB interface
const db = require('../models/db'); 

exports.getDashboard = async (req, res) => {
    const stats = {
        tenants: 12,
        activeUsers: 450,
        cpuLoad: 24,
        pendingAiFeedback: 5
    };
    res.render('admin/dashboard', { stats, activePage: 'overview' });
};

exports.getBranding = async (req, res) => {
    const settings = await db.query('SELECT * FROM system_settings');
    res.render('admin/branding', { settings, activePage: 'branding' });
};

exports.updateBranding = async (req, res) => {
    const { brand_name, hero_title, seo_keywords } = req.body;
    await db.query('UPDATE system_settings SET value = ? WHERE key = "brand_name"', [brand_name]);
    await db.query('UPDATE system_settings SET value = ? WHERE key = "hero_title"', [hero_title]);
    if (req.file) {
        await db.query('UPDATE system_settings SET value = ? WHERE key = "logo_url"', [`/uploads/${req.file.filename}`]);
    }
    res.redirect('/admin/branding?success=1');
};

exports.getTenants = async (req, res) => {
    const tenants = await db.query('SELECT t.*, tr.cpu_usage_current FROM tenants t JOIN tenant_resources tr ON t.id = tr.tenant_id');
    res.render('admin/tenants', { tenants, activePage: 'tenants' });
};

exports.createTenant = async (req, res) => {
    const { name, domain, slug } = req.body;
    try {
        // 1. Insert into DB
        const tenant = await db.query('INSERT INTO tenants (name, domain, slug, status) VALUES (?, ?, ?, "active")', [name, domain, slug]);
        
        // 2. Mock Cloudflare API Call
        console.log(`[Cloudflare] Mocking DNS Provisioning for ${slug}.ai.raidan.pro`);
        
        res.redirect('/admin/tenants?created=1');
    } catch (e) {
        res.status(500).send("Provisioning Failed");
    }
};

exports.getAiNexus = async (req, res) => {
    const feedback = await db.query('SELECT * FROM ai_training_feedback WHERE is_processed = FALSE');
    res.render('admin/ai', { feedback, activePage: 'ai' });
};

exports.moderateAiFeedback = async (req, res, next) => {
    const { id, action } = req.params;
    const status = action === 'approve' ? 'approved' : 'discarded';
    await db.query('UPDATE ai_training_feedback SET is_processed = TRUE, status = ? WHERE id = ?', [status, id]);
    res.json({ success: true });
};

exports.getSecurity = async (req, res) => {
    const providers = await db.query('SELECT * FROM auth_providers');
    res.render('admin/security', { providers, activePage: 'security' });
};

exports.updateOauth = async (req, res) => {
    const { provider, is_enabled, client_id, client_secret } = req.body;
    await db.query('UPDATE auth_providers SET is_enabled = ?, client_id = ?, client_secret = ? WHERE provider_name = ?', 
        [is_enabled === 'on', client_id, client_secret, provider]);
    res.redirect('/admin/security?saved=1');
};